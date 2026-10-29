import jwt from "jsonwebtoken";
export declare const authService: {
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: number;
            name: string;
            password_hash: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getCurrentUser(userId: number): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
    } | null>;
    verifyToken(token: string): string | jwt.JwtPayload | null;
};
//# sourceMappingURL=auth.service.d.ts.map