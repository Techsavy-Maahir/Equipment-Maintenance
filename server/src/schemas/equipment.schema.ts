import { z } from "zod";

const equipmentFields = {
  code: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE"]),
  criticality: z.enum(["LOW", "MEDIUM", "HIGH"]),
  departmentId: z.number().int().positive(),
  locationId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
};

export const createEquipmentSchema = z
  .object({
    code: equipmentFields.code,
    name: equipmentFields.name,
    description: equipmentFields.description.optional(),
    status: equipmentFields.status.optional(),
    criticality: equipmentFields.criticality,
    departmentId: equipmentFields.departmentId,
    locationId: equipmentFields.locationId,
    categoryId: equipmentFields.categoryId,
  })
  .strict();

export const updateEquipmentSchema = z
  .object({
    code: equipmentFields.code.optional(),
    name: equipmentFields.name.optional(),
    description: equipmentFields.description.optional(),
    status: equipmentFields.status.optional(),
    criticality: equipmentFields.criticality.optional(),
    departmentId: equipmentFields.departmentId.optional(),
    locationId: equipmentFields.locationId.optional(),
    categoryId: equipmentFields.categoryId.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const equipmentIdSchema = z.coerce.number().int().positive();

export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
