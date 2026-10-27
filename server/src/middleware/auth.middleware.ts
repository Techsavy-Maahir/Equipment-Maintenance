import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { AppError } from "../errors.js";

export interface AuthRequest extends Request {
  userId?: number;
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError(401, "Unauthorized");
  }

  const decoded = authService.verifyToken(token);

  if (!decoded) {
    throw new AppError(401, "Unauthorized");
  }

  req.userId = (decoded as any).userId;
  next();
};