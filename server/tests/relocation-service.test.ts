import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
  const equipment = {
    findUnique: vi.fn(),
    update: vi.fn(),
  };
  const location = {
    findUnique: vi.fn(),
  };
  const equipmentLocationHistory = {
    count: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
  };
  const auditLog = {
    findMany: vi.fn(),
    create: vi.fn(),
  };

  return {
    prismaMock: {
      equipment,
      location,
      equipmentLocationHistory,
      auditLog,
      $transaction: vi.fn(),
    },
    txMock: {
      equipment,
      location,
      equipmentLocationHistory,
      auditLog,
    },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import {
  getRelocationsForEquipment,
  listRelocations,
  relocateEquipment,
} from "../src/services/relocation.service.js";

describe("relocation service", () => {
  const adminActor = {
    id: 1,
    role: "ADMIN" as const,
    name: "Admin User",
    email: "admin@example.com",
  };
  const managerActor = {
    id: 2,
    role: "MANAGER" as const,
    name: "Plant Manager",
    email: "manager@example.com",
  };
  const technicianActor = {
    id: 3,
    role: "TECHNICIAN" as const,
    name: "Tech One",
    email: "tech@example.com",
  };
  const viewerActor = {
    id: 4,
    role: "VIEWER" as const,
    name: "Viewer",
    email: "viewer@example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.$transaction.mockImplementation(async (callback) => callback(txMock));
  });

  describe("relocateEquipment", () => {
    it("rejects unauthorized roles (TECHNICIAN and VIEWER) with 403 Forbidden", async () => {
      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 2, reason: "Line expansion" },
          technicianActor,
        ),
      ).rejects.toMatchObject({ statusCode: 403 });

      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 2, reason: "Line expansion" },
          viewerActor,
        ),
      ).rejects.toMatchObject({ statusCode: 403 });
    });

    it("rejects invalid or too short reason", async () => {
      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 2, reason: "ab" },
          adminActor,
        ),
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it("rejects when equipment is not found or deactivated", async () => {
      txMock.equipment.findUnique.mockResolvedValue(null);

      await expect(
        relocateEquipment(
          { equipmentId: 999, toLocationId: 2, reason: "Line expansion" },
          managerActor,
        ),
      ).rejects.toMatchObject({ statusCode: 404 });

      txMock.equipment.findUnique.mockResolvedValue({
        id: 10,
        isDeactivated: true,
        locationId: 1,
      });

      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 2, reason: "Line expansion" },
          managerActor,
        ),
      ).rejects.toMatchObject({ statusCode: 404 });
    });

    it("rejects when destination location is identical to current location", async () => {
      txMock.equipment.findUnique.mockResolvedValue({
        id: 10,
        isDeactivated: false,
        locationId: 5,
        location: { id: 5, name: "Bay 1" },
      });

      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 5, reason: "Same location" },
          adminActor,
        ),
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it("rejects when target location is inactive or missing", async () => {
      txMock.equipment.findUnique.mockResolvedValue({
        id: 10,
        isDeactivated: false,
        locationId: 1,
        location: { id: 1, name: "Bay 1" },
      });
      txMock.location.findUnique.mockResolvedValue(null);

      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 99, reason: "Line move" },
          adminActor,
        ),
      ).rejects.toMatchObject({ statusCode: 400 });

      txMock.location.findUnique.mockResolvedValue({ id: 99, isActive: false });

      await expect(
        relocateEquipment(
          { equipmentId: 10, toLocationId: 99, reason: "Line move" },
          adminActor,
        ),
      ).rejects.toMatchObject({ statusCode: 400 });
    });

    it("successfully relocates equipment, updates location, records history and audit log", async () => {
      txMock.equipment.findUnique.mockImplementation(async ({ where }) => {
        if (where.id === 10) {
          return {
            id: 10,
            code: "EQ-100",
            name: "Conveyor Belt 1",
            locationId: 1,
            isDeactivated: false,
            location: { id: 1, name: "Stamping Bay" },
          };
        }
        return null;
      });

      txMock.location.findUnique.mockResolvedValue({
        id: 2,
        name: "Assembly Line 4",
        isActive: true,
      });

      txMock.equipment.update.mockResolvedValue({ id: 10, locationId: 2 });
      txMock.equipmentLocationHistory.create.mockResolvedValue({
        id: 55,
        equipmentId: 10,
        fromLocationId: 1,
        toLocationId: 2,
      });

      txMock.equipmentLocationHistory.findFirst.mockResolvedValue({
        id: 55,
        equipmentId: 10,
        fromLocationId: 1,
        toLocationId: 2,
        changedAt: new Date("2026-11-16T10:00:00Z"),
        equipment: { id: 10, code: "EQ-100", name: "Conveyor Belt 1" },
        fromLocation: { id: 1, name: "Stamping Bay" },
        toLocation: { id: 2, name: "Assembly Line 4" },
      });

      const result = await relocateEquipment(
        { equipmentId: 10, toLocationId: 2, reason: "Rebalanced assembly line capacity" },
        adminActor,
      );

      expect(result.id).toBe(55);
      expect(result.equipmentId).toBe(10);
      expect(result.fromLocationId).toBe(1);
      expect(result.toLocationId).toBe(2);
      expect(result.reason).toBe("Rebalanced assembly line capacity");
      expect(result.relocatedBy?.name).toBe("Admin User");

      expect(txMock.equipment.update).toHaveBeenCalledWith({
        where: { id: 10 },
        data: { locationId: 2 },
      });

      expect(txMock.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: "EQUIPMENT_RELOCATED",
          entityType: "Equipment",
          entityId: 10,
          summary: expect.stringContaining("Rebalanced assembly line capacity"),
        }),
      });
    });
  });

  describe("listRelocations and getRelocationsForEquipment", () => {
    it("returns paginated relocation records", async () => {
      prismaMock.equipmentLocationHistory.count.mockResolvedValue(1);
      prismaMock.equipmentLocationHistory.findMany.mockResolvedValue([
        {
          id: 55,
          equipmentId: 10,
          fromLocationId: 1,
          toLocationId: 2,
          changedAt: new Date(),
          equipment: { id: 10, code: "EQ-100", name: "Conveyor Belt 1" },
          fromLocation: { id: 1, name: "Bay 1" },
          toLocation: { id: 2, name: "Bay 2" },
        },
      ]);
      prismaMock.auditLog.findMany.mockResolvedValue([]);

      const result = await listRelocations({ page: 1, pageSize: 10 });

      expect(result.total).toBe(1);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].equipment.code).toBe("EQ-100");
    });

    it("retrieves relocation history by equipment", async () => {
      prismaMock.equipment.findUnique.mockResolvedValue({ id: 10 });
      prismaMock.equipmentLocationHistory.count.mockResolvedValue(1);
      prismaMock.equipmentLocationHistory.findMany.mockResolvedValue([
        {
          id: 55,
          equipmentId: 10,
          fromLocationId: 1,
          toLocationId: 2,
          changedAt: new Date(),
          equipment: { id: 10, code: "EQ-100", name: "Conveyor Belt 1" },
          fromLocation: { id: 1, name: "Bay 1" },
          toLocation: { id: 2, name: "Bay 2" },
        },
      ]);
      prismaMock.auditLog.findMany.mockResolvedValue([]);

      const history = await getRelocationsForEquipment(10);

      expect(history).toHaveLength(1);
      expect(history[0].id).toBe(55);
    });
  });
});
