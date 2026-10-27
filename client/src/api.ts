import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export interface Equipment {
  id: number;
  code: string;
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

export interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER";
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const api = {
  async getEquipment(): Promise<Equipment[]> {
    const response = await apiClient.get<Equipment[]>("/equipment");
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