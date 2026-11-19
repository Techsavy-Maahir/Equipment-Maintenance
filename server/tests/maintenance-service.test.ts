import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
  const maintenancePlan = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };
  const maintenanceOccurrence = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };
  const auditLog = {
    create: vi.fn(),
  };

  return {
    prismaMock: {
      maintenancePlan,
      maintenanceOccurrence,
      auditLog,
      equipment: { findUnique: vi.fn() },
      user: { findUnique: vi.fn() },
      $transaction: vi.fn(),
    },
    txMock: { maintenancePlan, maintenanceOccurrence, auditLog },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import {
  completeMaintenanceOccurrence,
  generateDueOccurrencesForActivePlans,
  generateOccurrenceForPlan,
  getNextDueDate,
  getOccurrenceDisplayStatus,
  listMaintenanceOccurrences,
  listOccurrencesForPlan,
} from "../src/services/maintenance.service.js";

describe("maintenance service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.$transaction.mockImplementation(async (callback) => callback(txMock));
  });

  it.each([
    ["DAILY", new Date("2025-03-14T00:00:00Z"), new Date("2025-03-15T00:00:00Z")],
    ["WEEKLY", new Date("2025-03-14T00:00:00Z"), new Date("2025-03-21T00:00:00Z")],
    ["MONTHLY", new Date("2025-01-31T00:00:00Z"), new Date("2025-02-28T00:00:00Z")],
    ["QUARTERLY", new Date("2025-01-31T00:00:00Z"), new Date("2025-04-30T00:00:00Z")],
    ["HALF_YEARLY", new Date("2025-12-31T00:00:00Z"), new Date("2026-06-30T00:00:00Z")],
    ["YEARLY", new Date("2024-02-29T00:00:00Z"), new Date("2025-02-28T00:00:00Z")],
  ])("calculates the next due date for %s", (frequency, start, expected) => {
    const result = getNextDueDate(start, frequency);

    expect(
      new Date(result.getFullYear(), result.getMonth(), result.getDate()).getTime(),
    ).toBe(new Date(expected.getFullYear(), expected.getMonth(), expected.getDate()).getTime());
  });

  it("creates an occurrence and advances the plan to the next due date", async () => {
    txMock.maintenancePlan.findUnique.mockResolvedValue({
      id: 1,
      isActive: true,
      frequency: "MONTHLY",
      nextDueDate: new Date("2025-01-31T00:00:00Z"),
      equipment: { isDeactivated: false },
    });
    txMock.maintenanceOccurrence.findUnique.mockResolvedValue(null);
    txMock.maintenanceOccurrence.create.mockResolvedValue({
      id: 10,
      maintenancePlanId: 1,
      dueDate: new Date("2025-01-31T00:00:00Z"),
      status: "PENDING",
    });
    txMock.maintenancePlan.update.mockResolvedValue({
      id: 1,
      nextDueDate: new Date("2025-02-28T00:00:00Z"),
    });

    const result = await generateOccurrenceForPlan(1);

    expect(txMock.maintenanceOccurrence.create).toHaveBeenCalledWith({
      data: {
        maintenancePlanId: 1,
        dueDate: new Date("2025-01-31T00:00:00Z"),
        status: "PENDING",
      },
    });
    expect(result.created).toBe(true);
    expect(txMock.maintenancePlan.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { nextDueDate: new Date("2025-02-28T00:00:00Z") },
      include: expect.any(Object),
    });
  });

  it("does not create a duplicate occurrence when the due date already exists", async () => {
    const dueDate = new Date("2025-03-01T00:00:00Z");
    txMock.maintenancePlan.findUnique.mockResolvedValue({
      id: 2,
      isActive: true,
      frequency: "MONTHLY",
      nextDueDate: dueDate,
      equipment: { isDeactivated: false },
    });
    txMock.maintenanceOccurrence.findUnique.mockResolvedValue({ id: 9, dueDate });

    const result = await generateOccurrenceForPlan(2);

    expect(txMock.maintenanceOccurrence.create).not.toHaveBeenCalled();
    expect(result.created).toBe(false);
  });

  it("rejects generation for inactive plans", async () => {
    txMock.maintenancePlan.findUnique.mockResolvedValue({
      id: 4,
      isActive: false,
      frequency: "MONTHLY",
      nextDueDate: new Date("2025-03-01T00:00:00Z"),
      equipment: { isDeactivated: false },
    });

    await expect(generateOccurrenceForPlan(4)).rejects.toMatchObject({
      statusCode: 409,
    });
  });

  it("rejects generation when the plan equipment is inactive", async () => {
    txMock.maintenancePlan.findUnique.mockResolvedValue({
      id: 5,
      isActive: true,
      frequency: "MONTHLY",
      nextDueDate: new Date("2025-03-01T00:00:00Z"),
      equipment: { isDeactivated: true },
    });

    await expect(generateOccurrenceForPlan(5)).rejects.toMatchObject({
      statusCode: 409,
    });
  });

  it("skips failed plans when generating due occurrences for active plans", async () => {
    prismaMock.maintenancePlan.findMany.mockResolvedValue([{ id: 7 }, { id: 8 }]);
    txMock.maintenancePlan.findUnique.mockImplementation(async ({ where }) => {
      if (where.id === 7) {
        return {
          id: 7,
          isActive: true,
          frequency: "MONTHLY",
          nextDueDate: new Date("2025-03-01T00:00:00Z"),
          equipment: { isDeactivated: false },
        };
      }

      return {
        id: 8,
        isActive: false,
        frequency: "MONTHLY",
        nextDueDate: new Date("2025-03-01T00:00:00Z"),
        equipment: { isDeactivated: false },
      };
    });
    txMock.maintenanceOccurrence.findUnique.mockResolvedValue(null);
    txMock.maintenanceOccurrence.create.mockResolvedValue({
      id: 90,
      maintenancePlanId: 7,
      dueDate: new Date("2025-03-01T00:00:00Z"),
      status: "PENDING",
    });
    txMock.maintenancePlan.update.mockResolvedValue({
      id: 7,
      nextDueDate: new Date("2025-03-31T00:00:00Z"),
    });

    const results = await generateDueOccurrencesForActivePlans();

    expect(results).toHaveLength(1);
    expect(results[0].created).toBe(true);
    expect(txMock.maintenanceOccurrence.create).toHaveBeenCalledTimes(1);
  });

  describe("occurrence lifecycle and status display", () => {
    it("correctly identifies COMPLETED and CANCELLED status", () => {
      expect(
        getOccurrenceDisplayStatus({
          dueDate: new Date("2020-01-01"),
          status: "COMPLETED",
        }),
      ).toBe("COMPLETED");

      expect(
        getOccurrenceDisplayStatus({
          dueDate: new Date("2030-01-01"),
          status: "CANCELLED",
        }),
      ).toBe("CANCELLED");
    });

    it("correctly identifies OVERDUE, DUE, and UPCOMING occurrences", () => {
      const pastDate = new Date(Date.now() - 48 * 3600 * 1000);
      const futureDate = new Date(Date.now() + 48 * 3600 * 1000);
      const todayDate = new Date();

      expect(
        getOccurrenceDisplayStatus({ dueDate: pastDate, status: "PENDING" }),
      ).toBe("OVERDUE");

      expect(
        getOccurrenceDisplayStatus({ dueDate: futureDate, status: "PENDING" }),
      ).toBe("UPCOMING");

      expect(
        getOccurrenceDisplayStatus({ dueDate: todayDate, status: "PENDING" }),
      ).toBe("DUE");
    });

    it("lists occurrences with pagination and computed display status", async () => {
      prismaMock.maintenanceOccurrence.count.mockResolvedValue(1);
      prismaMock.maintenanceOccurrence.findMany.mockResolvedValue([
        {
          id: 101,
          maintenancePlanId: 1,
          dueDate: new Date("2025-01-01"),
          status: "PENDING",
        },
      ]);

      const result = await listMaintenanceOccurrences({ page: 1, pageSize: 10 });

      expect(result.total).toBe(1);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].displayStatus).toBeDefined();
    });

    it("lists occurrences for a specific plan", async () => {
      prismaMock.maintenancePlan.findUnique.mockResolvedValue({ id: 5 });
      prismaMock.maintenanceOccurrence.findMany.mockResolvedValue([
        {
          id: 201,
          maintenancePlanId: 5,
          dueDate: new Date("2026-06-01"),
          status: "PENDING",
        },
      ]);

      const items = await listOccurrencesForPlan(5);

      expect(items).toHaveLength(1);
      expect(items[0].id).toBe(201);
    });

    it("allows assigned technician to complete an occurrence and generates next occurrence", async () => {
      const actor = { id: 3, role: "TECHNICIAN" as const, email: "tech@example.com", name: "Tech 1" };
      const dueDate = new Date("2026-05-01T00:00:00Z");

      txMock.maintenanceOccurrence.findUnique.mockImplementation(async ({ where }) => {
        if (where.id === 50) {
          return {
            id: 50,
            maintenancePlanId: 2,
            dueDate,
            status: "PENDING",
            maintenancePlan: {
              id: 2,
              frequency: "MONTHLY",
              nextDueDate: dueDate,
              assignedTechnicianId: 3,
              equipment: { id: 1, isDeactivated: false },
            },
          };
        }
        return null; // For next occurrence check
      });

      txMock.maintenanceOccurrence.update.mockResolvedValue({
        id: 50,
        maintenancePlanId: 2,
        dueDate,
        status: "COMPLETED",
        completedAt: new Date("2026-05-01T10:00:00Z"),
        completedById: 3,
        workPerformed: "Cleaned motor brushes",
        remarks: "Normal wear",
        maintenancePlan: { id: 2 },
      });

      txMock.maintenancePlan.update.mockResolvedValue({
        id: 2,
        lastCompletedAt: new Date("2026-05-01T10:00:00Z"),
        nextDueDate: new Date("2026-06-01T10:00:00Z"),
      });

      txMock.maintenanceOccurrence.create.mockResolvedValue({
        id: 51,
        maintenancePlanId: 2,
        dueDate: new Date("2026-06-01T10:00:00Z"),
        status: "PENDING",
      });

      const res = await completeMaintenanceOccurrence(
        50,
        {
          completedAt: new Date("2026-05-01T10:00:00Z"),
          workPerformed: "Cleaned motor brushes",
          remarks: "Normal wear",
        },
        actor,
      );

      expect(res.occurrence.status).toBe("COMPLETED");
      expect(res.createdNextOccurrence).toBe(true);
      expect(txMock.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          action: "MAINTENANCE_OCCURRENCE_COMPLETED",
          entityId: 50,
        }),
      });
    });

    it("rejects completion if non-assigned technician attempts to complete", async () => {
      const actor = { id: 99, role: "TECHNICIAN" as const, email: "other@example.com", name: "Other Tech" };

      txMock.maintenanceOccurrence.findUnique.mockResolvedValue({
        id: 50,
        maintenancePlanId: 2,
        dueDate: new Date(),
        status: "PENDING",
        maintenancePlan: {
          id: 2,
          assignedTechnicianId: 3, // Assigned to user 3
          equipment: { id: 1, isDeactivated: false },
        },
      });

      await expect(
        completeMaintenanceOccurrence(50, { workPerformed: "Test" }, actor),
      ).rejects.toMatchObject({
        statusCode: 403,
      });
    });
  });
});
