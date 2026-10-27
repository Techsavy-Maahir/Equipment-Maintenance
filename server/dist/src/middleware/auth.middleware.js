import { authService } from "../services/auth.service.js";
import { AppError } from "../errors.js";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new AppError(401, "Unauthorized");
    }
    const decoded = authService.verifyToken(token);
    if (!decoded) {
        throw new AppError(401, "Unauthorized");
    }
    req.userId = decoded.userId;
    next();
};
//# sourceMappingURL=auth.middleware.js.map