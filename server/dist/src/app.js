import express from "express";
import cors from "cors";
import { ZodError } from "zod";
import { AppError, ValidationError } from "./errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { env } from "./env.js";
import cookieParser from "cookie-parser";
import { authService } from "./services/auth.service.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { createEquipment, deactivateEquipment, getEquipment, listEquipment, updateEquipment, } from "./services/equipment.service.js";
import { createEquipmentSchema, equipmentIdSchema, updateEquipmentSchema, } from "./schemas/equipment.schema.js";
const app = express();
app.use(cookieParser());
// CORS middleware
app.use(cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
// JSON middleware
app.use(express.json());
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy" });
});
// POST /api/login
app.post("/api/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError(400, "Email and password required");
        }
        const { token, user } = await authService.login(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: env.NODE_ENV === "production",
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
        });
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
    }
    catch (error) {
        next(error);
    }
});
// POST /api/logout
app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
});
// GET /api/me
app.get("/api/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(req.userId);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
// Validation middleware factory
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            const validated = schema.parse(req.body);
            req.body = validated;
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const details = {};
                error.issues.forEach((issue) => {
                    const path = issue.path.join(".");
                    details[path] = issue.message;
                });
                throw new ValidationError(details);
            }
            throw error;
        }
    };
};
const parseEquipmentId = (rawId) => {
    const result = equipmentIdSchema.safeParse(rawId);
    if (!result.success) {
        throw new AppError(400, "Invalid equipment ID");
    }
    return result.data;
};
app.get("/api/equipment", async (_req, res, next) => {
    try {
        res.status(200).json(await listEquipment());
    }
    catch (error) {
        next(error);
    }
});
app.post("/api/equipment", validate(createEquipmentSchema), async (req, res, next) => {
    try {
        const equipment = await createEquipment(req.body);
        res.status(201).json(equipment);
    }
    catch (error) {
        next(error);
    }
});
app.get("/api/equipment/:id", async (req, res, next) => {
    try {
        const equipment = await getEquipment(parseEquipmentId(req.params.id));
        res.status(200).json(equipment);
    }
    catch (error) {
        next(error);
    }
});
app.put("/api/equipment/:id", validate(updateEquipmentSchema), async (req, res, next) => {
    try {
        const equipment = await updateEquipment(parseEquipmentId(req.params.id), req.body);
        res.status(200).json(equipment);
    }
    catch (error) {
        next(error);
    }
});
app.delete("/api/equipment/:id", async (req, res, next) => {
    try {
        const equipment = await deactivateEquipment(parseEquipmentId(req.params.id));
        res.status(200).json(equipment);
    }
    catch (error) {
        next(error);
    }
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.path} not found`,
        statusCode: 404,
    });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error("Request error:", err);
    // Zod validation error (caught by validate middleware)
    if (err instanceof ValidationError) {
        return res.status(400).json({
            error: "Validation Error",
            message: err.message,
            details: err.details,
            statusCode: 400,
        });
    }
    // Prisma unique constraint violation (P2002)
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
        return res.status(409).json({
            error: "Conflict",
            message: `Duplicate value for field: ${err.meta?.target}`,
            statusCode: 409,
        });
    }
    // Custom AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message,
            details: err.details,
            statusCode: err.statusCode,
        });
    }
    const statusCode = typeof err === "object" &&
        err !== null &&
        "statusCode" in err &&
        typeof err.statusCode === "number"
        ? err.statusCode
        : 500;
    res.status(statusCode).json({
        error: statusCode === 500 ? "Internal Server Error" : "Request Error",
        message: statusCode === 500 ? "An unexpected error occurred" : "The request could not be processed",
        statusCode,
    });
});
export default app;
//# sourceMappingURL=app.js.map