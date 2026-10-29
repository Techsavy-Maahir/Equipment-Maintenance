import type { Role } from "../../generated/prisma/client.js";
import type { CreateUserInput, UserListQuery } from "../schemas/user.schema.js";
export declare function listUsers(query: UserListQuery): Promise<{
    items: {
        email: string;
        role: Role;
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function createUser(input: CreateUserInput): Promise<{
    email: string;
    role: Role;
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function changeUserRole(targetUserId: number, newRole: Role, currentAdminId: number): Promise<{
    email: string;
    role: Role;
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deactivateUser(targetUserId: number, currentAdminId: number): Promise<{
    email: string;
    role: Role;
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function reactivateUser(targetUserId: number): Promise<{
    email: string;
    role: Role;
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=user.service.d.ts.map