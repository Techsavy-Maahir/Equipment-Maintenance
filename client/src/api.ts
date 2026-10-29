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
  status: "ACTIVE" | "INACTIVE" | "UNDER_MAINTENANCE";
  criticality: "LOW" | "MEDIUM" | "HIGH";
  departmentId: number;
  locationId: number;
  categoryId: number;
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

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
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
