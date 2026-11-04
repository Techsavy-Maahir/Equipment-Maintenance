
import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, transactionMocks } = vi.hoisted(() => {
  const equipmentDelegates = {
    count: vi.fn(),
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
      department: { findUnique: vi.fn() },
      location: { findMany: vi.fn(), findUnique: vi.fn() },
      equipmentCategory: { findMany: vi.fn(), findUnique: vi.fn() },
    },
    transactionMocks: {
      equipment: {
        count: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        findUniqueOrThrow: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
      },
      equipmentLocationHistory: {
        create: vi.fn(),
      },
      department: { findUnique: vi.fn() },
      location: { findMany: vi.fn(), findUnique: vi.fn() },
      equipmentCategory: { findMany: vi.fn(), findUnique: vi.fn() },
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
  department: transactionMocks.department,
  location: transactionMocks.location,
  equipmentCategory: transactionMocks.equipmentCategory,
};

const validReferences = () => {
  transactionMocks.department.findUnique.mockResolvedValue({ isActive: true });
  transactionMocks.location.findUnique.mockResolvedValue({ isActive: true });
  transactionMocks.equipmentCategory.findUnique.mockResolvedValue({
    isActive: true,
  });
};

const createInput = {
  code: "PUMP-001",
  name: "Pump",
  criticality: "HIGH" as const,
  departmentId: 1,
  locationId: 2,
  categoryId: 3,
};

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.$transaction.mockImplementation((callback) =>
    callback(transactionClient),
  );
});

describe("equipment service", () => {
  it("uses the same filters for paginated equipment and matching totals", async () => {
    transactionMocks.equipment.count.mockResolvedValue(17);
    transactionMocks.equipment.findMany.mockResolvedValue([equipment]);
    transactionMocks.location.findMany.mockResolvedValue([]);
    transactionMocks.equipmentCategory.findMany.mockResolvedValue([]);

    const result = await listEquipment({
      search: "CNC",
      status: "ACTIVE",
      location: 2,
      category: 3,
      page: 2,
      pageSize: 8,
    });

    const countArgs = transactionMocks.equipment.count.mock.calls[0][0];
    const listArgs = transactionMocks.equipment.findMany.mock.calls[0][0];

    expect(listArgs.where).toBe(countArgs.where);
    expect(countArgs.where).toEqual({
      isDeactivated: false,
      status: "ACTIVE",
      locationId: 2,
      categoryId: 3,
      OR: [
        { code: { contains: "CNC", mode: "insensitive" } },
        { name: { contains: "CNC", mode: "insensitive" } },
        { serialNumber: { contains: "CNC", mode: "insensitive" } },
      ],
    });
    expect(listArgs).toEqual(
      expect.objectContaining({ skip: 8, take: 8, orderBy: { id: "asc" } }),
    );
    expect(result).toEqual({
      items: [equipment],
      total: 17,
      page: 2,
      pageSize: 8,
      locations: [],
      categories: [],
    });
  });

  it("clamps requested list pages to the last page", async () => {
    transactionMocks.equipment.count.mockResolvedValue(10);
    transactionMocks.equipment.findMany.mockResolvedValue([equipment]);
    transactionMocks.location.findMany.mockResolvedValue([]);
    transactionMocks.equipmentCategory.findMany.mockResolvedValue([]);

    const result = await listEquipment({ search: "", page: 99, pageSize: 8 });

    expect(result.page).toBe(2);
    expect(transactionMocks.equipment.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 8, take: 8 }),
    );
  });

  it("creates equipment with a null default description", async () => {
    validReferences();
    transactionMocks.equipment.create.mockResolvedValue(equipment);

    await createEquipment(createInput);

    expect(prismaMock.$transaction).toHaveBeenCalledOnce();
    expect(transactionMocks.equipment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ description: null }),
      }),
    );
  });

  it.each([
    ["departmentId", "department"],
    ["locationId", "location"],
    ["categoryId", "equipmentCategory"],
  ] as const)(
    "rejects an unknown %s when creating equipment",
    async (field, delegate) => {
      validReferences();
      transactionMocks[delegate].findUnique.mockResolvedValue(null);

      await expect(createEquipment(createInput)).rejects.toMatchObject({
        name: "ValidationError",
        details: {
          [field]: expect.any(String),
        },
      });

      expect(transactionMocks.equipment.create).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["departmentId", "department"],
    ["locationId", "location"],
    ["categoryId", "equipmentCategory"],
  ] as const)(
    "rejects an inactive %s when creating equipment",
    async (field, delegate) => {
      validReferences();
      transactionMocks[delegate].findUnique.mockResolvedValue({
        isActive: false,
      });

      await expect(createEquipment(createInput)).rejects.toMatchObject({
        name: "ValidationError",
        details: {
          [field]: expect.any(String),
        },
      });

      expect(transactionMocks.equipment.create).not.toHaveBeenCalled();
    },
  );

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
    validReferences();
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
    validReferences();
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.equipment.findUniqueOrThrow.mockResolvedValue(equipment);

    await updateEquipment(equipment.id, { locationId: equipment.locationId });

    expect(
      transactionMocks.equipmentLocationHistory.create,
    ).not.toHaveBeenCalled();
    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
  });

  it("rejects an unknown reference during an equipment update", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.location.findUnique.mockResolvedValue(null);

    await expect(
      updateEquipment(equipment.id, { locationId: 999 }),
    ).rejects.toMatchObject({
      name: "ValidationError",
      details: {
        locationId: expect.any(String),
      },
    });

    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
    expect(
      transactionMocks.equipmentLocationHistory.create,
    ).not.toHaveBeenCalled();
  });

  it("rejects an inactive reference during an equipment update", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
    transactionMocks.department.findUnique.mockResolvedValue({
      isActive: false,
    });

    await expect(
      updateEquipment(equipment.id, { departmentId: 999 }),
    ).rejects.toMatchObject({
      name: "ValidationError",
      details: {
        departmentId: expect.any(String),
      },
    });

    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
  });

    it.each([
    ["departmentId", "department"],
    ["locationId", "location"],
    ["categoryId", "equipmentCategory"],
  ] as const)(
    "rejects an unknown %s during an equipment update",
    async (field, delegate) => {
      transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
      transactionMocks[delegate].findUnique.mockResolvedValue(null);

      await expect(
        updateEquipment(equipment.id, { [field]: 999 }),
      ).rejects.toMatchObject({
        name: "ValidationError",
        details: {
          [field]: expect.any(String),
        },
      });

      expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["departmentId", "department"],
    ["locationId", "location"],
    ["categoryId", "equipmentCategory"],
  ] as const)(
    "rejects an inactive %s during an equipment update",
    async (field, delegate) => {
      transactionMocks.equipment.findUnique.mockResolvedValue(equipment);
      transactionMocks[delegate].findUnique.mockResolvedValue({
        isActive: false,
      });

      await expect(
        updateEquipment(equipment.id, { [field]: 999 }),
      ).rejects.toMatchObject({
        name: "ValidationError",
        details: {
          [field]: expect.any(String),
        },
      });

      expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
    },
  );
});
