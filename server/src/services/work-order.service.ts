import {
  Prisma,
  type Role,
  type WorkOrderStatus,
} from "../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundError } from "../errors.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { WorkOrderListQuery } from "../schemas/work-order.schema.js";
import { prisma } from "../prisma.js";
import { createAuditLog } from "./audit.service.js";
import { getNextDueDate } from "./maintenance.service.js";

export const workOrderScalarSelect = {
  id: true,
  workOrderNumber: true,
  maintenanceRequestId: true,
  equipmentId: true,
  status: true,
  assignedTechnicianId: true,
  assignedById: true,
  assignedAt: true,
  startedAt: true,
  completedAt: true,
  closedAt: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const workOrderReadSelect = {
  ...workOrderScalarSelect,
  equipment: {
    select: {
      id: true,
      code: true,
      name: true,
      status: true,
      criticality: true,
    },
  },
  maintenanceRequest: {
    select: {
      id: true,
      requestType: true,
      status: true,
      criticality: true,
      description: true,
      createdAt: true,
    },
  },
  assignedTechnician: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
  assignedBy: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
} as const;

export async function hasWorkOrderMaintenanceOccurrenceSupport(): Promise<boolean> {
  try {
    const rows = await prisma.$queryRaw<Array<{ exists: number }>>`
      SELECT 1 AS "exists"
      FROM information_schema.columns
      WHERE table_schema = current_schema()
        AND table_name = 'WorkOrder'
        AND column_name = 'maintenanceOccurrenceId'
      LIMIT 1;
    `;
    return rows.length > 0;
  } catch {
    return false;
  }
}

function isManagerOrAdmin(role: Role): boolean {
  return role === "ADMIN" || role === "MANAGER";
}

function assertManagerOrAdmin(role: Role): void {
  if (!isManagerOrAdmin(role)) {
    throw new AppError(403, "Only administrators and managers can assign work orders");
  }
}

function assertTechnician(role: Role): void {
  if (role !== "TECHNICIAN") {
    throw new AppError(403, "Only technicians can execute work orders");
  }
}

export async function listWorkOrders(
  query: WorkOrderListQuery,
  user: AuthenticatedUser,
) {
  if (
    !isManagerOrAdmin(user.role) &&
    user.role !== "TECHNICIAN"
  ) {
    throw new AppError(403, "You are not authorized to view work orders");
  }

  const where: Prisma.WorkOrderWhereInput = {
    ...(query.status ? { status: query.status } : {}),
    ...(query.equipmentId ? { equipmentId: query.equipmentId } : {}),
    ...(user.role === "TECHNICIAN"
      ? { assignedTechnicianId: user.id }
      : {}),
    ...(query.search
      ? {
          OR: [
            {
              workOrderNumber: {
                contains: query.search,
                mode: "insensitive",
              },
            },
            {
              equipment: {
                is: {
                  OR: [
                    {
                      code: {
                        contains: query.search,
                        mode: "insensitive",
                      },
                    },
                    {
                      name: {
                        contains: query.search,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            },
            {
              maintenanceRequest: {
                is: {
                  description: {
                    contains: query.search,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              assignedTechnician: {
                is: {
                  name: {
                    contains: query.search,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.workOrder.findMany({
      where,
      select: workOrderReadSelect,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    }),
    prisma.workOrder.count({ where }),
  ]);

  return {
    items,
    total,
    page: query.page,
    pageSize: query.pageSize,
  };
}

export async function assignWorkOrder(
  workOrderId: number,
  assignedTechnicianId: number,
  actor: AuthenticatedUser,
) {
  assertManagerOrAdmin(actor.role);

  return prisma.$transaction(async (tx) => {
    const workOrder = await tx.workOrder.findUnique({
      where: { id: workOrderId },
      select: {
        id: true,
        workOrderNumber: true,
        status: true,
      },
    });

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    if (workOrder.status !== "OPEN") {
      throw new ConflictError("Only OPEN work orders can be assigned");
    }

    const technician = await tx.user.findUnique({
      where: { id: assignedTechnicianId },
      select: {
        id: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (
      !technician ||
      technician.role !== "TECHNICIAN" ||
      !technician.isActive
    ) {
      throw new NotFoundError("Active technician not found");
    }

    const result = await tx.workOrder.updateMany({
      where: {
        id: workOrderId,
        status: "OPEN",
        assignedTechnicianId: null,
      },
      data: {
        assignedTechnicianId,
        assignedById: actor.id,
        assignedAt: new Date(),
        status: "ASSIGNED",
      },
    });

    if (result.count !== 1) {
      throw new ConflictError("Work order was changed by another operation");
    }

    const updated = await tx.workOrder.findUniqueOrThrow({
      where: { id: workOrderId },
      select: workOrderReadSelect,
    });

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "WORK_ORDER_ASSIGNED",
      entityType: "WORK_ORDER",
      entityId: workOrderId,
      summary: `${workOrder.workOrderNumber} assigned to ${technician.name}`,
    });

    return updated;
  });
}

export async function startWorkOrder(
  workOrderId: number,
  actor: AuthenticatedUser,
) {
  assertTechnician(actor.role);

  return prisma.$transaction(async (tx) => {
    const workOrder = await tx.workOrder.findUnique({
      where: { id: workOrderId },
      select: {
        id: true,
        workOrderNumber: true,
        status: true,
        assignedTechnicianId: true,
      },
    });

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    if (workOrder.assignedTechnicianId !== actor.id) {
      throw new AppError(403, "You can only start work orders assigned to you");
    }

    if (workOrder.status !== "ASSIGNED") {
      throw new ConflictError("Only ASSIGNED work orders can be started");
    }

    const result = await tx.workOrder.updateMany({
      where: {
        id: workOrderId,
        status: "ASSIGNED",
        assignedTechnicianId: actor.id,
      },
      data: {
        status: "IN_PROGRESS",
        startedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictError("Work order was changed by another operation");
    }

    const updated = await tx.workOrder.findUniqueOrThrow({
      where: { id: workOrderId },
      select: workOrderReadSelect,
    });

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "WORK_ORDER_STARTED",
      entityType: "WORK_ORDER",
      entityId: workOrderId,
      summary: `${workOrder.workOrderNumber} started`,
    });

    return updated;
  });
}

export async function completeWorkOrder(
  workOrderId: number,
  actor: AuthenticatedUser,
) {
  assertTechnician(actor.role);

  return prisma.$transaction(async (tx) => {
    const workOrder = await tx.workOrder.findUnique({
      where: { id: workOrderId },
      select: {
        id: true,
        workOrderNumber: true,
        status: true,
        assignedTechnicianId: true,
        maintenanceRequestId: true,
        ...(await hasWorkOrderMaintenanceOccurrenceSupport()
          ? { maintenanceOccurrenceId: true }
          : {}),
      },
    });

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    if (workOrder.assignedTechnicianId !== actor.id) {
      throw new AppError(403, "You can only complete work orders assigned to you");
    }

    if (workOrder.status !== "IN_PROGRESS") {
      throw new ConflictError("Only IN_PROGRESS work orders can be completed");
    }

    const completionDate = new Date();

    const result = await tx.workOrder.updateMany({
      where: {
        id: workOrderId,
        status: "IN_PROGRESS",
        assignedTechnicianId: actor.id,
      },
      data: {
        status: "COMPLETED",
        completedAt: completionDate,
      },
    });

    if (result.count !== 1) {
      throw new ConflictError("Work order was changed by another operation");
    }

    const supportsOccurrenceLink = await hasWorkOrderMaintenanceOccurrenceSupport();

    if (supportsOccurrenceLink && "maintenanceOccurrenceId" in workOrder && workOrder.maintenanceOccurrenceId) {
      const occurrence = await tx.maintenanceOccurrence.findUnique({
        where: { id: workOrder.maintenanceOccurrenceId },
        select: {
          id: true,
          dueDate: true,
          maintenancePlanId: true,
          maintenancePlan: {
            select: {
              id: true,
              frequency: true,
            },
          },
        },
      });

      if (occurrence) {
        const nextDueDate = getNextDueDate(completionDate, occurrence.maintenancePlan.frequency);

        await tx.maintenanceOccurrence.update({
          where: { id: occurrence.id },
          data: {
            status: "COMPLETED",
            completedAt: completionDate,
            completedById: actor.id,
            workPerformed: "Completed via work order",
            remarks: `Work order ${workOrder.workOrderNumber} completed`,
          },
        });

        await tx.maintenancePlan.update({
          where: { id: occurrence.maintenancePlanId },
          data: {
            lastCompletedAt: completionDate,
            nextDueDate,
          },
        });

        const existingNext = await tx.maintenanceOccurrence.findUnique({
          where: {
            maintenancePlanId_dueDate: {
              maintenancePlanId: occurrence.maintenancePlanId,
              dueDate: nextDueDate,
            },
          },
        });

        if (!existingNext) {
          await tx.maintenanceOccurrence.create({
            data: {
              maintenancePlanId: occurrence.maintenancePlanId,
              dueDate: nextDueDate,
              status: "PENDING",
            },
          });
        }
      }
    }

    const updated = await tx.workOrder.findUniqueOrThrow({
      where: { id: workOrderId },
      select: workOrderReadSelect,
    });

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "WORK_ORDER_COMPLETED",
      entityType: "WORK_ORDER",
      entityId: workOrderId,
      summary: `${workOrder.workOrderNumber} completed`,
    });

    return updated;
  });
}

export async function closeWorkOrder(
  workOrderId: number,
  actor: AuthenticatedUser,
) {
  if (!isManagerOrAdmin(actor.role)) {
    throw new AppError(403, "Only administrators and managers can close work orders");
  }

  return prisma.$transaction(async (tx) => {
    const workOrder = await tx.workOrder.findUnique({
      where: { id: workOrderId },
      select: {
        id: true,
        workOrderNumber: true,
        status: true,
        assignedTechnicianId: true,
        equipmentId: true,
        maintenanceRequestId: true,
      },
    });

    if (!workOrder) {
      throw new NotFoundError("Work order not found");
    }

    if (workOrder.assignedTechnicianId === actor.id) {
      throw new AppError(403, "Assigned technicians cannot close their own work orders");
    }

    if (workOrder.status !== "COMPLETED") {
      throw new ConflictError("Only COMPLETED work orders can be closed");
    }

    const request = await tx.maintenanceRequest.findUnique({
      where: { id: workOrder.maintenanceRequestId },
      select: {
        id: true,
        requestType: true,
      },
    });

    if (!request) {
      throw new NotFoundError("Maintenance request not found");
    }

    if (request.requestType === "BREAKDOWN") {
      const equipment = await tx.equipment.findUnique({
        where: { id: workOrder.equipmentId },
        select: { id: true, status: true },
      });

      if (!equipment) {
        throw new NotFoundError("Equipment not found");
      }

      if (equipment.status === "BREAKDOWN") {
        const equipmentUpdate = await tx.equipment.updateMany({
          where: {
            id: workOrder.equipmentId,
            status: "BREAKDOWN",
          },
          data: {
            status: "ACTIVE",
          },
        });

        if (equipmentUpdate.count !== 1) {
          throw new ConflictError("Equipment status changed before closure was recorded");
        }
      }
    }

    const result = await tx.workOrder.updateMany({
      where: {
        id: workOrderId,
        status: "COMPLETED",
      },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictError("Work order was changed by another operation");
    }

    const updated = await tx.workOrder.findUniqueOrThrow({
      where: { id: workOrderId },
      select: workOrderReadSelect,
    });

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "WORK_ORDER_CLOSED",
      entityType: "WORK_ORDER",
      entityId: workOrderId,
      summary: `${workOrder.workOrderNumber} closed`,
    });

    return updated;
  });
}
