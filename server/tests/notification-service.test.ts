import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
  return {
    prismaMock: {
      $transaction: vi.fn(),
      maintenanceOccurrence: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
      },
      maintenancePlan: {
        update: vi.fn(),
      },
      notification: {
        upsert: vi.fn(),
      },
      notificationRecipient: {
        findMany: vi.fn(),
        findFirst: vi.fn(),
        update: vi.fn(),
        createMany: vi.fn(),
      },
      schedulerRun: {
        upsert: vi.fn(),
      },
      user: {
        findMany: vi.fn(),
      },
    },
    txMock: {
      maintenanceOccurrence: {
        findUnique: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
      },
      maintenancePlan: {
        update: vi.fn(),
      },
      notification: {
        upsert: vi.fn(),
      },
      notificationRecipient: {
        createMany: vi.fn(),
      },
      schedulerRun: {
        upsert: vi.fn(),
      },
      user: {
        findMany: vi.fn(),
      },
    },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import { completeMaintenanceOccurrence } from "../src/services/maintenance.service.js";
import {
  getNotificationsForUser,
  isPendingMigrationError,
  markNotificationRead,
  runReminderJob,
} from "../src/services/notification.service.js";
import {
  executeReminderJobTick,
  resetReminderJobStateForTests,
} from "../src/jobs/reminderJob.js";

describe("maintenance occurrence completion and reminder job", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.$transaction.mockImplementation(async (callback) => callback(txMock));
  });

  it("completes a maintenance occurrence, advances the plan and creates the next due occurrence", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-31T00:00:00Z"));

    txMock.maintenanceOccurrence.findUnique.mockImplementation(async ({ where }) => {
      if (where.id === 1) {
        return {
          id: 1,
          maintenancePlanId: 10,
          dueDate: new Date("2025-01-31T00:00:00Z"),
          status: "PENDING",
          maintenancePlan: {
            id: 10,
            frequency: "MONTHLY",
            nextDueDate: new Date("2025-01-31T00:00:00Z"),
            assignedTechnicianId: 7,
            equipment: { id: 99, isDeactivated: false },
          },
        };
      }

      return null;
    });

    txMock.maintenanceOccurrence.update.mockResolvedValue({
      id: 1,
      status: "COMPLETED",
    });
    txMock.maintenancePlan.update.mockResolvedValue({ id: 10, nextDueDate: new Date("2025-02-28T00:00:00Z") });
    txMock.maintenanceOccurrence.create.mockResolvedValue({ id: 12 });

    await completeMaintenanceOccurrence(
      1,
      { workPerformed: "Changed filter", remarks: "Completed successfully" },
      { id: 7, role: "TECHNICIAN" },
    );

    expect(txMock.maintenanceOccurrence.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        data: expect.objectContaining({ status: "COMPLETED" }),
      }),
    );
    expect(txMock.maintenancePlan.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 10 },
        data: expect.objectContaining({ nextDueDate: new Date("2025-02-28T00:00:00Z") }),
      }),
    );

    vi.useRealTimers();
  });

  it("creates notifications for due occurrences and writes recipients without duplicates", async () => {
    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    txMock.schedulerRun.upsert.mockResolvedValue({ id: 1, jobName: "maintenance-reminder", runDate: new Date() });
    txMock.maintenanceOccurrence.findMany.mockResolvedValue([
      {
        id: 44,
        dueDate,
        status: "PENDING",
        maintenancePlan: {
          id: 88,
          activity: "Oil change",
          assignedTechnicianId: 9,
          equipment: { id: 33, code: "EQ-001", name: "Compressor" },
        },
      },
    ]);
    txMock.user.findMany.mockResolvedValue([{ id: 2 }, { id: 3 }]);
    txMock.notification.upsert.mockResolvedValue({ id: 101, occurrenceId: 44, key: "maintenance:44:REMINDER:2025-06-01T00:00:00.000Z" });
    txMock.maintenanceOccurrence.findUnique.mockResolvedValue({
      maintenancePlan: { assignedTechnicianId: 9 },
    });
    txMock.notificationRecipient.createMany.mockResolvedValue({ count: 3 });

    const result = await runReminderJob();

    expect(result.created).toBe(1);
    expect(txMock.schedulerRun.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { jobName_runDate: { jobName: "maintenance-reminder", runDate: expect.any(Date) } },
      }),
    );
    expect(txMock.notificationRecipient.createMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({ notificationId: 101, userId: 9 }),
          expect.objectContaining({ notificationId: 101, userId: 2 }),
        ]),
        skipDuplicates: true,
      }),
    );
  });

  it("catches up overdue occurrences after scheduler downtime and marks kind as OVERDUE", async () => {
    const pastDueDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    txMock.schedulerRun.upsert.mockResolvedValue({ id: 2, jobName: "maintenance-reminder", runDate: new Date() });
    txMock.maintenanceOccurrence.findMany.mockResolvedValue([
      {
        id: 55,
        dueDate: pastDueDate,
        status: "PENDING",
        maintenancePlan: {
          id: 12,
          activity: "Belt replacement",
          assignedTechnicianId: 4,
          equipment: { id: 20, code: "EQ-020", name: "Press Motor" },
        },
      },
    ]);
    txMock.user.findMany.mockResolvedValue([{ id: 1 }]); // manager
    txMock.notification.upsert.mockImplementation(async ({ create }) => ({
      id: 202,
      ...create,
    }));
    txMock.maintenanceOccurrence.findUnique.mockResolvedValue({
      maintenancePlan: { assignedTechnicianId: 4 },
    });
    txMock.notificationRecipient.createMany.mockResolvedValue({ count: 2 });

    const result = await runReminderJob();

    expect(result.created).toBe(1);
    expect(txMock.notification.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({
          kind: "OVERDUE",
          occurrenceId: 55,
        }),
      }),
    );
  });

  it("retrieves notifications for a user and calculates unread count", async () => {
    prismaMock.notificationRecipient.findMany.mockResolvedValue([
      {
        id: 1,
        isRead: false,
        readAt: null,
        notificationId: 10,
        notification: {
          id: 10,
          key: "k1",
          kind: "REMINDER",
          dueDate: new Date(),
          title: "Maintenance due",
          message: "Due soon",
          createdAt: new Date(),
          occurrenceId: 1,
          occurrence: null,
        },
      },
      {
        id: 2,
        isRead: true,
        readAt: new Date(),
        notificationId: 11,
        notification: {
          id: 11,
          key: "k2",
          kind: "OVERDUE",
          dueDate: new Date(),
          title: "Overdue alert",
          message: "Overdue",
          createdAt: new Date(),
          occurrenceId: 2,
          occurrence: null,
        },
      },
    ]);

    const result = await getNotificationsForUser(5);

    expect(result.items).toHaveLength(2);
    expect(result.unreadCount).toBe(1);
  });

  it("marks a notification as read for a user", async () => {
    prismaMock.notificationRecipient.findFirst.mockResolvedValue({
      id: 1,
      notificationId: 10,
      userId: 5,
      isRead: false,
    });
    prismaMock.notificationRecipient.update.mockResolvedValue({
      id: 1,
      notificationId: 10,
      userId: 5,
      isRead: true,
      readAt: new Date(),
    });

    const result = await markNotificationRead(10, 5);

    expect(result.isRead).toBe(true);
    expect(prismaMock.notificationRecipient.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        data: expect.objectContaining({ isRead: true }),
      }),
    );
  });

  describe("Phase 1: Scheduler startup error resilience and migration pending handling", () => {
    beforeEach(() => {
      resetReminderJobStateForTests();
      vi.restoreAllMocks();
    });

    describe("isPendingMigrationError", () => {
      it("detects P2021 error with meta.table = public.SchedulerRun", () => {
        const error = {
          code: "P2021",
          meta: { table: "public.SchedulerRun" },
          message: "The table public.SchedulerRun does not exist in the current database.",
        };
        expect(isPendingMigrationError(error)).toBe(true);
      });

      it("detects P2021 error with meta.table = MaintenanceOccurrence", () => {
        const error = {
          code: "P2021",
          meta: { table: "MaintenanceOccurrence" },
        };
        expect(isPendingMigrationError(error)).toBe(true);
      });

      it("detects P2021 error with meta.modelName = Notification", () => {
        const error = {
          code: "P2021",
          meta: { modelName: "Notification" },
        };
        expect(isPendingMigrationError(error)).toBe(true);
      });

      it("detects P2021 error from error message when meta is omitted", () => {
        const error = {
          code: "P2021",
          message: "The table `public.SchedulerRun` does not exist in the current database.",
        };
        expect(isPendingMigrationError(error)).toBe(true);
      });

      it("rejects P2021 error for unrelated table such as User or Equipment", () => {
        const userError = {
          code: "P2021",
          meta: { table: "public.User" },
          message: "The table public.User does not exist in the current database.",
        };
        const eqError = {
          code: "P2021",
          meta: { table: "public.Equipment" },
        };
        expect(isPendingMigrationError(userError)).toBe(false);
        expect(isPendingMigrationError(eqError)).toBe(false);
      });

      it("rejects non-P2021 database errors such as unique constraint violations", () => {
        const p2002 = {
          code: "P2002",
          meta: { target: ["key"] },
          message: "Unique constraint failed",
        };
        const generic = new Error("Connection timeout");
        expect(isPendingMigrationError(p2002)).toBe(false);
        expect(isPendingMigrationError(generic)).toBe(false);
        expect(isPendingMigrationError(null)).toBe(false);
      });
    });

    describe("runReminderJob resilience", () => {
      it("gracefully catches missing SchedulerRun table and returns PAUSED_MIGRATION_PENDING", async () => {
        prismaMock.$transaction.mockRejectedValueOnce({
          code: "P2021",
          meta: { table: "public.SchedulerRun" },
          message: "The table public.SchedulerRun does not exist in the current database.",
        });

        const result = await runReminderJob();

        expect(result).toEqual({
          status: "PAUSED_MIGRATION_PENDING",
          run: null,
          created: 0,
          recipients: 0,
        });
      });

      it("re-throws unexpected P2021 errors on unrelated tables", async () => {
        const unrelatedError = {
          code: "P2021",
          meta: { table: "public.Department" },
          message: "The table public.Department does not exist",
        };
        prismaMock.$transaction.mockRejectedValueOnce(unrelatedError);

        await expect(runReminderJob()).rejects.toEqual(unrelatedError);
      });

      it("re-throws generic unexpected errors without suppressing them", async () => {
        const connectionError = new Error("Database connection severed");
        prismaMock.$transaction.mockRejectedValueOnce(connectionError);

        await expect(runReminderJob()).rejects.toThrow("Database connection severed");
      });
    });

    describe("executeReminderJobTick and repeated scheduler invocation", () => {
      it("logs warning once on first pending migration tick and does not repeat every tick", async () => {
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        prismaMock.$transaction.mockRejectedValue({
          code: "P2021",
          meta: { table: "public.SchedulerRun" },
          message: "The table public.SchedulerRun does not exist",
        });

        // First tick
        const tick1 = await executeReminderJobTick();
        expect(tick1).toEqual({ executed: false, pausedReason: "MIGRATION_PENDING" });
        expect(warnSpy).toHaveBeenCalledTimes(1);

        // Second tick (e.g. 1 hour later)
        const tick2 = await executeReminderJobTick();
        expect(tick2).toEqual({ executed: false, pausedReason: "MIGRATION_PENDING" });
        expect(warnSpy).toHaveBeenCalledTimes(1); // Still 1, NOT logged again

        // Third tick
        const tick3 = await executeReminderJobTick();
        expect(tick3).toEqual({ executed: false, pausedReason: "MIGRATION_PENDING" });
        expect(warnSpy).toHaveBeenCalledTimes(1);

        warnSpy.mockRestore();
      });

      it("detects when tables become available, executes successfully and resets logged flag", async () => {
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        // Step 1: Pending migration
        prismaMock.$transaction.mockRejectedValueOnce({
          code: "P2021",
          meta: { table: "public.SchedulerRun" },
        });
        await executeReminderJobTick();
        expect(warnSpy).toHaveBeenCalledTimes(1);

        // Step 2: Database migration applied, scheduler resumes
        txMock.schedulerRun.upsert.mockResolvedValueOnce({
          id: 1,
          jobName: "maintenance-reminder",
          runDate: new Date(),
        });
        txMock.maintenanceOccurrence.findMany.mockResolvedValueOnce([]);
        txMock.user.findMany.mockResolvedValueOnce([]);
        prismaMock.$transaction.mockImplementation(async (callback) => callback(txMock));

        const successTick = await executeReminderJobTick();
        expect(successTick).toEqual({ executed: true });
        expect(logSpy).toHaveBeenCalledWith(
          expect.stringContaining("Database migration detected. Reminder job resumed successfully."),
        );

        warnSpy.mockRestore();
        logSpy.mockRestore();
      });

      it("propagates unexpected non-migration errors", async () => {
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        prismaMock.$transaction.mockRejectedValueOnce(new Error("Fatal pool error"));

        await expect(executeReminderJobTick()).rejects.toThrow("Fatal pool error");
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining("[ReminderScheduler] Unexpected failure during reminder job:"),
          expect.any(Error),
        );

        errorSpy.mockRestore();
      });
    });
  });
});
