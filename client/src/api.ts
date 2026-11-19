import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export interface Equipment {
  id: number;
  code: string;
  serialNumber: string | null;
  name: string;
  description: string | null;
  status: "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE" | "BREAKDOWN";
  criticality: "LOW" | "MEDIUM" | "HIGH";
  departmentId: number;
  locationId: number;
  categoryId: number;
  purchaseDate?: string | null;
  purchaseCost?: number | string | null;
  warrantyStartDate?: string | null;
  warrantyExpiryDate?: string | null;
  warrantyStatus?: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_RECORDED";
  createdAt: string;
  updatedAt: string;
  department: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}

export interface EquipmentFilters {
  search?: string;
  status?: Equipment["status"] | "";
  location?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface EquipmentListResponse {
  items: Equipment[];
  total: number;
  page: number;
  pageSize: number;
  locations: Array<{ id: number; name: string }>;
  categories: Array<{ id: number; name: string }>;
}

export interface EquipmentLocationHistory {
  id: number;
  equipmentId: number;
  fromLocationId: number | null;
  toLocationId: number;
  changedAt: string;
  fromLocation: { id: number; name: string } | null;
  toLocation: { id: number; name: string };
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER";
}

export interface ManagedUser {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: "all" | "active" | "inactive";
  page?: number;
  pageSize?: number;
}

export interface UserListResponse {
  items: ManagedUser[];
  total: number;
  page: number;
  pageSize: number;
}

export interface MasterDataItem {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    equipment: number;
  };
}

export interface MasterDataFilters {
  search?: string;
  status?: "all" | "active" | "inactive";
  page?: number;
  pageSize?: number;
}

export interface MasterDataListResponse {
  items: MasterDataItem[];
  total: number;
  page: number;
  pageSize: number;
}

// ─── Maintenance Requests ────────────────────────────────────────────────────

export type MaintenanceRequestType = "BREAKDOWN" | "PREVENTIVE" | "IMPROVEMENT";
export type MaintenanceRequestStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";


export interface MaintenanceRequestHistoryEntry {
  id: number;
  requestId: number;
  previousStatus: MaintenanceRequestStatus;
  newStatus: MaintenanceRequestStatus;
  actorId: number | null;
  comment: string | null;
  createdAt: string;
  actor: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

export interface MaintenanceRequest {
  id: number;
  requestType: MaintenanceRequestType;
  status: MaintenanceRequestStatus;
  equipmentId: number;
  requesterId: number;
  description: string;
  criticality: "LOW" | "MEDIUM" | "HIGH";
  reviewerId: number | null;
  decisionReason: string | null;
  problem: string | null;
  proposedSolution: string | null;
  expectedBenefit: string | null;
  outcome: string | null;
  implementationStatus: string | null;
  createdAt: string;
  updatedAt: string;
  equipment: {
    id: number;
    code: string;
    name: string;
    isDeactivated: boolean;
  } | null;
  requester: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  reviewer: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  decisionHistory?: MaintenanceRequestHistoryEntry[];
}

export interface MaintenanceRequestListResponse {
  items: MaintenanceRequest[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AuditLogItem {
  id: number;
  actorId: number | null;
  action: string;
  entityType: string;
  entityId: number;
  summary: string;
  createdAt: string;
  actor: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

export interface AuditLogListResponse {
  items: AuditLogItem[];
  total: number;
  page: number;
  pageSize: number;
}

export type MaintenanceFrequency =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "HALF_YEARLY"
  | "YEARLY";

export interface MaintenancePlan {
  id: number;
  equipmentId: number;
  activity: string;
  instructions: string | null;
  frequency: MaintenanceFrequency;
  assignedTechnicianId: number | null;
  lastCompletedAt: string | null;
  nextDueDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  equipment: {
    id: number;
    code: string;
    name: string;
    status: string;
    isDeactivated: boolean;
  } | null;
  assignedTechnician: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

export type MaintenanceOccurrenceStatus =
  | "PENDING"
  | "SCHEDULED"
  | "COMPLETED"
  | "MISSED"
  | "CANCELLED";

export interface MaintenanceOccurrence {
  id: number;
  maintenancePlanId: number;
  dueDate: string;
  status: MaintenanceOccurrenceStatus;
  displayStatus?: "COMPLETED" | "CANCELLED" | "MISSED" | "OVERDUE" | "DUE" | "UPCOMING";
  completedAt: string | null;
  completedById: number | null;
  workPerformed: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  maintenancePlan?: MaintenancePlan;
  completedBy?: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  linkedWorkOrder?: Array<{
    id: number;
    workOrderNumber: string;
    status: string;
  }>;
}

export interface MaintenanceOccurrenceListResponse {
  items: MaintenanceOccurrence[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RelocationRecord {
  id: number;
  equipmentId: number;
  equipment: {
    id: number;
    code: string;
    name: string;
  };
  fromLocationId: number | null;
  fromLocation: {
    id: number;
    name: string;
  } | null;
  toLocationId: number;
  toLocation: {
    id: number;
    name: string;
  };
  reason: string;
  relocatedAt: string;
  relocatedBy: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

export interface RelocationListResponse {
  items: RelocationRecord[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MaintenanceRequestFilters {
  requestType?: MaintenanceRequestType | "";
  status?: MaintenanceRequestStatus | "";
  equipmentId?: number;
  page?: number;
  pageSize?: number;
}

export type NotificationKind = "REMINDER" | "OVERDUE" | "ALERT";

export interface NotificationItem {
  id: number;
  key: string;
  kind: NotificationKind;
  dueDate: string;
  title: string;
  message: string;
  createdAt: string;
  occurrenceId: number | null;
  isRead: boolean;
  readAt: string | null;
  recipientId: number;
  occurrence: {
    id: number;
    dueDate: string;
    status: string;
    maintenancePlan: {
      id: number;
      activity: string;
      equipment: {
        id: number;
        code: string;
        name: string;
      } | null;
    } | null;
  } | null;
}

export interface NotificationsResponse {
  items: NotificationItem[];
  unreadCount: number;
}

export interface CreateMaintenanceRequestInput {
  requestType: MaintenanceRequestType;
  equipmentId: number;
  description: string;
  criticality: "LOW" | "MEDIUM" | "HIGH";
  problem?: string;
  proposedSolution?: string;
  expectedBenefit?: string;
  implementationStatus?: string;
}

export interface TransitionMaintenanceRequestInput {
  status: MaintenanceRequestStatus;
  comment?: string | null;
  outcome?: string | null;
  implementationStatus?: string | null;
}

// ─── Generic API response ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export type WorkOrderStatus = "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "CLOSED";

export interface WorkOrderTechnician {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface WorkOrder {
  id: number;
  workOrderNumber: string;
  maintenanceRequestId: number;
  equipmentId: number;
  status: WorkOrderStatus;
  assignedTechnicianId: number | null;
  assignedById: number | null;
  assignedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  equipment: {
    id: number;
    code: string;
    name: string;
    status: string;
    criticality: string;
  };
  maintenanceRequest: {
    id: number;
    requestType: string;
    status: string;
    criticality: string;
    description: string;
    createdAt: string;
  };
  assignedTechnician: WorkOrderTechnician | null;
  assignedBy: WorkOrderTechnician | null;
}

export interface WorkOrderFilters {
  status?: WorkOrderStatus;
  search?: string;
  equipmentId?: number;
  page?: number;
  pageSize?: number;
}

export interface WorkOrderListResponse {
  items: WorkOrder[];
  total: number;
  page: number;
  pageSize: number;
}
export const api = {
  async getEquipment(
    filters: EquipmentFilters = {},
  ): Promise<EquipmentListResponse> {
    const response = await apiClient.get<EquipmentListResponse>(
      "/equipment",
      {
        params: {
          search: filters.search || undefined,
          status: filters.status || undefined,
          location: filters.location || undefined,
          category: filters.category || undefined,
          page: filters.page ?? 1,
          pageSize: filters.pageSize ?? 8,
        },
      },
    );
    return response.data;
  },

  async getEquipmentById(id: number): Promise<Equipment> {
    const response = await apiClient.get<Equipment>(`/equipment/${id}`);
    return response.data;
  },

  async getEquipmentLocationHistory(
    id: number,
  ): Promise<EquipmentLocationHistory[]> {
    const response = await apiClient.get<EquipmentLocationHistory[]>(
      `/equipment/${id}/location-history`,
    );
    return response.data;
  },

  async deactivateEquipment(id: number): Promise<Equipment> {
    const response = await apiClient.delete<Equipment>(`/equipment/${id}`);
    return response.data;
  },

  async createEquipment(data: {
    code: string;
    name: string;
    description?: string | null;
    serialNumber?: string | null;
    criticality: "LOW" | "MEDIUM" | "HIGH";
    departmentId: number;
    locationId: number;
    categoryId: number;
    status?: "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE";
    purchaseDate?: string | null;
    purchaseCost?: number | null;
    warrantyStartDate?: string | null;
    warrantyExpiryDate?: string | null;
  }): Promise<Equipment> {
    const response = await apiClient.post<Equipment>("/equipment", data);
    return response.data;
  },

  async updateEquipment(
    id: number,
    data: {
      code?: string;
      name?: string;
      description?: string | null;
      serialNumber?: string | null;
      criticality?: "LOW" | "MEDIUM" | "HIGH";
      departmentId?: number;
      locationId?: number;
      categoryId?: number;
      status?: "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE";
      purchaseDate?: string | null;
      purchaseCost?: number | null;
      warrantyStartDate?: string | null;
      warrantyExpiryDate?: string | null;
    },
  ): Promise<Equipment> {
    const response = await apiClient.put<Equipment>(`/equipment/${id}`, data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/me");
    return response.data;
  },

  async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post<User>("/login", { email, password });
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/logout");
  },

  // Master Data: Departments
  async getDepartments(filters: MasterDataFilters = {}): Promise<MasterDataListResponse> {
    const response = await apiClient.get<MasterDataListResponse>("/departments", {
      params: {
        search: filters.search || undefined,
        status: filters.status || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 8,
      },
    });
    return response.data;
  },

  async createDepartment(data: { name: string }): Promise<MasterDataItem> {
    const response = await apiClient.post<MasterDataItem>("/departments", data);
    return response.data;
  },

  async updateDepartment(id: number, data: { name?: string; isActive?: boolean }): Promise<MasterDataItem> {
    const response = await apiClient.put<MasterDataItem>(`/departments/${id}`, data);
    return response.data;
  },

  async deactivateDepartment(id: number): Promise<MasterDataItem> {
    const response = await apiClient.delete<MasterDataItem>(`/departments/${id}`);
    return response.data;
  },

  async reactivateDepartment(id: number): Promise<MasterDataItem> {
    const response = await apiClient.patch<MasterDataItem>(`/departments/${id}/reactivate`);
    return response.data;
  },

  // Master Data: Locations
  async getLocations(filters: MasterDataFilters = {}): Promise<MasterDataListResponse> {
    const response = await apiClient.get<MasterDataListResponse>("/locations", {
      params: {
        search: filters.search || undefined,
        status: filters.status || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 8,
      },
    });
    return response.data;
  },

  async createLocation(data: { name: string }): Promise<MasterDataItem> {
    const response = await apiClient.post<MasterDataItem>("/locations", data);
    return response.data;
  },

  async updateLocation(id: number, data: { name?: string; isActive?: boolean }): Promise<MasterDataItem> {
    const response = await apiClient.put<MasterDataItem>(`/locations/${id}`, data);
    return response.data;
  },

  async deactivateLocation(id: number): Promise<MasterDataItem> {
    const response = await apiClient.delete<MasterDataItem>(`/locations/${id}`);
    return response.data;
  },

  async reactivateLocation(id: number): Promise<MasterDataItem> {
    const response = await apiClient.patch<MasterDataItem>(`/locations/${id}/reactivate`);
    return response.data;
  },

  // Master Data: Categories
  async getCategories(filters: MasterDataFilters = {}): Promise<MasterDataListResponse> {
    const response = await apiClient.get<MasterDataListResponse>("/categories", {
      params: {
        search: filters.search || undefined,
        status: filters.status || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 8,
      },
    });
    return response.data;
  },

  async createCategory(data: { name: string }): Promise<MasterDataItem> {
    const response = await apiClient.post<MasterDataItem>("/categories", data);
    return response.data;
  },

  async updateCategory(id: number, data: { name?: string; isActive?: boolean }): Promise<MasterDataItem> {
    const response = await apiClient.put<MasterDataItem>(`/categories/${id}`, data);
    return response.data;
  },

  async deactivateCategory(id: number): Promise<MasterDataItem> {
    const response = await apiClient.delete<MasterDataItem>(`/categories/${id}`);
    return response.data;
  },

  async reactivateCategory(id: number): Promise<MasterDataItem> {
    const response = await apiClient.patch<MasterDataItem>(`/categories/${id}/reactivate`);
    return response.data;
  },

  // User Management
  async getUsers(filters: UserFilters = {}): Promise<UserListResponse> {
    const response = await apiClient.get<UserListResponse>("/users", {
      params: {
        search: filters.search || undefined,
        role: filters.role && filters.role !== "ALL" ? filters.role : undefined,
        status: filters.status || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async createUser(data: { email: string; name: string; password: string; role: string }): Promise<ManagedUser> {
    const response = await apiClient.post<ManagedUser>("/users", data);
    return response.data;
  },

  async updateUserRole(id: number, role: string): Promise<ManagedUser> {
    const response = await apiClient.patch<ManagedUser>(`/users/${id}/role`, { role });
    return response.data;
  },

  async deactivateUser(id: number): Promise<ManagedUser> {
    const response = await apiClient.delete<ManagedUser>(`/users/${id}`);
    return response.data;
  },

  async reactivateUser(id: number): Promise<ManagedUser> {
    const response = await apiClient.patch<ManagedUser>(`/users/${id}/reactivate`);
    return response.data;
  },

  // Maintenance Requests
  // Work Orders
  async listWorkOrders(filters: WorkOrderFilters = {}): Promise<WorkOrderListResponse> {
    const response = await apiClient.get<WorkOrderListResponse>("/work-orders", {
      params: {
        status: filters.status || undefined,
        search: filters.search || undefined,
        equipmentId: filters.equipmentId || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async getWorkOrderTechnicians(): Promise<WorkOrderTechnician[]> {
    const response = await apiClient.get<WorkOrderTechnician[]>("/work-orders/technicians");
    return response.data;
  },

  async assignWorkOrder(id: number, assignedTechnicianId: number): Promise<WorkOrder> {
    const response = await apiClient.patch<WorkOrder>(`/work-orders/${id}/assign`, {
      assignedTechnicianId,
    });
    return response.data;
  },

  async startWorkOrder(id: number): Promise<WorkOrder> {
    const response = await apiClient.patch<WorkOrder>(`/work-orders/${id}/start`);
    return response.data;
  },

  async completeWorkOrder(id: number): Promise<WorkOrder> {
    const response = await apiClient.patch<WorkOrder>(`/work-orders/${id}/complete`);
    return response.data;
  },

  async closeWorkOrder(id: number): Promise<WorkOrder> {
    const response = await apiClient.patch<WorkOrder>(`/work-orders/${id}/close`);
    return response.data;
  },

   async listMaintenancePlans(filters: { equipmentId?: number; isActive?: boolean } = {}): Promise<MaintenancePlan[]> {
    const response = await apiClient.get<MaintenancePlan[]>("/maintenance-plans", {
      params: {
        equipmentId: filters.equipmentId ?? undefined,
        isActive: filters.isActive ?? undefined,
      },
    });
    return response.data;
  },

  async generateDueOccurrences(): Promise<{ generated: number; skipped: number }> {
    const response = await apiClient.post<{ generated: number; skipped: number }>(
      "/maintenance-plans/generate-due-occurrences",
    );
    return response.data;
  },

  async getAuditLogs(filters: { page?: number; pageSize?: number; search?: string } = {}): Promise<AuditLogListResponse> {
    const response = await apiClient.get<AuditLogListResponse>("/audit-logs", {
      params: {
        search: filters.search || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async getNotifications(): Promise<NotificationsResponse> {
    const response = await apiClient.get<NotificationsResponse>("/notifications");
    return response.data;
  },

  async markNotificationRead(id: number): Promise<{ id: number; isRead: boolean; readAt: string | null }> {
    const response = await apiClient.post<{ id: number; isRead: boolean; readAt: string | null }>(`/notifications/${id}/read`);
    return response.data;
  },

  async completeMaintenanceOccurrence(
    id: number,
    data: { completedAt?: string; workPerformed?: string; remarks?: string } = {},
  ): Promise<{ occurrence: MaintenanceOccurrence; plan: MaintenancePlan; createdNextOccurrence: boolean }> {
    const response = await apiClient.post<{ occurrence: MaintenanceOccurrence; plan: MaintenancePlan; createdNextOccurrence: boolean }>(
      `/maintenance-occurrences/${id}/complete`,
      data,
    );
    return response.data;
  },

  async listMaintenanceOccurrences(filters: {
    maintenancePlanId?: number;
    planId?: number;
    equipmentId?: number;
    status?: string;
    page?: number;
    pageSize?: number;
  } = {}): Promise<MaintenanceOccurrenceListResponse> {
    const response = await apiClient.get<MaintenanceOccurrenceListResponse>("/maintenance-occurrences", {
      params: {
        maintenancePlanId: filters.maintenancePlanId ?? filters.planId ?? undefined,
        equipmentId: filters.equipmentId ?? undefined,
        status: filters.status || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async getMaintenancePlanOccurrences(planId: number): Promise<MaintenanceOccurrence[]> {
    const response = await apiClient.get<MaintenanceOccurrence[]>(`/maintenance-plans/${planId}/occurrences`);
    return response.data;
  },

  async createRelocation(data: {
    equipmentId: number;
    toLocationId: number;
    reason: string;
  }): Promise<RelocationRecord> {
    const response = await apiClient.post<RelocationRecord>("/relocations", data);
    return response.data;
  },

  async listRelocations(filters: {
    equipmentId?: number;
    search?: string;
    page?: number;
    pageSize?: number;
  } = {}): Promise<RelocationListResponse> {
    const response = await apiClient.get<RelocationListResponse>("/relocations", {
      params: {
        equipmentId: filters.equipmentId ?? undefined,
        search: filters.search || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async getEquipmentRelocations(equipmentId: number): Promise<RelocationRecord[]> {
    const response = await apiClient.get<RelocationRecord[]>(`/equipment/${equipmentId}/relocations`);
    return response.data;
  },

  async getMaintenancePlan(id: number): Promise<MaintenancePlan> {
    const response = await apiClient.get<MaintenancePlan>(`/maintenance-plans/${id}`);
    return response.data;
  },

  async listMaintenancePlansByEquipment(equipmentId: number): Promise<MaintenancePlan[]> {
    const response = await apiClient.get<MaintenancePlan[]>(`/equipment/${equipmentId}/maintenance-plans`);
    return response.data;
  },

  async createMaintenancePlan(data: {
    equipmentId: number;
    activity: string;
    instructions?: string;
    frequency: MaintenanceFrequency;
    assignedTechnicianId?: number | null;
    nextDueDate?: string;
    isActive?: boolean;
  }): Promise<MaintenancePlan> {
    const response = await apiClient.post<MaintenancePlan>("/maintenance-plans", data);
    return response.data;
  },

  async updateMaintenancePlan(id: number, data: Partial<{
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    nextDueDate: string;
    isActive: boolean;
  }>): Promise<MaintenancePlan> {
    const response = await apiClient.patch<MaintenancePlan>(`/maintenance-plans/${id}`, data);
    return response.data;
  },

  async listMaintenanceRequests(
    filters: MaintenanceRequestFilters = {},
  ): Promise<MaintenanceRequestListResponse> {
    const response = await apiClient.get<MaintenanceRequestListResponse>("/requests", {
      params: {
        requestType: filters.requestType || undefined,
        status: filters.status || undefined,
        equipmentId: filters.equipmentId || undefined,
        page: filters.page ?? 1,
        pageSize: filters.pageSize ?? 10,
      },
    });
    return response.data;
  },

  async getMaintenanceRequest(id: number): Promise<MaintenanceRequest> {
    const response = await apiClient.get<MaintenanceRequest>(`/requests/${id}`);
    return response.data;
  },

  async createMaintenanceRequest(
    data: CreateMaintenanceRequestInput,
  ): Promise<MaintenanceRequest> {
    const response = await apiClient.post<MaintenanceRequest>("/requests", data);
    return response.data;
  },

  async transitionMaintenanceRequest(
    id: number,
    data: TransitionMaintenanceRequestInput,
  ): Promise<MaintenanceRequest> {
    const response = await apiClient.patch<MaintenanceRequest>(`/requests/${id}/status`, data);
    return response.data;
  },

  async getDashboardStats(): Promise<{
    kpis: {
      totalEquipment: number;
      operationalEquipment: number;
      operationalPercentage: number;
      activeBreakdowns: number;
      openWorkOrders: number;
      inProgressWorkOrders: number;
      overduePm: number;
      downtimeThisMonthHours: number;
    };
    monthlyVolume: Array<{
      month: string;
      breakdown: number;
      preventive: number;
      kaizen: number;
      relocation: number;
    }>;
    upcomingPm: Array<{
      id: number;
      equipmentCode: string;
      equipmentName: string;
      activity: string;
      dueDate: string;
      status: string;
      assignedTechnicianName: string | null;
    }>;
    recentWorkOrders: Array<{
      id: number;
      workOrderNumber: string;
      equipmentCode: string;
      equipmentName: string;
      assignedTechnicianName: string | null;
      priority: string;
      status: string;
      dueDate: string | null;
    }>;
  }> {
    const response = await apiClient.get("/dashboard/stats");
    return response.data;
  },

  async generateDueOccurrences(): Promise<{ generated: number; skipped: number }> {
    const response = await apiClient.post<{ generated: number; skipped: number }>("/maintenance-plans/generate-due-occurrences");
    return response.data;
  },
};

export const isUnauthorizedError = (error: unknown): boolean =>
  error instanceof AxiosError && error.response?.status === 401;

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || "An error occurred";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
