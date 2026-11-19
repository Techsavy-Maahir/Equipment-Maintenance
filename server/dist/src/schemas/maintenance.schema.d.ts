import { z } from "zod";
export declare const maintenanceFrequencySchema: z.ZodEnum<{
    DAILY: "DAILY";
    WEEKLY: "WEEKLY";
    MONTHLY: "MONTHLY";
    QUARTERLY: "QUARTERLY";
    HALF_YEARLY: "HALF_YEARLY";
    YEARLY: "YEARLY";
}>;
export declare const maintenanceOccurrenceStatusSchema: z.ZodEnum<{
    COMPLETED: "COMPLETED";
    PENDING: "PENDING";
    SCHEDULED: "SCHEDULED";
    MISSED: "MISSED";
    CANCELLED: "CANCELLED";
}>;
export declare const createMaintenancePlanSchema: z.ZodObject<{
    equipmentId: z.ZodCoercedNumber<unknown>;
    activity: z.ZodString;
    instructions: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    frequency: z.ZodEnum<{
        DAILY: "DAILY";
        WEEKLY: "WEEKLY";
        MONTHLY: "MONTHLY";
        QUARTERLY: "QUARTERLY";
        HALF_YEARLY: "HALF_YEARLY";
        YEARLY: "YEARLY";
    }>;
    assignedTechnicianId: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    nextDueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    isActive: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    lastCompletedAt: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strict>;
export declare const updateMaintenancePlanSchema: z.ZodObject<{
    activity: z.ZodOptional<z.ZodString>;
    instructions: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    frequency: z.ZodOptional<z.ZodEnum<{
        DAILY: "DAILY";
        WEEKLY: "WEEKLY";
        MONTHLY: "MONTHLY";
        QUARTERLY: "QUARTERLY";
        HALF_YEARLY: "HALF_YEARLY";
        YEARLY: "YEARLY";
    }>>;
    assignedTechnicianId: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    nextDueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    lastCompletedAt: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
}, z.core.$strict>;
export declare const maintenancePlanIdSchema: z.ZodCoercedNumber<unknown>;
export declare const maintenanceOccurrenceIdSchema: z.ZodCoercedNumber<unknown>;
export declare const maintenanceOccurrenceListQuerySchema: z.ZodObject<{
    maintenancePlanId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    planId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    equipmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        COMPLETED: "COMPLETED";
        PENDING: "PENDING";
        SCHEDULED: "SCHEDULED";
        MISSED: "MISSED";
        CANCELLED: "CANCELLED";
    }>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strict>;
export declare const completeMaintenanceOccurrenceSchema: z.ZodObject<{
    completedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    workPerformed: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    remarks: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strict>;
export type CreateMaintenancePlanInput = z.infer<typeof createMaintenancePlanSchema>;
export type UpdateMaintenancePlanInput = z.infer<typeof updateMaintenancePlanSchema>;
export type MaintenanceOccurrenceListQuery = z.infer<typeof maintenanceOccurrenceListQuerySchema>;
export type CompleteMaintenanceOccurrenceInput = z.infer<typeof completeMaintenanceOccurrenceSchema>;
//# sourceMappingURL=maintenance.schema.d.ts.map