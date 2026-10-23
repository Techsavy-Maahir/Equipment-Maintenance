import express from "express";
import { ZodError } from "zod";
import { AppError, ValidationError } from "./errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
const app = express();
// Middleware
app.use(express.json());
// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Server is healthy" });
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
    console.error("Error:", err);
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
    // Unknown error
    res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred",
        statusCode: 500,
    });
});
export default app;
//# sourceMappingURL=app.js.map