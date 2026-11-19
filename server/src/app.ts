import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ZodError, type ZodType } from "zod";
import { AppError, ValidationError } from "./errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { env } from "./env.js";
import cookieParser from "cookie-parser";
import { prisma } from "./prisma.js";
import { authService } from "./services/auth.service.js";
import { getDashboardStats } from "./services/dashboard.service.js";
import {
  authMiddleware,
  requireAdmin,
  requireRole,
  AuthRequest,
} from "./middleware/auth.middleware.js";
import {
  createEquipment,
  deactivateEquipment,
  getEquipment,
  getEquipmentLocationHistory,
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
import {
  createMaintenanceRequest,
  getMaintenanceRequest,
  listMaintenanceRequests,
  transitionMaintenanceRequest,
} from "./services/request.service.js";
import {
  assignWorkOrder,
  closeWorkOrder,
  completeWorkOrder,
  listWorkOrders,
  startWorkOrder,
} from "./services/work-order.service.js";
import {
  completeMaintenanceOccurrence,
  createMaintenancePlan,
  generateDueOccurrencesForActivePlans,
  generateOccurrenceForPlan,
  getMaintenanceOccurrence,
  getMaintenancePlan,
  listMaintenanceOccurrences,
  listMaintenancePlans,
  listMaintenancePlansForEquipment,
  listOccurrencesForPlan,
  updateMaintenancePlan,
} from "./services/maintenance.service.js";
import {
  getNotificationsForUser,
  markNotificationRead,
} from "./services/notification.service.js";
import { listActiveTechnicians } from "./services/user.service.js";
import {
  createMaintenanceRequestSchema,
  maintenanceRequestIdSchema,
  maintenanceRequestListQuerySchema,
  transitionMaintenanceRequestSchema,
} from "./schemas/request.schema.js";
import {
  assignWorkOrderSchema,
  workOrderIdSchema,
  workOrderListQuerySchema,
} from "./schemas/work-order.schema.js";
import {
  completeMaintenanceOccurrenceSchema,
  createMaintenancePlanSchema,
  maintenanceOccurrenceIdSchema,
  maintenanceOccurrenceListQuerySchema,
  maintenancePlanIdSchema,
  updateMaintenancePlanSchema,
} from "./schemas/maintenance.schema.js";
import {
  createRelocationSchema,
  relocationListQuerySchema,
} from "./schemas/relocation.schema.js";
import {
  getRelocationsForEquipment,
  listRelocations,
  relocateEquipment,
} from "./services/relocation.service.js";

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

// GET /api/dashboard/stats
app.get("/api/dashboard/stats", authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user || { id: req.userId!, role: "VIEWER" };
    const stats = await getDashboardStats(user);
    res.status(200).json(stats);
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

const parseMaintenanceRequestId = (rawId: string | string[]): number => {
  const result = maintenanceRequestIdSchema.safeParse(rawId);

  if (!result.success) {
    throw new AppError(400, "Invalid maintenance request ID");
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
  authMiddleware,
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
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
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
  authMiddleware,
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
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
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
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
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

app.get(
  "/api/equipment/:id/location-history",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const history = await getEquipmentLocationHistory(
        parseEquipmentId(req.params.id),
      );
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  },
);

// ==================== RELOCATIONS ====================

app.post(
  "/api/relocations",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  validate(createRelocationSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await relocateEquipment(req.body, req.user!);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/relocations",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = relocationListQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        const details: Record<string, string> = {};
        parsedQuery.error.issues.forEach((issue) => {
          details[issue.path.join(".")] = issue.message;
        });
        throw new ValidationError(details);
      }

      const result = await listRelocations(parsedQuery.data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/equipment/:id/relocations",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const equipmentId = parseEquipmentId(req.params.id);
      const result = await getRelocationsForEquipment(equipmentId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

// ==================== WORK ORDERS ====================

app.get(
  "/api/work-orders",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsed = workOrderListQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        throw new ValidationError(parsed.error.flatten().fieldErrors);
      }

      const workOrders = await listWorkOrders(parsed.data, req.user!);
      res.status(200).json(workOrders);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/work-orders/technicians",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const technicians = await listActiveTechnicians();
      res.status(200).json(technicians);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/work-orders/:id/assign",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  validate(assignWorkOrderSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = workOrderIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid work order ID" });
      }

      const workOrder = await assignWorkOrder(
        parsedId.data,
        req.body.assignedTechnicianId,
        req.user!,
      );
      res.status(200).json(workOrder);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/work-orders/:id/start",
  authMiddleware,
  requireRole("TECHNICIAN"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = workOrderIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid work order ID" });
      }

      const workOrder = await startWorkOrder(parsedId.data, req.user!);
      res.status(200).json(workOrder);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/work-orders/:id/complete",
  authMiddleware,
  requireRole("TECHNICIAN"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = workOrderIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid work order ID" });
      }

      const workOrder = await completeWorkOrder(parsedId.data, req.user!);
      res.status(200).json(workOrder);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/work-orders/:id/close",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = workOrderIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid work order ID" });
      }

      const workOrder = await closeWorkOrder(parsedId.data, req.user!);
      res.status(200).json(workOrder);
    } catch (error) {
      next(error);
    }
  },
);

// ==================== PREVENTIVE MAINTENANCE ====================

app.get(
  "/api/equipment/:id/maintenance-plans",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const equipmentId = parseEquipmentId(req.params.id);
      const plans = await listMaintenancePlansForEquipment(equipmentId);
      res.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/maintenance-plans",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const equipmentId = req.query.equipmentId
        ? parseEquipmentId(String(req.query.equipmentId))
        : undefined;
      const plans = await listMaintenancePlans({ equipmentId });
      res.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/maintenance-plans/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenancePlanIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance plan ID" });
      }

      const plan = await getMaintenancePlan(parsedId.data);
      res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/maintenance-plans",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  validate(createMaintenancePlanSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const plan = await createMaintenancePlan(req.body, req.user!);
      res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/maintenance-plans/:id",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  validate(updateMaintenancePlanSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenancePlanIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance plan ID" });
      }

      const plan = await updateMaintenancePlan(parsedId.data, req.body, req.user!);
      res.status(200).json(plan);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/maintenance-plans/:id/occurrences",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenancePlanIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance plan ID" });
      }

      const occurrences = await listOccurrencesForPlan(parsedId.data);
      res.status(200).json(occurrences);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/maintenance-occurrences",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = maintenanceOccurrenceListQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        const details: Record<string, string> = {};
        parsedQuery.error.issues.forEach((issue) => {
          details[issue.path.join(".")] = issue.message;
        });
        throw new ValidationError(details);
      }

      const result = await listMaintenanceOccurrences(parsedQuery.data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/maintenance-occurrences/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenanceOccurrenceIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance occurrence ID" });
      }

      const occurrence = await getMaintenanceOccurrence(parsedId.data);
      res.status(200).json(occurrence);
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/maintenance-plans/:id/generate-occurrence",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenancePlanIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance plan ID" });
      }

      const result = await generateOccurrenceForPlan(parsedId.data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/maintenance-plans/generate-due-occurrences",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await generateDueOccurrencesForActivePlans();
      res.status(200).json({
        generated: result.filter((entry) => entry.created).length,
        skipped: result.filter((entry) => !entry.created).length,
      });
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/notifications",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const notifications = await getNotificationsForUser(req.user!.id);
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/notifications/:id/read",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const notificationId = Number(req.params.id);
      if (!Number.isInteger(notificationId) || notificationId <= 0) {
        throw new ValidationError({ id: "Invalid notification ID" });
      }

      const result = await markNotificationRead(notificationId, req.user!.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/audit-logs",
  authMiddleware,
  requireRole("ADMIN", "MANAGER"),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page ?? 1);
      const pageSize = Number(req.query.pageSize ?? 10);
      const search = typeof req.query.search === "string" ? req.query.search.trim() : "";

      const searchFilter = { contains: search, mode: "insensitive" as const };
      const where = search
        ? {
            OR: [
              { action: searchFilter },
              { summary: searchFilter },
              { entityType: searchFilter },
            ],
          }
        : {};

      const [total, items] = await Promise.all([
        prisma.auditLog.count({ where }),
        prisma.auditLog.findMany({
          where,
          include: {
            actor: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          skip: (page > 0 ? page - 1 : 0) * Math.max(pageSize, 1),
          take: Math.max(pageSize, 1),
        }),
      ]);

      res.status(200).json({
        items,
        total,
        page: page > 0 ? page : 1,
        pageSize: Math.max(pageSize, 1),
      });
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/maintenance-occurrences/:id/complete",
  authMiddleware,
  validate(completeMaintenanceOccurrenceSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedId = maintenanceOccurrenceIdSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        throw new ValidationError({ id: "Invalid maintenance occurrence ID" });
      }

      const result = await completeMaintenanceOccurrence(
        parsedId.data,
        req.body,
        req.user!,
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);
// ==================== MAINTENANCE REQUESTS ====================

app.get(
  "/api/requests",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = maintenanceRequestListQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        const details: Record<string, string> = {};
        parsedQuery.error.issues.forEach((issue) => {
          details[issue.path.join(".")] = issue.message;
        });
        throw new ValidationError(details);
      }

      const requests = await listMaintenanceRequests(
        parsedQuery.data,
        req.user!,
      );
      res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/requests",
  authMiddleware,
  validate(createMaintenanceRequestSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const request = await createMaintenanceRequest(req.body, req.user!);
      res.status(201).json(request);
    } catch (error) {
      next(error);
    }
  },
);

app.get(
  "/api/requests/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const request = await getMaintenanceRequest(
        parseMaintenanceRequestId(req.params.id),
        req.user!,
      );
      res.status(200).json(request);
    } catch (error) {
      next(error);
    }
  },
);

app.patch(
  "/api/requests/:id/status",
  authMiddleware,
  validate(transitionMaintenanceRequestSchema),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const request = await transitionMaintenanceRequest(
        parseMaintenanceRequestId(req.params.id),
        req.user!,
        req.body,
      );
      res.status(200).json(request);
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
  if (!(err instanceof AppError && err.statusCode === 401)) {
    console.error("Request error:", err);
  }

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
