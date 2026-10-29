import { z } from "zod";
export declare const userIdSchema: z.ZodCoercedNumber<unknown>;
export declare const roleEnum: z.ZodEnum<{
    ADMIN: "ADMIN";
    MANAGER: "MANAGER";
    TECHNICIAN: "TECHNICIAN";
    VIEWER: "VIEWER";
}>;
export declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        MANAGER: "MANAGER";
        TECHNICIAN: "TECHNICIAN";
        VIEWER: "VIEWER";
    }>;
}, z.core.$strict>;
export declare const updateUserRoleSchema: z.ZodObject<{
    role: z.ZodEnum<{
        ADMIN: "ADMIN";
        MANAGER: "MANAGER";
        TECHNICIAN: "TECHNICIAN";
        VIEWER: "VIEWER";
    }>;
}, z.core.$strict>;
export declare const userListQuerySchema: z.ZodObject<{
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        MANAGER: "MANAGER";
        TECHNICIAN: "TECHNICIAN";
        VIEWER: "VIEWER";
        ALL: "ALL";
    }>>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        all: "all";
        active: "active";
        inactive: "inactive";
    }>>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strict>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;
//# sourceMappingURL=user.schema.d.ts.map