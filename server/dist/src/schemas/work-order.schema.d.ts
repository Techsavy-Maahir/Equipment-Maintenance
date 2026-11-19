import { z } from "zod";
export declare const workOrderStatusSchema: z.ZodEnum<{
    COMPLETED: "COMPLETED";
    OPEN: "OPEN";
    ASSIGNED: "ASSIGNED";
    IN_PROGRESS: "IN_PROGRESS";
    CLOSED: "CLOSED";
}>;
export declare const workOrderIdSchema: z.ZodCoercedNumber<unknown>;
export declare const workOrderListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        COMPLETED: "COMPLETED";
        OPEN: "OPEN";
        ASSIGNED: "ASSIGNED";
        IN_PROGRESS: "IN_PROGRESS";
        CLOSED: "CLOSED";
    }>>;
    search: z.ZodOptional<z.ZodString>;
    equipmentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodPipe<z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>, z.ZodTransform<number, number>>;
}, z.core.$strict>;
export declare const assignWorkOrderSchema: z.ZodObject<{
    assignedTechnicianId: z.ZodNumber;
}, z.core.$strict>;
export type WorkOrderListQuery = z.infer<typeof workOrderListQuerySchema>;
export type AssignWorkOrderInput = z.infer<typeof assignWorkOrderSchema>;
//# sourceMappingURL=work-order.schema.d.ts.map