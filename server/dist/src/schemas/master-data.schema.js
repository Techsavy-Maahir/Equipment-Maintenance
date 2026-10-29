import { z } from "zod";
export const masterDataIdSchema = z.coerce.number().int().positive();
export const createMasterDataSchema = z
    .object({
    name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters"),
})
    .strict();
export const updateMasterDataSchema = z
    .object({
    name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters").optional(),
    isActive: z.boolean().optional(),
})
    .strict()
    .refine((data) => data.name !== undefined || data.isActive !== undefined, {
    message: "At least one field (name or isActive) must be provided",
});
export const masterDataQuerySchema = z
    .object({
    search: z.string().trim().optional().default(""),
    status: z.enum(["all", "active", "inactive"]).optional().default("all"),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().positive().max(100).optional().default(8),
})
    .strict();
//# sourceMappingURL=master-data.schema.js.map