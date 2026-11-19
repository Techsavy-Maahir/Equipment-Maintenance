import {
  Prisma,
  type MaintenanceFrequency,
  type MaintenanceOccurrenceStatus,
} from "../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundError } from "../errors.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import { prisma } from "../prisma.js";
import type {
  CompleteMaintenanceOccurrenceInput,
  CreateMaintenancePlanInput,
  MaintenanceOccurrenceListQuery,
  UpdateMaintenancePlanInput,
} from "../schemas/maintenance.schema.js";
import { createAuditLog } from "./audit.service.js";

const maintenancePlanInclude = {
  equipment: {
    select: {
      id: true,
      code: true,
      name: true,
      status: true,
      isDeactivated: true,
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
} as const satisfies Prisma.MaintenancePlanInclude;

export const maintenanceOccurrenceInclude = {
  maintenancePlan: {
    include: maintenancePlanInclude,
  },
  completedBy: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
  linkedWorkOrder: {
    select: {
      id: true,
      workOrderNumber: true,
      status: true,
    },
  },
} as const satisfies Prisma.MaintenanceOccurrenceInclude;

export function getOccurrenceDisplayStatus(
  occurrence: { dueDate: Date | string; status: MaintenanceOccurrenceStatus },
): "COMPLETED" | "CANCELLED" | "MISSED" | "OVERDUE" | "DUE" | "UPCOMING" {
  if (occurrence.status === "COMPLETED") return "COMPLETED";
  if (occurrence.status === "CANCELLED") return "CANCELLED";
  if (occurrence.status === "MISSED") return "MISSED";

  const due = new Date(occurrence.dueDate);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  if (due < startOfToday) {
    return "OVERDUE";
  }
  if (due <= endOfToday) {
    return "DUE";
  }
  return "UPCOMING";
}

function clampDayToMonth(year: number, monthIndex: number, day: number): number {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  return Math.min(day, lastDay);
}

function addMonths(date: Date, monthsToAdd: number): Date {
  const result = new Date(date);
  const monthIndex = result.getMonth() + monthsToAdd;
  const year = result.getFullYear() + Math.floor(monthIndex / 12);
  const normalizedMonth = ((monthIndex % 12) + 12) % 12;
  const safeDay = clampDayToMonth(year, normalizedMonth, result.getDate());

  return new Date(year, normalizedMonth, safeDay, result.getHours(), result.getMinutes(), result.getSeconds(), result.getMilliseconds());
}

export function getNextDueDate(
  fromDate: Date,
  frequency: MaintenanceFrequency,
): Date {
  const base = new Date(fromDate);

  switch (frequency) {
    case "DAILY":
      return new Date(base.getTime() + 24 * 60 * 60 * 1000);
    case "WEEKLY":
      return new Date(base.getTime() + 7 * 24 * 60 * 60 * 1000);
    case "MONTHLY":
      return addMonths(base, 1);
    case "QUARTERLY":
      return addMonths(base, 3);
    case "HALF_YEARLY":
      return addMonths(base, 6);
    case "YEARLY":
      return addMonths(base, 12);
    default:
      return new Date(base.getTime());
  }
}

export async function listMaintenancePlans(
  filters?: { equipmentId?: number; isActive?: boolean },
) {
  return prisma.maintenancePlan.findMany({
    where: {
      ...(filters?.equipmentId !== undefined ? { equipmentId: filters.equipmentId } : {}),
      ...(filters?.isActive !== undefined ? { isActive: filters.isActive } : {}),
    },
    orderBy: [{ nextDueDate: "asc" }, { id: "asc" }],
    include: maintenancePlanInclude,
  });
}

export async function getMaintenancePlan(id: number) {
  const plan = await prisma.maintenancePlan.findUnique({
    where: { id },
    include: maintenancePlanInclude,
  });

  if (!plan) {
    throw new NotFoundError("Maintenance plan not found");
  }

  return plan;
}

export async function listMaintenancePlansForEquipment(equipmentId: number) {
  return listMaintenancePlans({ equipmentId });
}

export async function listMaintenanceOccurrences(query?: MaintenanceOccurrenceListQuery) {
  const planId = query?.planId ?? query?.maintenancePlanId;
  const page = query?.page ?? 1;
  const pageSize = query?.pageSize ?? 10;
  const skip = (page - 1) * pageSize;

  const where: Prisma.MaintenanceOccurrenceWhereInput = {
    ...(planId !== undefined ? { maintenancePlanId: planId } : {}),
    ...(query?.status ? { status: query.status } : {}),
    ...(query?.equipmentId !== undefined
      ? { maintenancePlan: { equipmentId: query.equipmentId } }
      : {}),
  };

  const [total, rawItems] = await Promise.all([
    prisma.maintenanceOccurrence.count({ where }),
    prisma.maintenanceOccurrence.findMany({
      where,
      orderBy: [{ dueDate: "asc" }, { id: "asc" }],
      skip,
      take: pageSize,
      include: maintenanceOccurrenceInclude,
    }),
  ]);

  const items = rawItems.map((item) => ({
    ...item,
    displayStatus: getOccurrenceDisplayStatus(item),
  }));

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function listOccurrencesForPlan(planId: number) {
  const plan = await prisma.maintenancePlan.findUnique({
    where: { id: planId },
    select: { id: true },
  });

  if (!plan) {
    throw new NotFoundError("Maintenance plan not found");
  }

  const rawItems = await prisma.maintenanceOccurrence.findMany({
    where: { maintenancePlanId: planId },
    orderBy: [{ dueDate: "desc" }, { id: "desc" }],
    include: maintenanceOccurrenceInclude,
  });

  return rawItems.map((item) => ({
    ...item,
    displayStatus: getOccurrenceDisplayStatus(item),
  }));
}

export async function getMaintenanceOccurrence(id: number) {
  const occurrence = await prisma.maintenanceOccurrence.findUnique({
    where: { id },
    include: maintenanceOccurrenceInclude,
  });

  if (!occurrence) {
    throw new NotFoundError("Maintenance occurrence not found");
  }

  return {
    ...occurrence,
    displayStatus: getOccurrenceDisplayStatus(occurrence),
  };
}

export async function createMaintenancePlan(
  input: CreateMaintenancePlanInput,
  actor: AuthenticatedUser,
) {
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "MANAGER")) {
    throw new AppError(403, "Only administrators and managers can manage maintenance plans");
  }

  const equipment = await prisma.equipment.findUnique({
    where: { id: input.equipmentId },
    select: { id: true, isDeactivated: true, status: true },
  });

  if (!equipment || equipment.isDeactivated) {
    throw new NotFoundError("Equipment not found or inactive");
  }

  if (input.assignedTechnicianId) {
    const technician = await prisma.user.findUnique({
      where: { id: input.assignedTechnicianId },
      select: { id: true, role: true, isActive: true },
    });

    if (!technician || technician.role !== "TECHNICIAN" || !technician.isActive) {
      throw new NotFoundError("Active technician not found");
    }
  }

  const baseDueDate = input.nextDueDate ? new Date(input.nextDueDate) : new Date();

  const plan = await prisma.maintenancePlan.create({
    data: {
      equipmentId: input.equipmentId,
      activity: input.activity,
      instructions: input.instructions || null,
      frequency: input.frequency,
      assignedTechnicianId: input.assignedTechnicianId ?? null,
      lastCompletedAt: input.lastCompletedAt ?? null,
      nextDueDate: baseDueDate,
      isActive: input.isActive ?? true,
    },
    include: maintenancePlanInclude,
  });

  return plan;
}

export async function updateMaintenancePlan(
  id: number,
  input: UpdateMaintenancePlanInput,
  actor: AuthenticatedUser,
) {
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "MANAGER")) {
    throw new AppError(403, "Only administrators and managers can manage maintenance plans");
  }

  const existing = await prisma.maintenancePlan.findUnique({
    where: { id },
    select: {
      id: true,
      equipmentId: true,
      assignedTechnicianId: true,
      frequency: true,
      nextDueDate: true,
      equipment: { select: { id: true, isDeactivated: true } },
    },
  });

  if (!existing) {
    throw new NotFoundError("Maintenance plan not found");
  }

  if (existing.equipment.isDeactivated) {
    throw new ConflictError("The equipment for this maintenance plan is deactivated");
  }

  if (input.assignedTechnicianId !== undefined && input.assignedTechnicianId !== null) {
    const technician = await prisma.user.findUnique({
      where: { id: input.assignedTechnicianId },
      select: { id: true, role: true, isActive: true },
    });

    if (!technician || technician.role !== "TECHNICIAN" || !technician.isActive) {
      throw new NotFoundError("Active technician not found");
    }
  }

  const plan = await prisma.maintenancePlan.update({
    where: { id },
    data: {
      ...(input.activity !== undefined ? { activity: input.activity } : {}),
      ...(input.instructions !== undefined ? { instructions: input.instructions || null } : {}),
      ...(input.frequency !== undefined ? { frequency: input.frequency } : {}),
      ...(input.assignedTechnicianId !== undefined ? { assignedTechnicianId: input.assignedTechnicianId ?? null } : {}),
      ...(input.lastCompletedAt !== undefined ? { lastCompletedAt: input.lastCompletedAt ?? null } : {}),
      ...(input.nextDueDate !== undefined ? { nextDueDate: new Date(input.nextDueDate) } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    },
    include: maintenancePlanInclude,
  });

  return plan;
}

export async function generateOccurrenceForPlan(planId: number) {
  return prisma.$transaction(async (tx) => {
    const plan = await tx.maintenancePlan.findUnique({
      where: { id: planId },
      select: {
        id: true,
        isActive: true,
        frequency: true,
        nextDueDate: true,
        equipment: { select: { id: true, isDeactivated: true } },
      },
    });

    if (!plan) {
      throw new NotFoundError("Maintenance plan not found");
    }

    if (!plan.isActive) {
      throw new ConflictError("Maintenance plan is inactive");
    }

    if (plan.equipment.isDeactivated) {
      throw new ConflictError("Equipment for this plan is inactive");
    }

    const dueDate = new Date(plan.nextDueDate);
    const existing = await tx.maintenanceOccurrence.findUnique({
      where: {
        maintenancePlanId_dueDate: {
          maintenancePlanId: planId,
          dueDate,
        },
      },
    });

    if (existing) {
      return {
        created: false,
        occurrence: existing,
        plan,
      };
    }

    const occurrence = await tx.maintenanceOccurrence.create({
      data: {
        maintenancePlanId: planId,
        dueDate,
        status: "PENDING" as MaintenanceOccurrenceStatus,
      },
    });

    const updatedPlan = await tx.maintenancePlan.update({
      where: { id: planId },
      data: {
        nextDueDate: getNextDueDate(dueDate, plan.frequency),
      },
      include: maintenancePlanInclude,
    });

    return {
      created: true,
      occurrence,
      plan: updatedPlan,
    };
  });
}

export async function completeMaintenanceOccurrence(
  occurrenceId: number,
  input: {
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
  },
  actor: AuthenticatedUser,
) {
  if (!actor || (actor.role !== "TECHNICIAN" && actor.role !== "ADMIN" && actor.role !== "MANAGER")) {
    throw new AppError(403, "Only technicians, managers, and administrators can complete maintenance occurrences");
  }

  return prisma.$transaction(async (tx) => {
    const occurrence = await tx.maintenanceOccurrence.findUnique({
      where: { id: occurrenceId },
      include: {
        maintenancePlan: {
          select: {
            id: true,
            frequency: true,
            nextDueDate: true,
            assignedTechnicianId: true,
            equipment: {
              select: {
                id: true,
                isDeactivated: true,
              },
            },
          },
        },
      },
    });

    if (!occurrence) {
      throw new NotFoundError("Maintenance occurrence not found");
    }

    if (
      actor.role === "TECHNICIAN" &&
      occurrence.maintenancePlan.assignedTechnicianId !== null &&
      occurrence.maintenancePlan.assignedTechnicianId !== actor.id
    ) {
      throw new AppError(403, "You can only complete occurrences assigned to you");
    }

    if (occurrence.status === "COMPLETED" || occurrence.status === "CANCELLED") {
      throw new ConflictError("This maintenance occurrence has already been completed or cancelled");
    }

    if (occurrence.maintenancePlan.equipment.isDeactivated) {
      throw new ConflictError("The plan equipment is inactive");
    }

    const completedAt = input.completedAt ? new Date(input.completedAt) : new Date();
    const workPerformed = input.workPerformed?.trim() || null;
    const remarks = input.remarks?.trim() || null;

    const updatedOccurrence = await tx.maintenanceOccurrence.update({
      where: { id: occurrenceId },
      data: {
        status: "COMPLETED",
        completedAt,
        completedById: actor.id,
        workPerformed,
        remarks,
      },
      include: {
        maintenancePlan: {
          include: maintenancePlanInclude,
        },
      },
    });

    const nextDueDate = getNextDueDate(completedAt, occurrence.maintenancePlan.frequency);
    const planUpdate = await tx.maintenancePlan.update({
      where: { id: occurrence.maintenancePlanId },
      data: {
        lastCompletedAt: completedAt,
        nextDueDate,
      },
      include: maintenancePlanInclude,
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
          status: "PENDING" as MaintenanceOccurrenceStatus,
        },
      });
    }

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "MAINTENANCE_OCCURRENCE_COMPLETED",
      entityType: "MaintenanceOccurrence",
      entityId: occurrenceId,
      summary: `Maintenance occurrence #${occurrenceId} completed`,
    });

    return {
      occurrence: {
        ...updatedOccurrence,
        displayStatus: getOccurrenceDisplayStatus(updatedOccurrence),
      },
      plan: planUpdate,
      createdNextOccurrence: !existingNext,
    };
  });
}

export async function generateDueOccurrencesForActivePlans() {
  const plans = await prisma.maintenancePlan.findMany({
    where: {
      isActive: true,
      equipment: { isDeactivated: false },
    },
    select: { id: true },
  });

  const results = await Promise.allSettled(
    plans.map((plan) => generateOccurrenceForPlan(plan.id)),
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : [],
  );
}
