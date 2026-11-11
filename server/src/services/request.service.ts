
import {
  Prisma,
  type MaintenanceRequestStatus,
  type Role,
} from "../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundError, ValidationError } from "../errors.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import { prisma } from "../prisma.js";
import { createAuditLog } from "./audit.service.js";
import type {
  CreateMaintenanceRequestInput,
  MaintenanceRequestListQuery,
  TransitionMaintenanceRequestInput,
} from "../schemas/request.schema.js";

const requestInclude = {
  equipment: {
    select: { id: true, code: true, name: true, isDeactivated: true },
  },
  requester: {
    select: { id: true, name: true, email: true, role: true },
  },
  reviewer: {
    select: { id: true, name: true, email: true, role: true },
  },
} as const satisfies Prisma.MaintenanceRequestInclude;

const requestDetailInclude = {
  ...requestInclude,
  decisionHistory: {
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: {
      actor: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
  },
} as const satisfies Prisma.MaintenanceRequestInclude;

const allowedTransitions: Record<
  MaintenanceRequestStatus,
  readonly MaintenanceRequestStatus[]
> = {
  SUBMITTED: ["UNDER_REVIEW", "CANCELLED"],
  UNDER_REVIEW: ["APPROVED", "REJECTED", "CANCELLED"],
  APPROVED: ["IN_PROGRESS", "CANCELLED"],
  REJECTED: [],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

const technicianVisibleStatuses: MaintenanceRequestStatus[] = [
  "APPROVED",
  "IN_PROGRESS",
];

function isManagerOrAdmin(role: Role) {
  return role === "ADMIN" || role === "MANAGER";
}

function canReadRequest(
  request: { requesterId: number; status: MaintenanceRequestStatus },
  actor: AuthenticatedUser,
) {
  return (
    isManagerOrAdmin(actor.role) ||
    request.requesterId === actor.id ||
    (actor.role === "TECHNICIAN" &&
      technicianVisibleStatuses.includes(request.status))
  );
}

function canPerformTransition(
  request: { requesterId: number; status: MaintenanceRequestStatus },
  nextStatus: MaintenanceRequestStatus,
  actor: AuthenticatedUser,
) {
  if (
    (nextStatus === "UNDER_REVIEW" ||
      nextStatus === "APPROVED" ||
      nextStatus === "REJECTED") &&
    isManagerOrAdmin(actor.role)
  ) {
    return true;
  }

  if (
    (nextStatus === "IN_PROGRESS" || nextStatus === "COMPLETED") &&
    actor.role === "TECHNICIAN"
  ) {
    return true;
  }

  if (nextStatus === "CANCELLED") {
    if (
      (request.status === "SUBMITTED" ||
        request.status === "UNDER_REVIEW") &&
      (isManagerOrAdmin(actor.role) || request.requesterId === actor.id)
    ) {
      return true;
    }

    return (
      (request.status === "APPROVED" ||
        request.status === "IN_PROGRESS") &&
      isManagerOrAdmin(actor.role)
    );
  }

  return false;
}

function requestVisibilityWhere(
  actor: AuthenticatedUser,
): Prisma.MaintenanceRequestWhereInput {
  if (isManagerOrAdmin(actor.role)) {
    return {};
  }

  if (actor.role === "TECHNICIAN") {
    return {
      OR: [
        { requesterId: actor.id },
        { status: { in: technicianVisibleStatuses } },
      ],
    };
  }

  return { requesterId: actor.id };
}

export async function createMaintenanceRequest(
  input: CreateMaintenanceRequestInput,
  requester: AuthenticatedUser,
) {
  return prisma.$transaction(async (tx) => {
    const equipment = await tx.equipment.findUnique({
      where: { id: input.equipmentId },
      select: { id: true, isDeactivated: true },
    });

    if (!equipment || equipment.isDeactivated) {
      throw new NotFoundError("Active equipment not found");
    }

    return tx.maintenanceRequest.create({
      data: {
        ...input,
        status: "SUBMITTED",
        requesterId: requester.id,
        reviewerId: null,
        decisionReason: null,
      },
      include: requestInclude,
    });
  });
}

export async function listMaintenanceRequests(
  query: MaintenanceRequestListQuery,
  actor: AuthenticatedUser,
) {
  const where: Prisma.MaintenanceRequestWhereInput = {
    ...requestVisibilityWhere(actor),
    ...(query.status ? { status: query.status } : {}),
    ...(query.requestType ? { requestType: query.requestType } : {}),
    ...(query.equipmentId ? { equipmentId: query.equipmentId } : {}),
  };

  return prisma.$transaction(async (tx) => {
    const total = await tx.maintenanceRequest.count({ where });
    const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
    const page = Math.min(query.page, pageCount);
    const items = await tx.maintenanceRequest.findMany({
      where,
      include: requestInclude,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip: (page - 1) * query.pageSize,
      take: query.pageSize,
    });

    return { items, total, page, pageSize: query.pageSize };
  });
}

export async function getMaintenanceRequest(
  requestId: number,
  actor: AuthenticatedUser,
) {
  const request = await prisma.maintenanceRequest.findUnique({
    where: { id: requestId },
    include: requestDetailInclude,
  });

  if (!request) {
    throw new NotFoundError("Maintenance request not found");
  }

  if (!canReadRequest(request, actor)) {
    throw new AppError(403, "Forbidden: You cannot access this maintenance request");
  }

  return request;
}

export async function transitionMaintenanceRequest(
  requestId: number,
  actor: AuthenticatedUser,
  input: TransitionMaintenanceRequestInput,
) {
  const comment = input.comment?.trim() || null;
  const outcome = input.outcome?.trim() || null;

  if (input.status === "REJECTED" && !comment) {
    throw new ValidationError({ comment: "A rejection reason is required" });
  }

  if (input.status === "CANCELLED" && !comment) {
    throw new ValidationError({ comment: "A cancellation reason is required" });
  }

  if (input.status !== "COMPLETED" && outcome) {
    throw new ValidationError({
      outcome: "An outcome can only be recorded when completing a request",
    });
  }

  return prisma.$transaction(async (tx) => {
    const current = await tx.maintenanceRequest.findUnique({
      where: { id: requestId },
    });

    if (!current) {
      throw new NotFoundError("Maintenance request not found");
    }

    if (!allowedTransitions[current.status].includes(input.status)) {
      throw new ValidationError({
        status: `Transition from ${current.status} to ${input.status} is not allowed`,
      });
    }

    if (!canPerformTransition(current, input.status, actor)) {
      throw new AppError(403, "Forbidden: You cannot perform this request transition");
    }

    // A Breakdown request can only be approved if its equipment is
    // still active and has not already been assigned another status.
    const isBreakdownApproval =
      current.requestType === "BREAKDOWN" &&
      current.status === "UNDER_REVIEW" &&
      input.status === "APPROVED";

    if (isBreakdownApproval) {
      const equipment = await tx.equipment.findUnique({
        where: { id: current.equipmentId },
        select: {
          id: true,
          isDeactivated: true,
          status: true,
        },
      });

      if (!equipment || equipment.isDeactivated) {
        throw new ConflictError(
          "The equipment is missing or deactivated. This breakdown request cannot be approved.",
        );
      }

      if (equipment.status !== "ACTIVE") {
        throw new ConflictError(
          `The equipment is currently ${equipment.status}. Only ACTIVE equipment can be marked as BREAKDOWN.`,
        );
      }

      // The additional conditions protect against a status change
      // occurring after the equipment was checked above.
      await tx.equipment.update({
        where: {
          id: current.equipmentId,
          isDeactivated: false,
          status: "ACTIVE",
        },
        data: {
          status: "BREAKDOWN",
        },
      });
    }

    const updates: Prisma.MaintenanceRequestUncheckedUpdateManyInput = {
      status: input.status,
      updatedAt: new Date(),
    };

    if (
      input.status === "UNDER_REVIEW" ||
      input.status === "APPROVED" ||
      input.status === "REJECTED"
    ) {
      updates.reviewerId = actor.id;
    }

    if (
      input.status === "APPROVED" ||
      input.status === "REJECTED" ||
      input.status === "CANCELLED"
    ) {
      updates.decisionReason = comment;
    }

    if (input.status === "COMPLETED" && outcome) {
      updates.outcome = outcome;
    }

    const updateResult = await tx.maintenanceRequest.updateMany({
      where: { id: requestId, status: current.status },
      data: updates,
    });

    if (updateResult.count !== 1) {
      throw new ConflictError("Request status changed; reload and try again");
    }

    await tx.decisionHistory.create({
      data: {
        requestId,
        previousStatus: current.status,
        newStatus: input.status,
        actorId: actor.id,
        comment,
      },
    });

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "MAINTENANCE_REQUEST_STATUS_CHANGED",
      entityType: "MaintenanceRequest",
      entityId: requestId,
      summary: `Maintenance request #${requestId} status changed from ${current.status} to ${input.status}.`,
    });

    return tx.maintenanceRequest.findUniqueOrThrow({
      where: { id: requestId },
      include: requestDetailInclude,
    });
  });
}
