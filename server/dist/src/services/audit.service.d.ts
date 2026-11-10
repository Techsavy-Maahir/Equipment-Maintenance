import type { Prisma } from "../../generated/prisma/client.js";
export interface CreateAuditLogInput {
    actorId?: number | null;
    action: string;
    entityType: string;
    entityId: number;
    summary: string;
}
export declare function createAuditLog(tx: Prisma.TransactionClient, input: CreateAuditLogInput): Promise<{
    id: number;
    createdAt: Date;
    actorId: number | null;
    action: string;
    entityType: string;
    entityId: number;
    summary: string;
}>;
//# sourceMappingURL=audit.service.d.ts.map