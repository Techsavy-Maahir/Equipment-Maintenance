import { z } from "zod";
export declare const masterDataIdSchema: z.ZodCoercedNumber<unknown>;
export declare const createMasterDataSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strict>;
export declare const updateMasterDataSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export declare const masterDataQuerySchema: z.ZodObject<{
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        all: "all";
        active: "active";
        inactive: "inactive";
    }>>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strict>;
export type CreateMasterDataInput = z.infer<typeof createMasterDataSchema>;
export type UpdateMasterDataInput = z.infer<typeof updateMasterDataSchema>;
export type MasterDataQuery = z.infer<typeof masterDataQuerySchema>;
//# sourceMappingURL=master-data.schema.d.ts.map