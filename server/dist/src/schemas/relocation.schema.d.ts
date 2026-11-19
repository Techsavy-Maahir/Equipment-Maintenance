import { z } from "zod";
export declare const createRelocationSchema: z.ZodObject<{
    equipmentId: z.ZodCoercedNumber<unknown>;
    toLocationId: z.ZodCoercedNumber<unknown>;
    reason: z.ZodString;
}, z.core.$strict>;
export declare const relocationListQuerySchema: z.ZodObject<{
    equipmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodPipe<z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>, z.ZodTransform<number, number>>;
}, z.core.$strict>;
export declare const relocationIdSchema: z.ZodCoercedNumber<unknown>;
export type CreateRelocationInput = z.infer<typeof createRelocationSchema>;
export type RelocationListQuery = z.infer<typeof relocationListQuerySchema>;
//# sourceMappingURL=relocation.schema.d.ts.map