
import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, transactionMocks } = vi.hoisted(() => {
  const maintenanceRequest = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    updateMany: vi.fn(),
  };

  const equipment = {
    findUnique: vi.fn(),
    update: vi.fn(),
  };

  const decisionHistory = { create: vi.fn() };
  const auditLog = { create: vi.fn() };
  const workOrder = { create: vi.fn() };
const workOrderNumberCounter = { upsert: vi.fn() };

  return {
    prismaMock: {
      $transaction: vi.fn(),
      maintenanceRequest,
      equipment,
      decisionHistory,
      auditLog,
      workOrder,
workOrderNumberCounter,
    },
    transactionMocks: {
      maintenanceRequest,
      equipment,
      decisionHistory,
      auditLog,
      workOrder,
workOrderNumberCounter,
    },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import {
  createMaintenanceRequest,
  getMaintenanceRequest,
  listMaintenanceRequests,
  transitionMaintenanceRequest,
} from "../src/services/request.service.js";

const request = (status = "SUBMITTED", requesterId = 2) => ({
  id: 44,
  requestType: "BREAKDOWN",
  status,
  equipmentId: 7,
  requesterId,
  description: "Pump is vibrating",
  criticality: "HIGH",
  reviewerId: null,
  decisionReason: null,
  problem: null,
  proposedSolution: null,
  expectedBenefit: null,
  outcome: null,
  implementationStatus: null,
  createdAt: new Date("2026-11-09T10:00:00.000Z"),
  updatedAt: new Date("2026-11-09T10:00:00.000Z"),
});

const actor = (role: "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER", id = 1) => ({
  id,
  email: `${role.toLowerCase()}@example.com`,
  name: role,
  role,
  isActive: true,
});

const transactionClient = {
  maintenanceRequest: transactionMocks.maintenanceRequest,
  equipment: transactionMocks.equipment,
  decisionHistory: transactionMocks.decisionHistory,
  auditLog: transactionMocks.auditLog,
  workOrder: transactionMocks.workOrder,
workOrderNumberCounter: transactionMocks.workOrderNumberCounter,
};

const allowedTransitions = [
  { previous: "SUBMITTED", next: "UNDER_REVIEW", role: "MANAGER", actorId: 3 },
  { previous: "UNDER_REVIEW", next: "APPROVED", role: "ADMIN", actorId: 1 },
  {
    previous: "UNDER_REVIEW",
    next: "REJECTED",
    role: "MANAGER",
    actorId: 3,
    comment: "Not required",
  },
  { previous: "APPROVED", next: "IN_PROGRESS", role: "TECHNICIAN", actorId: 4 },
  { previous: "IN_PROGRESS", next: "COMPLETED", role: "TECHNICIAN", actorId: 4 },
  {
    previous: "SUBMITTED",
    next: "CANCELLED",
    role: "VIEWER",
    actorId: 2,
    comment: "No longer needed",
  },
  {
    previous: "UNDER_REVIEW",
    next: "CANCELLED",
    role: "MANAGER",
    actorId: 3,
    comment: "Withdrawn",
  },
  {
    previous: "APPROVED",
    next: "CANCELLED",
    role: "ADMIN",
    actorId: 1,
    comment: "Project stopped",
  },
  {
    previous: "IN_PROGRESS",
    next: "CANCELLED",
    role: "MANAGER",
    actorId: 3,
    comment: "Work stopped",
  },
] as const;

const statusValues = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

const allowedPairs = new Set(
  allowedTransitions.map(({ previous, next }) => `${previous}:${next}`),
);

const unapprovedTransitions = statusValues.flatMap((previous) =>
  statusValues
    .filter((next) => !allowedPairs.has(`${previous}:${next}`))
    .map((next) => ({ previous, next })),
);

beforeEach(() => {
  vi.clearAllMocks();

  prismaMock.$transaction.mockImplementation(async (callback) =>
    callback(transactionClient),
  );

  transactionMocks.equipment.findUnique.mockResolvedValue({
    id: 7,
    isDeactivated: false,
    status: "ACTIVE",
  });

  transactionMocks.equipment.update.mockResolvedValue({});
  transactionMocks.auditLog.create.mockResolvedValue({});
  transactionMocks.workOrderNumberCounter.upsert.mockResolvedValue({
  year: new Date().getFullYear(),
  lastNumber: 1,
});

transactionMocks.workOrder.create.mockResolvedValue({});
});

describe("maintenance request service", () => {
  it("creates a request for the authenticated requester with SUBMITTED status", async () => {
    transactionMocks.maintenanceRequest.create.mockImplementation(
      async ({ data }) => ({ ...request(), ...data }),
    );

    const result = await createMaintenanceRequest(
      {
        requestType: "BREAKDOWN",
        equipmentId: 7,
        description: "Pump is vibrating",
        criticality: "HIGH",
        problem: "Excessive vibration",
      },
      actor("VIEWER", 2),
    );

    expect(result.status).toBe("SUBMITTED");
    expect(transactionMocks.maintenanceRequest.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "SUBMITTED",
          requesterId: 2,
          reviewerId: null,
          problem: "Excessive vibration",
        }),
      }),
    );

    expect(transactionMocks.decisionHistory.create).not.toHaveBeenCalled();
  });

  it("rejects requests for missing or deactivated equipment", async () => {
    transactionMocks.equipment.findUnique.mockResolvedValue(null);

    await expect(
      createMaintenanceRequest(
        {
          requestType: "BREAKDOWN",
          equipmentId: 999,
          description: "Pump issue",
          criticality: "HIGH",
        },
        actor("VIEWER", 2),
      ),
    ).rejects.toMatchObject({ statusCode: 404 });

    transactionMocks.equipment.findUnique.mockResolvedValue({
      id: 7,
      isDeactivated: true,
      status: "ACTIVE",
    });

    await expect(
      createMaintenanceRequest(
        {
          requestType: "BREAKDOWN",
          equipmentId: 7,
          description: "Pump issue",
          criticality: "HIGH",
        },
        actor("VIEWER", 2),
      ),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("lists only requests visible to the requesting user and applies filters", async () => {
    transactionMocks.maintenanceRequest.count.mockResolvedValue(10);
    transactionMocks.maintenanceRequest.findMany.mockResolvedValue([request()]);

    const result = await listMaintenanceRequests(
      {
        status: "SUBMITTED",
        requestType: "BREAKDOWN",
        equipmentId: 7,
        page: 2,
        pageSize: 8,
      },
      actor("VIEWER", 2),
    );

    expect(result).toMatchObject({ total: 10, page: 2, pageSize: 8 });

    const args = transactionMocks.maintenanceRequest.findMany.mock.calls[0][0];

    expect(args.where).toEqual({
      requesterId: 2,
      status: "SUBMITTED",
      requestType: "BREAKDOWN",
      equipmentId: 7,
    });

    expect(args).toEqual(expect.objectContaining({ skip: 8, take: 8 }));
  });

  it("allows administrators and managers to retrieve all requests", async () => {
    transactionMocks.maintenanceRequest.count.mockResolvedValue(0);
    transactionMocks.maintenanceRequest.findMany.mockResolvedValue([]);

    await listMaintenanceRequests(
      { page: 1, pageSize: 10 },
      actor("MANAGER"),
    );

    expect(transactionMocks.maintenanceRequest.count).toHaveBeenCalledWith({
      where: {},
    });
  });

  it("limits technician retrieval to owned and actionable work requests", async () => {
    transactionMocks.maintenanceRequest.count.mockResolvedValue(0);
    transactionMocks.maintenanceRequest.findMany.mockResolvedValue([]);

    await listMaintenanceRequests(
      { page: 1, pageSize: 10 },
      actor("TECHNICIAN", 4),
    );

    expect(transactionMocks.maintenanceRequest.count).toHaveBeenCalledWith({
      where: {
        OR: [
          { requesterId: 4 },
          { status: { in: ["APPROVED", "IN_PROGRESS"] } },
        ],
      },
    });
  });

  it("does not expose completed requests to unrelated technicians", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
      request("COMPLETED", 2),
    );

    await expect(
      getMaintenanceRequest(44, actor("TECHNICIAN", 4)),
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it("allows requesters to retrieve their own request and denies unrelated users", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(request());

    await expect(
      getMaintenanceRequest(44, actor("VIEWER", 2)),
    ).resolves.toMatchObject({ id: 44 });

    await expect(
      getMaintenanceRequest(44, actor("VIEWER", 9)),
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it("returns not found when retrieving a missing request", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(null);

    await expect(
      getMaintenanceRequest(999, actor("ADMIN")),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it.each(allowedTransitions)(
    "allows $previous to $next for the approved role and records history",
    async ({ previous, next, role, actorId, comment }) => {
      const current = request(previous, 2);

      transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
      transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
      transactionMocks.decisionHistory.create.mockResolvedValue({});
      transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
        ...current,
        status: next,
      });

      const result = await transitionMaintenanceRequest(
        44,
        actor(role, actorId),
        { status: next, comment },
      );

      expect(result.status).toBe(next);

      expect(transactionMocks.maintenanceRequest.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 44, status: previous },
          data: expect.objectContaining({ status: next }),
        }),
      );

      expect(transactionMocks.decisionHistory.create).toHaveBeenCalledWith({
        data: {
          requestId: 44,
          previousStatus: previous,
          newStatus: next,
          actorId,
          comment: comment ?? null,
        },
      });
    },
  );

  it.each(unapprovedTransitions)(
    "rejects unapproved transition $previous to $next",
    async ({ previous, next }) => {
      transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
        request(previous),
      );

      await expect(
        transitionMaintenanceRequest(44, actor("ADMIN"), {
          status: next,
          comment:
            next === "REJECTED" || next === "CANCELLED" ? "Reason" : undefined,
        }),
      ).rejects.toMatchObject({ statusCode: 400 });

      expect(transactionMocks.maintenanceRequest.updateMany).not.toHaveBeenCalled();
      expect(transactionMocks.decisionHistory.create).not.toHaveBeenCalled();
    },
  );

  it.each([
    { previous: "SUBMITTED", next: "UNDER_REVIEW", role: "TECHNICIAN" },
    { previous: "UNDER_REVIEW", next: "APPROVED", role: "TECHNICIAN" },
    {
      previous: "UNDER_REVIEW",
      next: "REJECTED",
      role: "TECHNICIAN",
      comment: "Reason",
    },
    { previous: "APPROVED", next: "IN_PROGRESS", role: "MANAGER" },
    { previous: "IN_PROGRESS", next: "COMPLETED", role: "MANAGER" },
    {
      previous: "APPROVED",
      next: "CANCELLED",
      role: "TECHNICIAN",
      comment: "Reason",
    },
    {
      previous: "SUBMITTED",
      next: "CANCELLED",
      role: "VIEWER",
      actorId: 9,
      comment: "Reason",
    },
  ] as const)(
    "denies $role from performing $previous to $next",
    async ({ previous, next, role, actorId, comment }) => {
      transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
        request(previous, 2),
      );

      await expect(
        transitionMaintenanceRequest(
          44,
          actor(role, actorId ?? 9),
          { status: next, comment },
        ),
      ).rejects.toMatchObject({ statusCode: 403 });

      expect(transactionMocks.maintenanceRequest.updateMany).not.toHaveBeenCalled();
    },
  );

  it.each([
    { status: "REJECTED", comment: "   ", message: "rejection" },
    { status: "CANCELLED", comment: "  \t ", message: "cancellation" },
  ] as const)(
    "requires a nonblank $message reason",
    async ({ status, comment }) => {
      await expect(
        transitionMaintenanceRequest(44, actor("MANAGER"), {
          status,
          comment,
        }),
      ).rejects.toMatchObject({
        statusCode: 400,
        details: {
          comment: expect.stringContaining(
            status === "REJECTED" ? "rejection" : "cancellation",
          ),
        },
      });

      expect(prismaMock.$transaction).not.toHaveBeenCalled();
    },
  );

  it("allows optional comments and stores completion outcome", async () => {
    const current = request("IN_PROGRESS");

    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
    transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
    transactionMocks.decisionHistory.create.mockResolvedValue({});
    transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
      ...current,
      status: "COMPLETED",
      outcome: "Pump restored",
    });

    await transitionMaintenanceRequest(44, actor("TECHNICIAN"), {
      status: "COMPLETED",
      outcome: "Pump restored",
    });

    expect(transactionMocks.maintenanceRequest.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "COMPLETED",
          outcome: "Pump restored",
        }),
      }),
    );

    expect(transactionMocks.decisionHistory.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ comment: null }),
    });
  });

  it("rejects an outcome on a transition that is not completing a request", async () => {
    await expect(
      transitionMaintenanceRequest(44, actor("MANAGER"), {
        status: "UNDER_REVIEW",
        outcome: "Not complete",
      }),
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("returns not found when transitioning a missing request", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(null);

    await expect(
      transitionMaintenanceRequest(999, actor("ADMIN"), {
        status: "UNDER_REVIEW",
      }),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("does not overwrite a concurrent transition", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
      request("SUBMITTED"),
    );

    transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      transitionMaintenanceRequest(44, actor("MANAGER"), {
        status: "UNDER_REVIEW",
      }),
    ).rejects.toMatchObject({ statusCode: 409 });

    expect(transactionMocks.decisionHistory.create).not.toHaveBeenCalled();
  });

  it("rolls back the status update when history creation fails", async () => {
    let storedStatus = "APPROVED";

    const transactionalClient = {
      ...transactionClient,
      maintenanceRequest: {
        ...transactionMocks.maintenanceRequest,
        findUnique: vi.fn(async () => request(storedStatus)),
        updateMany: vi.fn(async ({ where, data }) => {
          if (where.status !== storedStatus) return { count: 0 };
          storedStatus = data.status;
          return { count: 1 };
        }),
      },
    };

    prismaMock.$transaction.mockImplementation(async (callback) => {
      const beforeTransaction = storedStatus;

      try {
        return await callback(transactionalClient);
      } catch (error) {
        storedStatus = beforeTransaction;
        throw error;
      }
    });

    transactionalClient.maintenanceRequest.findUniqueOrThrow.mockResolvedValue(
      request("IN_PROGRESS"),
    );

    transactionalClient.decisionHistory.create.mockRejectedValue(
      new Error("History write failed"),
    );

    await expect(
      transitionMaintenanceRequest(44, actor("TECHNICIAN"), {
        status: "IN_PROGRESS",
      }),
    ).rejects.toThrow("History write failed");

    expect(storedStatus).toBe("APPROVED");
    expect(transactionalClient.maintenanceRequest.updateMany).toHaveBeenCalledOnce();
    expect(transactionalClient.decisionHistory.create).toHaveBeenCalledOnce();
  });
});


describe("Breakdown approval and audit logging", () => {
  it("changes equipment status to BREAKDOWN when a Breakdown request is approved", async () => {
    const current = request("UNDER_REVIEW");

    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
    transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
    transactionMocks.decisionHistory.create.mockResolvedValue({});
    transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
      ...current,
      status: "APPROVED",
    });

    await transitionMaintenanceRequest(44, actor("MANAGER"), {
      status: "APPROVED",
    });

    expect(transactionMocks.equipment.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 7 },
        select: {
          id: true,
          isDeactivated: true,
          status: true,
        },
      }),
    );

    expect(transactionMocks.equipment.update).toHaveBeenCalledWith({
      where: {
        id: 7,
        isDeactivated: false,
        status: "ACTIVE",
      },
      data: {
        status: "BREAKDOWN",
      },
    });
  });

  it("does not change equipment status for a Preventive request", async () => {
    const current = {
      ...request("UNDER_REVIEW"),
      requestType: "PREVENTIVE",
    };

    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
    transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
    transactionMocks.decisionHistory.create.mockResolvedValue({});
    transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
      ...current,
      status: "APPROVED",
    });

    await transitionMaintenanceRequest(44, actor("MANAGER"), {
      status: "APPROVED",
    });

    expect(transactionMocks.equipment.findUnique).not.toHaveBeenCalled();
    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
  });

  it("rejects Breakdown approval when equipment is not ACTIVE", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
      request("UNDER_REVIEW"),
    );

    transactionMocks.equipment.findUnique.mockResolvedValue({
      id: 7,
      isDeactivated: false,
      status: "UNDER_MAINTENANCE",
    });

    await expect(
      transitionMaintenanceRequest(44, actor("MANAGER"), {
        status: "APPROVED",
      }),
    ).rejects.toMatchObject({ statusCode: 409 });

    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
    expect(transactionMocks.maintenanceRequest.updateMany).not.toHaveBeenCalled();
  });

  it("rejects Breakdown approval when equipment is deactivated", async () => {
    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(
      request("UNDER_REVIEW"),
    );

    transactionMocks.equipment.findUnique.mockResolvedValue({
      id: 7,
      isDeactivated: true,
      status: "ACTIVE",
    });

    await expect(
      transitionMaintenanceRequest(44, actor("MANAGER"), {
        status: "APPROVED",
      }),
    ).rejects.toMatchObject({ statusCode: 409 });

    expect(transactionMocks.equipment.update).not.toHaveBeenCalled();
    expect(transactionMocks.maintenanceRequest.updateMany).not.toHaveBeenCalled();
  });

  it("writes an AuditLog entry for a successful status transition", async () => {
    const current = request("UNDER_REVIEW");

    transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
    transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
    transactionMocks.decisionHistory.create.mockResolvedValue({});
    transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
      ...current,
      status: "APPROVED",
    });

    await transitionMaintenanceRequest(44, actor("MANAGER", 1), {
      status: "APPROVED",
    });

    expect(transactionMocks.auditLog.create).toHaveBeenCalledWith({
      data: {
        actorId: 1,
        action: "MAINTENANCE_REQUEST_STATUS_CHANGED",
        entityType: "MaintenanceRequest",
        entityId: 44,
        summary:
          "Maintenance request #44 status changed from UNDER_REVIEW to APPROVED.",
      },
    });
  });
  it("creates a Work Order when a maintenance request is approved", async () => {
  const current = {
    ...request("UNDER_REVIEW"),
    requestType: "PREVENTIVE",
  };

  transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
  transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
  transactionMocks.decisionHistory.create.mockResolvedValue({});
  transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
    ...current,
    status: "APPROVED",
  });

  await transitionMaintenanceRequest(44, actor("MANAGER"), {
    status: "APPROVED",
  });

  const year = new Date().getFullYear();

  expect(transactionMocks.workOrderNumberCounter.upsert).toHaveBeenCalledWith({
    where: { year },
    create: { year, lastNumber: 1 },
    update: { lastNumber: { increment: 1 } },
  });

  expect(transactionMocks.workOrder.create).toHaveBeenCalledWith({
    data: {
      workOrderNumber: `WO-${year}-0001`,
      maintenanceRequestId: 44,
      equipmentId: 7,
      status: "OPEN",
    },
  });
});
it("does not create a Work Order when a request enters review or is rejected", async () => {
  const current = request("SUBMITTED");

  transactionMocks.maintenanceRequest.findUnique.mockResolvedValue(current);
  transactionMocks.maintenanceRequest.updateMany.mockResolvedValue({ count: 1 });
  transactionMocks.decisionHistory.create.mockResolvedValue({});
  transactionMocks.maintenanceRequest.findUniqueOrThrow.mockResolvedValue({
    ...current,
    status: "UNDER_REVIEW",
  });

  await transitionMaintenanceRequest(44, actor("MANAGER"), {
    status: "UNDER_REVIEW",
  });

  expect(transactionMocks.workOrderNumberCounter.upsert).not.toHaveBeenCalled();
  expect(transactionMocks.workOrder.create).not.toHaveBeenCalled();
});
});


