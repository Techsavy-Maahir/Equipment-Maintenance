import { z } from "zod";
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
};
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
})
    .strict();
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
})
    .strict()
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
//# sourceMappingURL=equipment.schema.js.map