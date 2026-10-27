import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ZodError } from "zod";
import { AppError, ValidationError, ConflictError } from "./errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { env } from "./env.js";
import { PrismaClient } from "../generated/prisma/client.js";
import cookieParser from "cookie-parser";
import { authService } from "./services/auth.service.js";
import { authMiddleware, AuthRequest } from "./middleware/auth.middleware.js";

const app = express();
const prisma = new PrismaClient();

app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON middleware
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// POST /api/login
app.post("/api/login", async (req: AuthRequest, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error);
  }
});

// POST /api/logout
app.post("/api/logout", (req: AuthRequest, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

// GET /api/me
app.get("/api/me", authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getCurrentUser(req.userId!);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/equipment - fetch all equipment
app.get("/api/equipment", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const equipment = await prisma.equipment.findMany({
      include: {
        department: true,
        location: true,
        category: true,
      },
    });
    res.status(200).json(equipment);
  } catch (error) {
    next(error);
  }
});

// Validation middleware factory
export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string> = {};
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
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404,
  });
});

// Global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
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

  const statusCode =
    typeof err === "object" &&
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