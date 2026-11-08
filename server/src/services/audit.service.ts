import type { Prisma } from "../../generated/prisma/client.js";

export interface CreateAuditLogInput {
  actorId?: number | null;
  action: string;
  entityType: string;
  entityId: number;
  summary: string;
}

export async function createAuditLog(
  tx: Prisma.TransactionClient,
  input: CreateAuditLogInput,
) {
  return tx.auditLog.create({
    data: {
      actorId: input.actorId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      summary: input.summary,
    },
  });
}