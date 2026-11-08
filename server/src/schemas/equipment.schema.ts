
import { z } from "zod";

const optionalDate = z.coerce.date().nullable().optional();

const equipmentFields = {
  code: z.string().trim().min(1).max(100),
  serialNumber: z.string().trim().max(100).nullable(),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE"]),
  criticality: z.enum(["LOW", "MEDIUM", "HIGH"]),
  departmentId: z.number().int().positive(),
  locationId: z.number().int().positive(),
  categoryId: z.number().int().positive(),
  purchaseDate: optionalDate,
  purchaseCost: z.number().nonnegative().nullable().optional(),
  warrantyStartDate: optionalDate,
  warrantyExpiryDate: optionalDate,
};

function validateWarrantyDates(data: {
  warrantyStartDate?: Date | null;
  warrantyExpiryDate?: Date | null;
}) {
  if (
    data.warrantyStartDate &&
    data.warrantyExpiryDate &&
    data.warrantyExpiryDate <= data.warrantyStartDate
  ) {
    return false;
  }

  return true;
}

export const createEquipmentSchema = z
  .object({
    code: equipmentFields.code,
    serialNumber: equipmentFields.serialNumber.optional(),
    name: equipmentFields.name,
    description: equipmentFields.description.optional(),
    status: equipmentFields.status.optional(),
    criticality: equipmentFields.criticality,
    departmentId: equipmentFields.departmentId,
    locationId: equipmentFields.locationId,
    categoryId: equipmentFields.categoryId,
    purchaseDate: equipmentFields.purchaseDate,
    purchaseCost: equipmentFields.purchaseCost,
    warrantyStartDate: equipmentFields.warrantyStartDate,
    warrantyExpiryDate: equipmentFields.warrantyExpiryDate,
  })
  .strict()
  .refine(validateWarrantyDates, {
    message: "Warranty expiry must be after warranty start date",
    path: ["warrantyExpiryDate"],
  });

export const updateEquipmentSchema = z
  .object({
    code: equipmentFields.code.optional(),
    serialNumber: equipmentFields.serialNumber.optional(),
    name: equipmentFields.name.optional(),
    description: equipmentFields.description.optional(),
    status: equipmentFields.status.optional(),
    criticality: equipmentFields.criticality.optional(),
    departmentId: equipmentFields.departmentId.optional(),
    locationId: equipmentFields.locationId.optional(),
    categoryId: equipmentFields.categoryId.optional(),
    purchaseDate: equipmentFields.purchaseDate,
    purchaseCost: equipmentFields.purchaseCost,
    warrantyStartDate: equipmentFields.warrantyStartDate,
    warrantyExpiryDate: equipmentFields.warrantyExpiryDate,
  })
  .strict()
  .refine(validateWarrantyDates, {
    message: "Warranty expiry must be after warranty start date",
    path: ["warrantyExpiryDate"],
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const equipmentIdSchema = z.coerce.number().int().positive();

export const equipmentListQuerySchema = z
  .object({
    search: z.string().trim().max(200).optional().default(""),
    status: equipmentFields.status.optional(),
    location: z.coerce.number().int().positive().optional(),
    category: z.coerce.number().int().positive().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z
      .coerce.number()
      .int()
      .positive()
      .optional()
      .default(8)
      .transform((pageSize) => Math.min(pageSize, 100)),
  })
  .strict();

export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
export type EquipmentListQuery = z.infer<typeof equipmentListQuerySchema>;
