import { beforeEach, describe, expect, it, vi } from "vitest";

// ── Mock Prisma ──────────────────────────────────────────────────────────────
const { prismaMock } = vi.hoisted(() => {
  return {
    prismaMock: {
      equipment: { count: vi.fn() },
      workOrder: { count: vi.fn(), findMany: vi.fn() },
      maintenanceOccurrence: { count: vi.fn(), findMany: vi.fn() },
      maintenanceRequest: { count: vi.fn() },
      equipmentLocationHistory: { count: vi.fn() },
    },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

// Mock notification service to export isPendingMigrationError
vi.mock("../src/services/notification.service.js", () => ({
  isPendingMigrationError: vi.fn().mockReturnValue(false),
}));

// Mock work-order service to export workOrderReadSelect
vi.mock("../src/services/work-order.service.js", () => ({
  workOrderReadSelect: { id: true, workOrderNumber: true, status: true, createdAt: true },
}));

import { getDashboardStats } from "../src/services/dashboard.service.js";

const ACTOR = { id: 1, role: "MANAGER" };

function makeOccurrence(overrides: object = {}) {
  const base = {
    id: 1,
    dueDate: new Date(),
    status: "PENDING",
    maintenancePlan: {
      activity: "Lubrication",
      equipment: { code: "EQ-001", name: "Press A" },
      assignedTechnician: null,
    },
  };
  return { ...base, ...overrides };
}

describe("getDashboardStats – overdue PM KPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: equipment counts
    prismaMock.equipment.count.mockResolvedValue(0);
    // Default: work order counts
    prismaMock.workOrder.count.mockResolvedValue(0);
    prismaMock.workOrder.findMany.mockResolvedValue([]);
    // Default: occurrence counts
    prismaMock.maintenanceOccurrence.count.mockResolvedValue(0);
    prismaMock.maintenanceOccurrence.findMany.mockResolvedValue([]);
    // Default: request/relocation counts
    prismaMock.maintenanceRequest.count.mockResolvedValue(0);
    prismaMock.equipmentLocationHistory.count.mockResolvedValue(0);
  });

  it("counts an overdue pending occurrence (past due date)", async () => {
    // Count call: first = equipment, second = overdue occurrences
    prismaMock.maintenanceOccurrence.count
      .mockResolvedValueOnce(1); // overdue count
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([makeOccurrence({ dueDate: new Date("2026-01-01") })]) // overdue list
      .mockResolvedValueOnce([]); // upcoming list

    const stats = await getDashboardStats(ACTOR);
    expect(stats.kpis.overduePm).toBe(1);

    // Verify the query passed the correct where clause checking active plan & active equipment
    expect(prismaMock.maintenanceOccurrence.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: { notIn: ["COMPLETED", "CANCELLED"] },
          maintenancePlan: {
            isActive: true,
            equipment: {
              isDeactivated: false,
            },
          },
        }),
      }),
    );
  });

  it("does not count a completed occurrence as overdue", async () => {
    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0); // already filtered by DB
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.kpis.overduePm).toBe(0);
  });

  it("does not count a cancelled occurrence as overdue", async () => {
    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.kpis.overduePm).toBe(0);
  });

  it("counts multiple overdue occurrences correctly", async () => {
    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(5);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([
        makeOccurrence({ id: 1, dueDate: new Date("2026-01-01") }),
        makeOccurrence({ id: 2, dueDate: new Date("2026-02-01") }),
        makeOccurrence({ id: 3, dueDate: new Date("2026-03-01") }),
      ])
      .mockResolvedValueOnce([]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.kpis.overduePm).toBe(5);
  });

  it("returns overduePm = 0 when no occurrences exist", async () => {
    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.kpis.overduePm).toBe(0);
  });
});

describe("getDashboardStats – upcoming PM list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prismaMock.equipment.count.mockResolvedValue(0);
    prismaMock.workOrder.count.mockResolvedValue(0);
    prismaMock.workOrder.findMany.mockResolvedValue([]);
    prismaMock.maintenanceOccurrence.count.mockResolvedValue(0);
    prismaMock.maintenanceOccurrence.findMany.mockResolvedValue([]);
    prismaMock.maintenanceRequest.count.mockResolvedValue(0);
    prismaMock.equipmentLocationHistory.count.mockResolvedValue(0);
  });

  it("includes overdue items tagged as Overdue in the PM list", async () => {
    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(1);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([
        makeOccurrence({ id: 10, dueDate: new Date("2025-01-01"), status: "PENDING" }),
      ])
      .mockResolvedValueOnce([]);

    const stats = await getDashboardStats(ACTOR);
    const overdue = stats.upcomingPm.find((p) => p.status === "Overdue");
    expect(overdue).toBeDefined();
    expect(overdue?.id).toBe(10);
  });

  it("includes upcoming items tagged as Scheduled", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        makeOccurrence({ id: 20, dueDate: tomorrow, status: "SCHEDULED" }),
      ]);

    const stats = await getDashboardStats(ACTOR);
    const scheduled = stats.upcomingPm.find((p) => p.status === "Scheduled");
    expect(scheduled).toBeDefined();
    expect(scheduled?.id).toBe(20);
  });

  it("tags an occurrence due today as 'Due today'", async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        makeOccurrence({ id: 30, dueDate: today, status: "PENDING" }),
      ]);

    const stats = await getDashboardStats(ACTOR);
    const dueToday = stats.upcomingPm.find((p) => p.status === "Due today");
    expect(dueToday).toBeDefined();
    expect(dueToday?.id).toBe(30);
  });

  it("includes assignedTechnicianName when technician is assigned to the plan", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          ...makeOccurrence({ id: 40, dueDate: tomorrow }),
          maintenancePlan: {
            activity: "Lubrication",
            equipment: { code: "EQ-001", name: "Press A" },
            assignedTechnician: { name: "Jane Smith" },
          },
        },
      ]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.upcomingPm[0]?.assignedTechnicianName).toBe("Jane Smith");
  });

  it("sets assignedTechnicianName to null when no technician assigned", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(0);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        makeOccurrence({ id: 50, dueDate: tomorrow }),
      ]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.upcomingPm[0]?.assignedTechnicianName).toBeNull();
  });

  it("sorts overdue items before upcoming items", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(1);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce([
        makeOccurrence({ id: 100, dueDate: new Date("2025-01-01") }), // overdue
      ])
      .mockResolvedValueOnce([
        makeOccurrence({ id: 200, dueDate: tomorrow }), // upcoming
      ]);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.upcomingPm[0].id).toBe(100); // overdue first
    expect(stats.upcomingPm[1].id).toBe(200); // then upcoming
  });

  it("caps the combined PM list at 7 items", async () => {
    const overdueItems = Array.from({ length: 3 }, (_, i) =>
      makeOccurrence({ id: i + 1, dueDate: new Date("2025-01-01") })
    );
    const upcomingItems = Array.from({ length: 5 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return makeOccurrence({ id: 100 + i, dueDate: d });
    });

    prismaMock.maintenanceOccurrence.count.mockResolvedValueOnce(3);
    prismaMock.maintenanceOccurrence.findMany
      .mockResolvedValueOnce(overdueItems)
      .mockResolvedValueOnce(upcomingItems);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.upcomingPm.length).toBeLessThanOrEqual(7);
  });

  it("returns empty upcomingPm when M6 is pending (P2021)", async () => {
    const { isPendingMigrationError } = await import("../src/services/notification.service.js");
    vi.mocked(isPendingMigrationError).mockReturnValue(true);

    const p2021 = new Error("Table does not exist");
    (p2021 as any).code = "P2021";
    prismaMock.maintenanceOccurrence.count.mockRejectedValue(p2021);

    const stats = await getDashboardStats(ACTOR);
    expect(stats.upcomingPm).toEqual([]);
    expect(stats.kpis.overduePm).toBe(0);

    vi.mocked(isPendingMigrationError).mockReturnValue(false);
  });
});
