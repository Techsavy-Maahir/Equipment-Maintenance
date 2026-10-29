import { z } from "zod";
export const userIdSchema = z.coerce.number().int().positive();
export const roleEnum = z.enum(["ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"]);
export const createUserSchema = z
    .object({
    email: z.string().trim().email("Invalid email format").toLowerCase(),
    name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name cannot exceed 100 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: roleEnum,
})
    .strict();
export const updateUserRoleSchema = z
    .object({
    role: roleEnum,
})
    .strict();
export const userListQuerySchema = z
    .object({
    search: z.string().trim().optional().default(""),
    role: z.enum(["ALL", "ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"]).optional().default("ALL"),
    status: z.enum(["all", "active", "inactive"]).optional().default("all"),
    page: z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
})
    .strict();
//# sourceMappingURL=user.schema.js.map