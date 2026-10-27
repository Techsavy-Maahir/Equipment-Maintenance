/// <reference types="cookie-parser" />
import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    userId?: number;
    user?: any;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map