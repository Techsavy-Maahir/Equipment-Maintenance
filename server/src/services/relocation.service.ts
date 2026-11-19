import type { Prisma } from "../../generated/prisma/client.js";
import { AppError, NotFoundError, ValidationError } from "../errors.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import { prisma } from "../prisma.js";
import type {
  CreateRelocationInput,
  RelocationListQuery,
} from "../schemas/relocation.schema.js";
import { createAuditLog } from "./audit.service.js";
import { changeEquipmentLocation } from "./equipment.service.js";

export interface RelocationRecord {
  id: number;
  equipmentId: number;
  equipment: {
    id: number;
    code: string;
    name: string;
  };
  fromLocationId: number | null;
  fromLocation: {
    id: number;
    name: string;
  } | null;
  toLocationId: number;
  toLocation: {
    id: number;
    name: string;
  };
  reason: string;
  relocatedAt: Date;
  relocatedBy: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

// In-memory cache for recent relocation reasons to support instant lookup
const relocationReasonMap = new Map<number, { reason: string; actor: AuthenticatedUser }>();

export async function relocateEquipment(
  input: CreateRelocationInput,
  actor: AuthenticatedUser,
): Promise<RelocationRecord> {
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "MANAGER")) {
    throw new AppError(403, "Only administrators and managers can relocate equipment");
  }

  const reason = input.reason.trim();
  if (reason.length < 3) {
    throw new ValidationError({ reason: "Relocation reason must be at least 3 characters" });
  }

  return prisma.$transaction(async (tx) => {
    const equipment = await tx.equipment.findUnique({
      where: { id: input.equipmentId },
      include: {
        location: { select: { id: true, name: true } },
      },
    });

    if (!equipment || equipment.isDeactivated) {
      throw new NotFoundError("Active equipment not found");
    }

    if (equipment.locationId === input.toLocationId) {
      throw new ValidationError({
        toLocationId: "Equipment is already in this location",
      });
    }

    const toLocation = await tx.location.findUnique({
      where: { id: input.toLocationId },
      select: { id: true, name: true, isActive: true },
    });

    if (!toLocation || !toLocation.isActive) {
      throw new ValidationError({
        toLocationId: "Target location does not exist or is inactive",
      });
    }

    const fromLocationName = equipment.location?.name ?? "Unknown";
    const toLocationName = toLocation.name;

    await changeEquipmentLocation(tx, input.equipmentId, input.toLocationId);

    const historyRecord = await tx.equipmentLocationHistory.findFirst({
      where: {
        equipmentId: input.equipmentId,
        toLocationId: input.toLocationId,
      },
      orderBy: { id: "desc" },
      include: {
        equipment: { select: { id: true, code: true, name: true } },
        fromLocation: { select: { id: true, name: true } },
        toLocation: { select: { id: true, name: true } },
      },
    });

    if (!historyRecord) {
      throw new AppError(500, "Failed to record equipment location history");
    }

    await createAuditLog(tx, {
      actorId: actor.id,
      action: "EQUIPMENT_RELOCATED",
      entityType: "Equipment",
      entityId: input.equipmentId,
      summary: `Equipment ${equipment.code} relocated from ${fromLocationName} to ${toLocationName}. Reason: ${reason}`,
    });

    relocationReasonMap.set(historyRecord.id, { reason, actor });

    return {
      id: historyRecord.id,
      equipmentId: historyRecord.equipmentId,
      equipment: historyRecord.equipment,
      fromLocationId: historyRecord.fromLocationId,
      fromLocation: historyRecord.fromLocation,
      toLocationId: historyRecord.toLocationId,
      toLocation: historyRecord.toLocation,
      reason,
      relocatedAt: historyRecord.changedAt,
      relocatedBy: {
        id: actor.id,
        name: actor.name,
        email: actor.email,
        role: actor.role,
      },
    };
  });
}

export async function listRelocations(query: Partial<RelocationListQuery> = {}) {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 10;
  const skip = (page - 1) * pageSize;

  const where: Prisma.EquipmentLocationHistoryWhereInput = {
    ...(query.equipmentId !== undefined ? { equipmentId: query.equipmentId } : {}),
    ...(query.search
      ? {
          OR: [
            { equipment: { name: { contains: query.search, mode: "insensitive" } } },
            { equipment: { code: { contains: query.search, mode: "insensitive" } } },
            { toLocation: { name: { contains: query.search, mode: "insensitive" } } },
            { fromLocation: { name: { contains: query.search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [total, rawItems] = await Promise.all([
    prisma.equipmentLocationHistory.count({ where }),
    prisma.equipmentLocationHistory.findMany({
      where,
      orderBy: [{ changedAt: "desc" }, { id: "desc" }],
      skip,
      take: pageSize,
      include: {
        equipment: { select: { id: true, code: true, name: true } },
        fromLocation: { select: { id: true, name: true } },
        toLocation: { select: { id: true, name: true } },
      },
    }),
  ]);

  // Fetch relevant audit logs for these equipments to match reasons
  const equipmentIds = [...new Set(rawItems.map((item) => item.equipmentId))];
  const auditLogs = equipmentIds.length > 0
    ? await prisma.auditLog.findMany({
        where: {
          action: "EQUIPMENT_RELOCATED",
          entityType: "Equipment",
          entityId: { in: equipmentIds },
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        include: {
          actor: { select: { id: true, name: true, email: true, role: true } },
        },
      })
    : [];

  const items: RelocationRecord[] = rawItems.map((item) => {
    const cached = relocationReasonMap.get(item.id);
    if (cached) {
      return {
        id: item.id,
        equipmentId: item.equipmentId,
        equipment: item.equipment,
        fromLocationId: item.fromLocationId,
        fromLocation: item.fromLocation,
        toLocationId: item.toLocationId,
        toLocation: item.toLocation,
        reason: cached.reason,
        relocatedAt: item.changedAt,
        relocatedBy: {
          id: cached.actor.id,
          name: cached.actor.name,
          email: cached.actor.email,
          role: cached.actor.role,
        },
      };
    }

    // Match audit log by equipmentId and approximate timestamp (within 60s)
    const matchingAudit = auditLogs.find((audit) => {
      if (audit.entityId !== item.equipmentId) return false;
      const diff = Math.abs(audit.createdAt.getTime() - item.changedAt.getTime());
      return diff < 60000;
    });

    let reason = "Routine facility relocation";
    if (matchingAudit?.summary) {
      const match = matchingAudit.summary.match(/Reason:\s*(.*)$/);
      if (match && match[1]) {
        reason = match[1].trim();
      }
    }

    return {
      id: item.id,
      equipmentId: item.equipmentId,
      equipment: item.equipment,
      fromLocationId: item.fromLocationId,
      fromLocation: item.fromLocation,
      toLocationId: item.toLocationId,
      toLocation: item.toLocation,
      reason,
      relocatedAt: item.changedAt,
      relocatedBy: matchingAudit?.actor ?? null,
    };
  });

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function getRelocationsForEquipment(equipmentId: number) {
  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
    select: { id: true },
  });

  if (!equipment) {
    throw new NotFoundError("Equipment not found");
  }

  const result = await listRelocations({ equipmentId, pageSize: 100 });
  return result.items;
}
