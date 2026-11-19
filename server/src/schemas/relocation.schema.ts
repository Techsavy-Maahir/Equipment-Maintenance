import { z } from "zod";

export const createRelocationSchema = z
  .object({
    equipmentId: z.coerce.number().int().positive(),
    toLocationId: z.coerce.number().int().positive(),
    reason: z
      .string()
      .trim()
      .min(3, "Relocation reason must be at least 3 characters")
      .max(1000),
  })
  .strict();

export const relocationListQuerySchema = z
  .object({
    equipmentId: z.coerce.number().int().positive().optional(),
    search: z.string().trim().optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z
      .coerce.number()
      .int()
      .positive()
      .optional()
      .default(10)
      .transform((val) => Math.min(val, 100)),
  })
  .strict();

export const relocationIdSchema = z.coerce.number().int().positive();

export type CreateRelocationInput = z.infer<typeof createRelocationSchema>;
export type RelocationListQuery = z.infer<typeof relocationListQuerySchema>;
