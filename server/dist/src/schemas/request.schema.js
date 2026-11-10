import { z } from "zod";
export const maintenanceRequestStatusSchema = z.enum([
    "SUBMITTED",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
]);
export const maintenanceRequestTypeSchema = z.enum([
    "BREAKDOWN",
    "PREVENTIVE",
    "IMPROVEMENT",
]);
export const createMaintenanceRequestSchema = z
    .object({
    requestType: maintenanceRequestTypeSchema,
    equipmentId: z.number().int().positive(),
    description: z.string().trim().min(1).max(5000),
    criticality: z.enum(["LOW", "MEDIUM", "HIGH"]),
    problem: z.string().trim().max(5000).nullable().optional(),
    proposedSolution: z.string().trim().max(5000).nullable().optional(),
    expectedBenefit: z.string().trim().max(5000).nullable().optional(),
    implementationStatus: z.string().trim().max(100).nullable().optional(),
})
    .strict();
export const maintenanceRequestIdSchema = z.coerce.number().int().positive();
export const maintenanceRequestListQuerySchema = z
    .object({
    status: maintenanceRequestStatusSchema.optional(),
    requestType: maintenanceRequestTypeSchema.optional(),
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
export const transitionMaintenanceRequestSchema = z
    .object({
    status: maintenanceRequestStatusSchema,
    comment: z.string().trim().max(2000).nullable().optional(),
    outcome: z.string().trim().max(5000).nullable().optional(),
})
    .strict();
//# sourceMappingURL=request.schema.js.map