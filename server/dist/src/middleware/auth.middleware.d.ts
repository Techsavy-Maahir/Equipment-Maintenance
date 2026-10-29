/// <reference types="cookie-parser" />
import { Request, Response, NextFunction } from "express";
import type { Role } from "../../generated/prisma/client.js";
export interface AuthenticatedUser {
    id: number;
    email: string;
    name: string;
    role: Role;
    isActive: boolean;
}
export interface AuthRequest extends Request {
    userId?: number;
    user?: AuthenticatedUser;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const requireAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map