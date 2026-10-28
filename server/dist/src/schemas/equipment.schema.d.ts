import { z } from "zod";
export declare const createEquipmentSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
        UNDER_MAINTENANCE: "UNDER_MAINTENANCE";
    }>>;
    criticality: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    departmentId: z.ZodNumber;
    locationId: z.ZodNumber;
    categoryId: z.ZodNumber;
}, z.core.$strict>;
export declare const updateEquipmentSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
        UNDER_MAINTENANCE: "UNDER_MAINTENANCE";
    }>>;
    criticality: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>>;
    departmentId: z.ZodOptional<z.ZodNumber>;
    locationId: z.ZodOptional<z.ZodNumber>;
    categoryId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strict>;
export declare const equipmentIdSchema: z.ZodCoercedNumber<unknown>;
export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
//# sourceMappingURL=equipment.schema.d.ts.map