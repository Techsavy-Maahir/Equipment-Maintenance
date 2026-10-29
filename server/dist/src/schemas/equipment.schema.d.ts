import { z } from "zod";
export declare const createEquipmentSchema: z.ZodObject<{
    code: z.ZodString;
    serialNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    serialNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
export declare const equipmentListQuerySchema: z.ZodObject<{
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        INACTIVE: "INACTIVE";
        UNDER_MAINTENANCE: "UNDER_MAINTENANCE";
    }>>;
    location: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    category: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodPipe<z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>, z.ZodTransform<number, number>>;
}, z.core.$strict>;
export type CreateEquipmentInput = z.infer<typeof createEquipmentSchema>;
export type UpdateEquipmentInput = z.infer<typeof updateEquipmentSchema>;
export type EquipmentListQuery = z.infer<typeof equipmentListQuerySchema>;
//# sourceMappingURL=equipment.schema.d.ts.map