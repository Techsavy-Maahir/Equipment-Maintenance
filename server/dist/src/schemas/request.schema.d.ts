import { z } from "zod";
export declare const maintenanceRequestStatusSchema: z.ZodEnum<{
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
    IN_PROGRESS: "IN_PROGRESS";
    SUBMITTED: "SUBMITTED";
    UNDER_REVIEW: "UNDER_REVIEW";
    APPROVED: "APPROVED";
    REJECTED: "REJECTED";
}>;
export declare const maintenanceRequestTypeSchema: z.ZodEnum<{
    BREAKDOWN: "BREAKDOWN";
    PREVENTIVE: "PREVENTIVE";
    IMPROVEMENT: "IMPROVEMENT";
}>;
export declare const createMaintenanceRequestSchema: z.ZodObject<{
    requestType: z.ZodEnum<{
        BREAKDOWN: "BREAKDOWN";
        PREVENTIVE: "PREVENTIVE";
        IMPROVEMENT: "IMPROVEMENT";
    }>;
    equipmentId: z.ZodNumber;
    description: z.ZodString;
    criticality: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    problem: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    proposedSolution: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expectedBenefit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    implementationStatus: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export declare const maintenanceRequestIdSchema: z.ZodCoercedNumber<unknown>;
export declare const maintenanceRequestListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        IN_PROGRESS: "IN_PROGRESS";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>>;
    requestType: z.ZodOptional<z.ZodEnum<{
        BREAKDOWN: "BREAKDOWN";
        PREVENTIVE: "PREVENTIVE";
        IMPROVEMENT: "IMPROVEMENT";
    }>>;
    equipmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodPipe<z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>, z.ZodTransform<number, number>>;
}, z.core.$strict>;
export declare const transitionMaintenanceRequestSchema: z.ZodObject<{
    status: z.ZodEnum<{
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        IN_PROGRESS: "IN_PROGRESS";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    comment: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    outcome: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    implementationStatus: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type CreateMaintenanceRequestInput = z.infer<typeof createMaintenanceRequestSchema>;
export type MaintenanceRequestListQuery = z.infer<typeof maintenanceRequestListQuerySchema>;
export type TransitionMaintenanceRequestInput = z.infer<typeof transitionMaintenanceRequestSchema>;
//# sourceMappingURL=request.schema.d.ts.map