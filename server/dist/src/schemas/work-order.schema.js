import { z } from "zod";
export const workOrderStatusSchema = z.enum([
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "COMPLETED",
    "CLOSED",
]);
export const workOrderIdSchema = z.coerce.number().int().positive();
export const workOrderListQuerySchema = z
    .object({
    status: workOrderStatusSchema.optional(),
    search: z.string().trim().min(1).max(100).optional(),
    equipmentId: z.coerce.number().int().positive().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z
        .coerce.number()
        .int()
        .positive()
        .optional()
        .default(10)
        .transform((pageSize) => Math.min(pageSize, 100)),
})
    .strict();
export const assignWorkOrderSchema = z
    .object({
    assignedTechnicianId: z.number().int().positive(),
})
    .strict();
//# sourceMappingURL=work-order.schema.js.map