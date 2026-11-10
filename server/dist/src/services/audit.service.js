export async function createAuditLog(tx, input) {
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
//# sourceMappingURL=audit.service.js.map