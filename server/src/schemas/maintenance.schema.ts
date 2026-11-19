import { z } from "zod";

export const maintenanceFrequencySchema = z.enum([
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "QUARTERLY",
  "HALF_YEARLY",
  "YEARLY",
]);

export const maintenanceOccurrenceStatusSchema = z.enum([
  "PENDING",
  "SCHEDULED",
  "COMPLETED",
  "MISSED",
  "CANCELLED",
]);

export const createMaintenancePlanSchema = z
  .object({
    equipmentId: z.coerce.number().int().positive(),
    activity: z.string().trim().min(3).max(200),
    instructions: z.string().trim().max(2000).optional().or(z.literal("")),
    frequency: maintenanceFrequencySchema,
    assignedTechnicianId: z.coerce.number().int().positive().optional().nullable(),
    nextDueDate: z.coerce.date().optional(),
    isActive: z.boolean().optional().default(true),
    lastCompletedAt: z.coerce.date().optional().nullable(),
  })
  .strict();

export const updateMaintenancePlanSchema = z
  .object({
    activity: z.string().trim().min(3).max(200).optional(),
    instructions: z.string().trim().max(2000).optional().or(z.literal("")),
    frequency: maintenanceFrequencySchema.optional(),
    assignedTechnicianId: z.coerce.number().int().positive().optional().nullable(),
    nextDueDate: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
    lastCompletedAt: z.coerce.date().optional().nullable(),
  })
  .strict();

export const maintenancePlanIdSchema = z.coerce.number().int().positive();
export const maintenanceOccurrenceIdSchema = z.coerce.number().int().positive();

export const maintenanceOccurrenceListQuerySchema = z
  .object({
    maintenancePlanId: z.coerce.number().int().positive().optional(),
    planId: z.coerce.number().int().positive().optional(),
    equipmentId: z.coerce.number().int().positive().optional(),
    status: maintenanceOccurrenceStatusSchema.optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().positive().optional().default(10),
  })
  .strict();

export const completeMaintenanceOccurrenceSchema = z
  .object({
    completedAt: z.coerce.date().optional(),
    workPerformed: z.string().trim().max(5000).optional().nullable(),
    remarks: z.string().trim().max(5000).optional().nullable(),
  })
  .strict();

export type CreateMaintenancePlanInput = z.infer<typeof createMaintenancePlanSchema>;
export type UpdateMaintenancePlanInput = z.infer<typeof updateMaintenancePlanSchema>;
export type MaintenanceOccurrenceListQuery = z.infer<typeof maintenanceOccurrenceListQuerySchema>;
export type CompleteMaintenanceOccurrenceInput = z.infer<typeof completeMaintenanceOccurrenceSchema>;
