import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ZodError, type ZodType } from "zod";
import { AppError, ValidationError } from "./errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { env } from "./env.js";
import cookieParser from "cookie-parser";
import { authService } from "./services/auth.service.js";
import {
  authMiddleware,
  requireAdmin,
  AuthRequest,
} from "./middleware/auth.middleware.js";
import {
  createEquipment,
  deactivateEquipment,
  getEquipment,
  listEquipment,
  updateEquipment,
} from "./services/equipment.service.js";
import {
  createEquipmentSchema,
  equipmentListQuerySchema,
  equipmentIdSchema,
  updateEquipmentSchema,
} from "./schemas/equipment.schema.js";
import {
  createMasterDataSchema,
  masterDataIdSchema,
  masterDataQuerySchema,
  updateMasterDataSchema,
} from "./schemas/master-data.schema.js";
import {
  createDepartment,
  deactivateDepartment,
  listDepartments,
  reactivateDepartment,
  updateDepartment,
  createLocation,
  deactivateLocation,
  listLocations,
  reactivateLocation,
  updateLocation,
  createCategory,
  deactivateCategory,
  listCategories,
  reactivateCategory,
  updateCategory,
} from "./services/master-data.service.js";
import {
  createUserSchema,
  updateUserRoleSchema,
  userIdSchema,
  userListQuerySchema,
} from "./schemas/user.schema.js";
import {
  changeUserRole,
  createUser,
  deactivateUser,
  listUsers,
  reactivateUser,
} from "./services/user.service.js";

const app = express();

app.use(cookieParser());

// CORS middleware
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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

// Validation middleware factory
export const validate = (schema: ZodType) => {
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

const parseEquipmentId = (rawId: string | string[]): number => {
  const result = equipmentIdSchema.safeParse(rawId);

  if (!result.success) {
    throw new AppError(400, "Invalid equipment ID");
  }

  return result.data;
};

const parseMasterDataId = (rawId: string | string[], entityName: string): number => {
  const result = masterDataIdSchema.safeParse(rawId);

  if (!result.success) {
    throw new AppError(400, `Invalid ${entityName} ID`);
  }

  return result.data;
};

const parseUserId = (rawId: string | string[]): number => {
  const result = userIdSchema.safeParse(rawId);

  if (!result.success) {
    throw new AppError(400, "Invalid user ID");
  }

  return result.data;
};

const parseMasterDataQuery = (query: unknown) => {
  const parsedQuery = masterDataQuerySchema.safeParse(query);
  if (!parsedQuery.success) {
    const details: Record<string, string> = {};
    parsedQuery.error.issues.forEach((issue) => {
      details[issue.path.join(".")] = issue.message;
    });
    throw new ValidationError(details);
  }
  return parsedQuery.data;
};

// ==================== EQUIPMENT ROUTES ====================

app.get(
  "/api/equipment",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = equipmentListQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        const details: Record<string, string> = {};
        parsedQuery.error.issues.forEach((issue) => {
          details[issue.path.join(".")] = issue.message;
        });
        throw new ValidationError(details);
      }

      res.status(200).json(await listEquipment(parsedQuery.data));
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/equipment",
  validate(createEquipmentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipment = await createEquipment(req.body);
      res.status(201).json(equipment);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/equipment/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipment = await getEquipment(parseEquipmentId(req.params.id));
      res.status(200).json(equipment);
    } catch (error) {
      next(error);
    }
  },
);

app.put(
  "/api/equipment/:id",
  validate(updateEquipmentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipment = await updateEquipment(
        parseEquipmentId(req.params.id),
        req.body,
      );
      res.status(200).json(equipment);
    } catch (error) {
      next(error);
    }
  },
);

app.delete(
  "/api/equipment/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const equipment = await deactivateEquipment(
        parseEquipmentId(req.params.id),
      );
      res.status(200).json(equipment);
    } catch (error) {
      next(error);
    }
  },
);

// ==================== MASTER DATA: DEPARTMENTS ====================

app.get(
  "/api/departments",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const query = parseMasterDataQuery(req.query);
      const result = await listDepartments(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/departments",
  authMiddleware,
  requireAdmin,
  validate(createMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const department = await createDepartment(req.body);
      res.status(201).json(department);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/departments/:id",
  authMiddleware,
  requireAdmin,
  validate(updateMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "department");
      const department = await updateDepartment(id, req.body);
      res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/departments/:id",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "department");
      const department = await deactivateDepartment(id);
      res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/departments/:id/deactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "department");
      const department = await deactivateDepartment(id);
      res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/departments/:id/reactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "department");
      const department = await reactivateDepartment(id);
      res.status(200).json(department);
    } catch (error) {
      next(error);
    }
  }
);

// ==================== MASTER DATA: LOCATIONS ====================

app.get(
  "/api/locations",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const query = parseMasterDataQuery(req.query);
      const result = await listLocations(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/locations",
  authMiddleware,
  requireAdmin,
  validate(createMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const location = await createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/locations/:id",
  authMiddleware,
  requireAdmin,
  validate(updateMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "location");
      const location = await updateLocation(id, req.body);
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/locations/:id",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "location");
      const location = await deactivateLocation(id);
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/locations/:id/deactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "location");
      const location = await deactivateLocation(id);
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/locations/:id/reactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "location");
      const location = await reactivateLocation(id);
      res.status(200).json(location);
    } catch (error) {
      next(error);
    }
  }
);

// ==================== MASTER DATA: CATEGORIES ====================

app.get(
  "/api/categories",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const query = parseMasterDataQuery(req.query);
      const result = await listCategories(query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/categories",
  authMiddleware,
  requireAdmin,
  validate(createMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const category = await createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/categories/:id",
  authMiddleware,
  requireAdmin,
  validate(updateMasterDataSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "category");
      const category = await updateCategory(id, req.body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/categories/:id",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "category");
      const category = await deactivateCategory(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/categories/:id/deactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "category");
      const category = await deactivateCategory(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/categories/:id/reactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseMasterDataId(req.params.id, "category");
      const category = await reactivateCategory(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

// ==================== USER MANAGEMENT ====================

app.get(
  "/api/users",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = userListQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        const details: Record<string, string> = {};
        parsedQuery.error.issues.forEach((issue) => {
          details[issue.path.join(".")] = issue.message;
        });
        throw new ValidationError(details);
      }

      const result = await listUsers(parsedQuery.data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/api/users",
  authMiddleware,
  requireAdmin,
  validate(createUserSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/users/:id/role",
  authMiddleware,
  requireAdmin,
  validate(updateUserRoleSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseUserId(req.params.id);
      const user = await changeUserRole(id, req.body.role, req.userId!);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/users/:id/role",
  authMiddleware,
  requireAdmin,
  validate(updateUserRoleSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseUserId(req.params.id);
      const user = await changeUserRole(id, req.body.role, req.userId!);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/users/:id",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseUserId(req.params.id);
      const user = await deactivateUser(id, req.userId!);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/users/:id/deactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseUserId(req.params.id);
      const user = await deactivateUser(id, req.userId!);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/api/users/:id/reactivate",
  authMiddleware,
  requireAdmin,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = parseUserId(req.params.id);
      const user = await reactivateUser(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

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
