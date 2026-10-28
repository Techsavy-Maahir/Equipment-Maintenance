import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, transactionMocks } = vi.hoisted(() => {
  const equipmentDelegates = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };
  const historyDelegates = {
    create: vi.fn(),
  };

  return {
    prismaMock: {
      $transaction: vi.fn(),
      equipment: equipmentDelegates,
      equipmentLocationHistory: historyDelegates,
    },
    transactionMocks: {
      equipment: {
        findUnique: vi.fn(),
        findUniqueOrThrow: vi.fn(),
        update: vi.fn(),
      },
      equipmentLocationHistory: {
        create: vi.fn(),
      },
    },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import {
  createEquipment,
  deactivateEquipment,
  listEquipment,
  updateEquipment,
} from "../src/services/equipment.service.js";

const equipment = {
  id: 1,
  code: "PUMP-001",
  name: "Pump",
  description: null,
  status: "ACTIVE",
  criticality: "HIGH",
  departmentId: 1,
  locationId: 2,
  categoryId: 3,
  isDeactivated: false,
  deactivatedAt: null,
};

const transactionClient = {
  equipment: transactionMocks.equipment,
  equipmentLocationHistory: transactionMocks.equipmentLocationHistory,
};

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.$transaction.mockImplementation((callback) =>
    callback(transactionClient),
  );
});

describe("equipment service", () => {
  it("lists only non-deactivated equipment", async () => {
    prismaMock.equipment.findMany.mockResolvedValue([equipment]);

    await expect(listEquipment()).resolves.toEqual([equipment]);
    expect(prismaMock.equipment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isDeactivated: false } }),
    );
  });

  it("creates equipment with a null default description", async () => {
    prismaMock.equipment.create.mockResolvedValue(equipment);

    await createEquipment({
      code: "PUMP-001",
      name: "Pump",
      criticality: "HIGH",
      departmentId: 1,
      locationId: 2,
      categoryId: 3,
    });

    expect(prismaMock.equipment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ description: null }),
      }),
    );
  });

  it("soft deactivates equipment without deleting it", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.equipment.update.mockResolvedValue({
      ...equipment,
      isDeactivated: true,
      deactivatedAt: new Date(),
    });

    await deactivateEquipment(equipment.id);

    expect(prismaMock.$transaction).toHaveBeenCalledOnce();
    expect(transactionMocks.equipment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: equipment.id },
        data: expect.objectContaining({ isDeactivated: true }),
      }),
    );
  });

  it("writes exactly one history row for a location change", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.equipment.findUniqueOrThrow.mockResolvedValue({
      ...equipment,
      locationId: 4,
    });
    transactionMocks.equipment.update.mockResolvedValue({
      ...equipment,
      locationId: 4,
    });
    transactionMocks.equipmentLocationHistory.create.mockResolvedValue({});

    await updateEquipment(equipment.id, { locationId: 4 });

    expect(prismaMock.$transaction).toHaveBeenCalledOnce();
    expect(transactionMocks.equipment.update).toHaveBeenCalledOnce();
    expect(
      transactionMocks.equipmentLocationHistory.create,
    ).toHaveBeenCalledOnce();
    expect(
      transactionMocks.equipmentLocationHistory.create,
    ).toHaveBeenCalledWith({
      data: {
        equipmentId: equipment.id,
        fromLocationId: equipment.locationId,
        toLocationId: 4,
      },
    });
  });

  it("does not write history when the location is unchanged", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.equipment.findUniqueOrThrow.mockResolvedValue(equipment);

    await updateEquipment(equipment.id, { locationId: equipment.locationId });

    expect(
      transactionMocks.equipmentLocationHistory.create,
    ).not.toHaveBeenCalled();
    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
  });
});
