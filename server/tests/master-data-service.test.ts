import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, transactionMocks } = vi.hoisted(() => {
  const deptDelegates = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  const locDelegates = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  const catDelegates = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  const equipDelegates = {
    count: vi.fn(),
  };

  const historyDelegates = {
    count: vi.fn(),
  };

  return {
    prismaMock: {
      $transaction: vi.fn(),
      department: deptDelegates,
      location: locDelegates,
      equipmentCategory: catDelegates,
      equipment: equipDelegates,
      equipmentLocationHistory: historyDelegates,
    },
    transactionMocks: {
      location: {
        findUnique: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
      },
      equipment: {
        count: vi.fn(),
      },
      equipmentLocationHistory: {
        count: vi.fn(),
      },
    },
  };
});

vi.mock("../src/prisma.js", () => ({
  prisma: prismaMock,
}));

import {
  createDepartment,
  deactivateDepartment,
  listDepartments,
  updateDepartment,
  createLocation,
  deactivateLocation,
  listLocations,
  updateLocation,
  createCategory,
  deactivateCategory,
  listCategories,
} from "../src/services/master-data.service.js";
import { AppError, ConflictError, NotFoundError } from "../src/errors.js";

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.$transaction.mockImplementation(async (callback: any) =>
    callback(transactionMocks)
  );
});

describe("Master Data Service", () => {
  describe("Departments", () => {
    it("lists departments with search and pagination", async () => {
      prismaMock.department.count.mockResolvedValue(1);
      prismaMock.department.findMany.mockResolvedValue([
        { id: 1, name: "Engineering", isActive: true, _count: { equipment: 5 } },
      ]);

      const result = await listDepartments({
        search: "Eng",
        status: "active",
        page: 1,
        pageSize: 8,
      });

      expect(result.total).toBe(1);
      expect(result.items[0].name).toBe("Engineering");
      expect(prismaMock.department.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            name: { contains: "Eng", mode: "insensitive" },
            isActive: true,
          },
        })
      );
    });

    it("rejects duplicate department name upon creation", async () => {
      prismaMock.department.findFirst.mockResolvedValue({
        id: 1,
        name: "Engineering",
        isActive: true,
      });

      await expect(createDepartment({ name: "Engineering" })).rejects.toThrow(
        ConflictError
      );
    });

    it("creates department when name is unique", async () => {
      prismaMock.department.findFirst.mockResolvedValue(null);
      prismaMock.department.create.mockResolvedValue({
        id: 2,
        name: "Quality",
        isActive: true,
        _count: { equipment: 0 },
      });

      const created = await createDepartment({ name: "Quality" });
      expect(created.name).toBe("Quality");
      expect(prismaMock.department.create).toHaveBeenCalledWith({
        data: { name: "Quality", isActive: true },
        include: { _count: { select: { equipment: true } } },
      });
    });

    it("rejects deactivating an already-inactive department", async () => {
      prismaMock.department.findUnique.mockResolvedValue({
        id: 1,
        name: "Old Dept",
        isActive: false,
      });

      await expect(deactivateDepartment(1)).rejects.toThrow(AppError);
    });
  });

  describe("Location Deactivation Safety Rules", () => {
    it("blocks deactivation through location update when equipment is assigned", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 11,
        name: "Assigned Area",
        isActive: true,
      });
      transactionMocks.location.findFirst.mockResolvedValue(null);
      transactionMocks.equipment.count.mockResolvedValue(1);

      await expect(updateLocation(11, { isActive: false })).rejects.toThrow(
        ConflictError
      );
      expect(transactionMocks.location.update).not.toHaveBeenCalled();
    });

    it("blocks deactivation through location update when history targets the location", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 12,
        name: "Historical Area",
        isActive: true,
      });
      transactionMocks.location.findFirst.mockResolvedValue(null);
      transactionMocks.equipment.count.mockResolvedValue(0);
      transactionMocks.equipmentLocationHistory.count.mockResolvedValue(1);

      await expect(updateLocation(12, { isActive: false })).rejects.toThrow(
        ConflictError
      );
      expect(transactionMocks.location.update).not.toHaveBeenCalled();
    });

    it("allows safe deactivation through location update", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 14,
        name: "Clear Area",
        isActive: true,
      });
      transactionMocks.equipment.count.mockResolvedValue(0);
      transactionMocks.equipmentLocationHistory.count.mockResolvedValue(0);
      transactionMocks.location.update.mockResolvedValue({
        id: 14,
        name: "Clear Area",
        isActive: false,
        _count: { equipment: 0 },
      });

      const result = await updateLocation(14, { isActive: false });

      expect(result.isActive).toBe(false);
      expect(transactionMocks.location.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 14 },
          data: { isActive: false },
        })
      );
    });

    it("allows location update and activation without applying deactivation checks", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 13,
        name: "Inactive Area",
        isActive: false,
      });
      transactionMocks.location.update.mockResolvedValue({
        id: 13,
        name: "Renamed Area",
        isActive: true,
        _count: { equipment: 0 },
      });

      const result = await updateLocation(13, {
        name: "Renamed Area",
        isActive: true,
      });

      expect(result.isActive).toBe(true);
      expect(transactionMocks.equipment.count).not.toHaveBeenCalled();
      expect(transactionMocks.equipmentLocationHistory.count).not.toHaveBeenCalled();
    });

    it("rejects deactivating a location when equipment is currently assigned", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 10,
        name: "Plant Zone A",
        isActive: true,
      });
      transactionMocks.equipment.count.mockResolvedValue(3); // 3 equipment assigned!

      await expect(deactivateLocation(10)).rejects.toThrow(ConflictError);
      await expect(deactivateLocation(10)).rejects.toThrow(
        /equipment item\(s\) are currently assigned/
      );
      expect(transactionMocks.location.update).not.toHaveBeenCalled();
    });

    it("rejects deactivating a location when referenced as a relocation destination in history", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 20,
        name: "Storage Room",
        isActive: true,
      });
      transactionMocks.equipment.count.mockResolvedValue(0); // 0 equipment currently assigned
      transactionMocks.equipmentLocationHistory.count.mockResolvedValue(2); // 2 history destination references!

      await expect(deactivateLocation(20)).rejects.toThrow(ConflictError);
      await expect(deactivateLocation(20)).rejects.toThrow(
        /location is referenced as a destination in relocation history/
      );
      expect(transactionMocks.location.update).not.toHaveBeenCalled();
    });

    it("successfully soft-deactivates location when neither restriction applies", async () => {
      transactionMocks.location.findUnique.mockResolvedValue({
        id: 30,
        name: "Empty Yard",
        isActive: true,
      });
      transactionMocks.equipment.count.mockResolvedValue(0);
      transactionMocks.equipmentLocationHistory.count.mockResolvedValue(0);
      transactionMocks.location.update.mockResolvedValue({
        id: 30,
        name: "Empty Yard",
        isActive: false,
        _count: { equipment: 0 },
      });

      const result = await deactivateLocation(30);

      expect(result.isActive).toBe(false);
      expect(transactionMocks.location.update).toHaveBeenCalledWith({
        where: { id: 30 },
        data: { isActive: false },
        include: { _count: { select: { equipment: true } } },
      });
    });
  });

  describe("Categories", () => {
    it("creates category when name is unique", async () => {
      prismaMock.equipmentCategory.findFirst.mockResolvedValue(null);
      prismaMock.equipmentCategory.create.mockResolvedValue({
        id: 5,
        name: "Pneumatics",
        isActive: true,
        _count: { equipment: 0 },
      });

      const result = await createCategory({ name: "Pneumatics" });
      expect(result.name).toBe("Pneumatics");
    });

    it("rejects deactivating already inactive category", async () => {
      prismaMock.equipmentCategory.findUnique.mockResolvedValue({
        id: 5,
        name: "Pneumatics",
        isActive: false,
      });

      await expect(deactivateCategory(5)).rejects.toThrow(AppError);
    });
  });
});
