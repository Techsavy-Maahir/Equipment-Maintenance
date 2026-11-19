import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
  const workOrder = {
    findMany: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    updateMany: vi.fn(),
  };
  const maintenanceRequest = { findUnique: vi.fn() };
  const equipment = { findUnique: vi.fn(), updateMany: vi.fn() };
  const user = { findUnique: vi.fn() };
  const auditLog = { create: vi.fn() };

  return {
    prismaMock: {
      workOrder,
      maintenanceRequest,
      equipment,
      user,
      $transaction: vi.fn(),
      $queryRaw: vi.fn().mockResolvedValue([]),
    },
    txMock: { workOrder, maintenanceRequest, equipment, user, auditLog },
  };
});

vi.mock("../src/prisma.js", () => ({ prisma: prismaMock }));

import {
  assignWorkOrder,
  closeWorkOrder,
  completeWorkOrder,
  listWorkOrders,
  startWorkOrder,
} from "../src/services/work-order.service.js";

const actor = (role: "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER", id = 1) => ({
  id,
  email: `${role.toLowerCase()}@example.com`,
  name: role,
  role,
  isActive: true,
});

const openWorkOrder = {
  id: 10,
  workOrderNumber: "WO-2026-0001",
  status: "OPEN",
};

const assignedWorkOrder = {
  ...openWorkOrder,
  status: "ASSIGNED",
  assignedTechnicianId: 5,
};

const updatedWorkOrder = {
  ...assignedWorkOrder,
  status: "IN_PROGRESS",
};

beforeEach(() => {
  vi.clearAllMocks();

  prismaMock.$transaction.mockImplementation(async (arg: any) => {
    if (typeof arg === "function") return arg(txMock);
    return Promise.all(arg);
  });

  txMock.auditLog.create.mockResolvedValue({});
  txMock.workOrder.findUniqueOrThrow.mockResolvedValue(updatedWorkOrder);
  txMock.workOrder.updateMany.mockResolvedValue({ count: 1 });
  txMock.maintenanceRequest.findUnique.mockResolvedValue({
    id: 99,
    requestType: "GENERAL",
  });
  txMock.equipment.findUnique.mockResolvedValue({
    id: 7,
    status: "ACTIVE",
  });
  txMock.equipment.updateMany.mockResolvedValue({ count: 1 });
});

describe("Work Order service", () => {
  it("lists work orders for managers without selecting M7-only fields", async () => {
    prismaMock.workOrder.findMany.mockResolvedValue([openWorkOrder]);
    prismaMock.workOrder.count.mockResolvedValue(1);

    const result = await listWorkOrders(
      { page: 1, pageSize: 10 },
      actor("MANAGER"),
    );

    expect(result.items).toEqual([openWorkOrder]);
    expect(prismaMock.workOrder.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        select: expect.objectContaining({
          id: true,
          workOrderNumber: true,
          status: true,
        }),
      }),
    );
    expect(prismaMock.workOrder.findMany.mock.calls[0][0].select).not.toHaveProperty(
      "maintenanceOccurrenceId",
    );
  });

  it("restricts technicians to their own assignments", async () => {
    prismaMock.workOrder.findMany.mockResolvedValue([]);
    prismaMock.workOrder.count.mockResolvedValue(0);

    await listWorkOrders(
      { page: 1, pageSize: 10 },
      actor("TECHNICIAN", 5),
    );

    expect(prismaMock.workOrder.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ assignedTechnicianId: 5 }),
      }),
    );
  });

  it("rejects viewers from listing work orders", async () => {
    await expect(
      listWorkOrders({ page: 1, pageSize: 10 }, actor("VIEWER")),
    ).rejects.toMatchObject({ statusCode: 403 });
  });

  it("assigns an OPEN work order to an active technician", async () => {
    txMock.workOrder.findUnique.mockResolvedValue(openWorkOrder);
    txMock.user.findUnique.mockResolvedValue({
      id: 5,
      name: "Technician",
      role: "TECHNICIAN",
      isActive: true,
    });

    await assignWorkOrder(10, 5, actor("MANAGER", 3));

    expect(txMock.workOrder.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ id: 10, status: "OPEN" }),
        data: expect.objectContaining({
          assignedTechnicianId: 5,
          assignedById: 3,
          status: "ASSIGNED",
        }),
      }),
    );
    expect(txMock.auditLog.create).toHaveBeenCalled();
  });

  it("rejects assignment of a non-OPEN work order", async () => {
    txMock.workOrder.findUnique.mockResolvedValue(assignedWorkOrder);

    await expect(
      assignWorkOrder(10, 5, actor("MANAGER")),
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("prevents a technician from starting another technician's work order", async () => {
    txMock.workOrder.findUnique.mockResolvedValue(assignedWorkOrder);

    await expect(
      startWorkOrder(10, actor("TECHNICIAN", 8)),
    ).rejects.toMatchObject({ statusCode: 403 });

    expect(txMock.workOrder.updateMany).not.toHaveBeenCalled();
  });

  it("starts an assigned work order for its technician", async () => {
    txMock.workOrder.findUnique.mockResolvedValue(assignedWorkOrder);

    await startWorkOrder(10, actor("TECHNICIAN", 5));

    expect(txMock.workOrder.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 10,
          status: "ASSIGNED",
          assignedTechnicianId: 5,
        }),
        data: expect.objectContaining({ status: "IN_PROGRESS" }),
      }),
    );
    expect(txMock.auditLog.create).toHaveBeenCalled();
  });

  it("completes an IN_PROGRESS work order for its technician", async () => {
    txMock.workOrder.findUnique.mockResolvedValue({
      ...updatedWorkOrder,
      assignedTechnicianId: 5,
    });

    await completeWorkOrder(10, actor("TECHNICIAN", 5));

    expect(txMock.workOrder.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 10,
          status: "IN_PROGRESS",
          assignedTechnicianId: 5,
        }),
        data: expect.objectContaining({ status: "COMPLETED" }),
      }),
    );
    expect(txMock.auditLog.create).toHaveBeenCalled();
  });

  it("closes a completed work order for a manager and restores breakdown equipment", async () => {
    const completedWorkOrder = {
      id: 10,
      workOrderNumber: "WO-2026-0001",
      status: "COMPLETED",
      assignedTechnicianId: 5,
      equipmentId: 7,
      maintenanceRequestId: 99,
    };

    txMock.workOrder.findUnique.mockResolvedValue(completedWorkOrder);
    txMock.maintenanceRequest.findUnique.mockResolvedValue({
      id: 99,
      requestType: "BREAKDOWN",
    });
    txMock.equipment.findUnique.mockResolvedValue({
      id: 7,
      status: "BREAKDOWN",
    });
    txMock.equipment.updateMany.mockResolvedValue({ count: 1 });

    await closeWorkOrder(10, actor("MANAGER", 3));

    expect(txMock.equipment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ id: 7, status: "BREAKDOWN" }),
        data: expect.objectContaining({ status: "ACTIVE" }),
      }),
    );
    expect(txMock.workOrder.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ id: 10, status: "COMPLETED" }),
        data: expect.objectContaining({ status: "CLOSED" }),
      }),
    );
    expect(txMock.auditLog.create).toHaveBeenCalled();
  });

  it("blocks an assigned technician from closing a work order", async () => {
    txMock.workOrder.findUnique.mockResolvedValue({
      id: 10,
      workOrderNumber: "WO-2026-0001",
      status: "COMPLETED",
      assignedTechnicianId: 5,
      equipmentId: 7,
      maintenanceRequestId: 99,
    });
    txMock.maintenanceRequest.findUnique.mockResolvedValue({
      id: 99,
      requestType: "BREAKDOWN",
    });

    await expect(closeWorkOrder(10, actor("MANAGER", 5))).rejects.toMatchObject({
      statusCode: 403,
    });
  });
});
