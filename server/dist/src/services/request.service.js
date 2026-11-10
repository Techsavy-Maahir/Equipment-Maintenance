import { AppError, ConflictError, NotFoundError, ValidationError } from "../errors.js";
import { prisma } from "../prisma.js";
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
};
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
};
const allowedTransitions = {
    SUBMITTED: ["UNDER_REVIEW", "CANCELLED"],
    UNDER_REVIEW: ["APPROVED", "REJECTED", "CANCELLED"],
    APPROVED: ["IN_PROGRESS", "CANCELLED"],
    REJECTED: [],
    IN_PROGRESS: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: [],
};
const technicianVisibleStatuses = [
    "APPROVED",
    "IN_PROGRESS",
];
function isManagerOrAdmin(role) {
    return role === "ADMIN" || role === "MANAGER";
}
function canReadRequest(request, actor) {
    return (isManagerOrAdmin(actor.role) ||
        request.requesterId === actor.id ||
        (actor.role === "TECHNICIAN" &&
            technicianVisibleStatuses.includes(request.status)));
}
function canPerformTransition(request, nextStatus, actor) {
    if ((nextStatus === "UNDER_REVIEW" ||
        nextStatus === "APPROVED" ||
        nextStatus === "REJECTED") &&
        isManagerOrAdmin(actor.role)) {
        return true;
    }
    if ((nextStatus === "IN_PROGRESS" || nextStatus === "COMPLETED") &&
        actor.role === "TECHNICIAN") {
        return true;
    }
    if (nextStatus === "CANCELLED") {
        if ((request.status === "SUBMITTED" ||
            request.status === "UNDER_REVIEW") &&
            (isManagerOrAdmin(actor.role) || request.requesterId === actor.id)) {
            return true;
        }
        return ((request.status === "APPROVED" ||
            request.status === "IN_PROGRESS") &&
            isManagerOrAdmin(actor.role));
    }
    return false;
}
function requestVisibilityWhere(actor) {
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
export async function createMaintenanceRequest(input, requester) {
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
export async function listMaintenanceRequests(query, actor) {
    const where = {
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
export async function getMaintenanceRequest(requestId, actor) {
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
export async function transitionMaintenanceRequest(requestId, actor, input) {
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
        const updates = {
            status: input.status,
            updatedAt: new Date(),
        };
        if (input.status === "UNDER_REVIEW" ||
            input.status === "APPROVED" ||
            input.status === "REJECTED") {
            updates.reviewerId = actor.id;
        }
        if (input.status === "APPROVED" ||
            input.status === "REJECTED" ||
            input.status === "CANCELLED") {
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
        return tx.maintenanceRequest.findUniqueOrThrow({
            where: { id: requestId },
            include: requestDetailInclude,
        });
    });
}
//# sourceMappingURL=request.service.js.map