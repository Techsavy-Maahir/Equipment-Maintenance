
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { AppError } from "../errors.js";
import { prisma } from "../prisma.js";
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

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError(401, "Unauthorized");
    }

    const decoded = authService.verifyToken(token);

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "number"
    ) {
      throw new AppError(401, "Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new AppError(401, "Unauthorized");
    }

    req.userId = user.id;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
