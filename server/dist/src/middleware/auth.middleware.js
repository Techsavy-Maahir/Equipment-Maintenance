import { authService } from "../services/auth.service.js";
import { AppError } from "../errors.js";
import { prisma } from "../prisma.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new AppError(401, "Unauthorized");
        }
        const decoded = authService.verifyToken(token);
        if (!decoded ||
            typeof decoded !== "object" ||
            !("userId" in decoded) ||
            typeof decoded.userId !== "number") {
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
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.middleware.js.map