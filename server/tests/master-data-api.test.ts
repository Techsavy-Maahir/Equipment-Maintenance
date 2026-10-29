import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import { env } from "../src/env.js";
import { ConflictError } from "../src/errors.js";

const masterDataService = vi.hoisted(() => ({
  listDepartments: vi.fn(),
  createDepartment: vi.fn(),
  updateDepartment: vi.fn(),
  deactivateDepartment: vi.fn(),
  reactivateDepartment: vi.fn(),
  listLocations: vi.fn(),
  createLocation: vi.fn(),
  updateLocation: vi.fn(),
  deactivateLocation: vi.fn(),
  reactivateLocation: vi.fn(),
  listCategories: vi.fn(),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  deactivateCategory: vi.fn(),
  reactivateCategory: vi.fn(),
}));

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
}));

vi.mock("../src/services/master-data.service.js", () => masterDataService);
vi.mock("../src/prisma.js", () => ({
  prisma: prismaMock,
}));

let server: ReturnType<typeof app.listen>;
let baseUrl: string;

const adminToken = jwt.sign(
  { userId: 1, email: "admin@example.com", role: "ADMIN" },
  env.JWT_SECRET
);

const viewerToken = jwt.sign(
  { userId: 2, email: "viewer@example.com", role: "VIEWER" },
  env.JWT_SECRET
);

beforeAll(async () => {
  server = app.listen(0);
  await new Promise<void>((resolve) => server.once("listening", resolve));

  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not determine test server address");
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

beforeEach(() => {
  vi.clearAllMocks();
  // Default user lookup mock for authMiddleware
  prismaMock.user.findUnique.mockImplementation(async ({ where }: any) => {
    if (where.id === 1) {
      return { id: 1, email: "admin@example.com", name: "Admin", role: "ADMIN", isActive: true };
    }
    if (where.id === 2) {
      return { id: 2, email: "viewer@example.com", name: "Viewer", role: "VIEWER", isActive: true };
    }
    return null;
  });
});

describe("Master Data API Authorization and Endpoints", () => {
  describe("Authentication & Authorization", () => {
    it("rejects unauthenticated requests with 401", async () => {
      const response = await fetch(`${baseUrl}/api/departments`);
      expect(response.status).toBe(401);
    });

    it("allows authenticated non-admin to read master data", async () => {
      masterDataService.listDepartments.mockResolvedValue({
        items: [{ id: 1, name: "Production", isActive: true, _count: { equipment: 4 } }],
        total: 1,
        page: 1,
        pageSize: 8,
      });

      const response = await fetch(`${baseUrl}/api/departments`, {
        headers: { Cookie: `token=${viewerToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.items[0].name).toBe("Production");
    });

    it("rejects non-admin mutation attempts with 403 Forbidden", async () => {
      const response = await fetch(`${baseUrl}/api/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${viewerToken}`,
        },
        body: JSON.stringify({ name: "New Department" }),
      });

      expect(response.status).toBe(403);
      expect(masterDataService.createDepartment).not.toHaveBeenCalled();
    });

    it("allows admin to create a department", async () => {
      masterDataService.createDepartment.mockResolvedValue({
        id: 10,
        name: "New Department",
        isActive: true,
        _count: { equipment: 0 },
      });

      const response = await fetch(`${baseUrl}/api/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${adminToken}`,
        },
        body: JSON.stringify({ name: "New Department" }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.name).toBe("New Department");
    });
  });

  describe("Location deactivation endpoints", () => {
    const requests = [
      {
        method: "PUT",
        path: "/api/locations/1",
        body: { isActive: false },
        service: "updateLocation",
      },
      {
        method: "DELETE",
        path: "/api/locations/1",
        service: "deactivateLocation",
      },
      {
        method: "PATCH",
        path: "/api/locations/1/deactivate",
        service: "deactivateLocation",
      },
    ] as const;

    it.each(requests)("returns 409 when $method $path is blocked", async (request) => {
      const error = new ConflictError("Location is assigned or referenced by history");
      masterDataService[request.service].mockRejectedValue(error);

      const response = await fetch(`${baseUrl}${request.path}`, {
        method: request.method,
        headers: {
          ...(request.body ? { "Content-Type": "application/json" } : {}),
          Cookie: `token=${adminToken}`,
        },
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });

      expect(response.status).toBe(409);
      expect((await response.json()).message).toBe(error.message);
      expect(masterDataService[request.service]).toHaveBeenCalled();
    });

    it.each(requests)("allows safe deactivation through $method $path", async (request) => {
      masterDataService[request.service].mockResolvedValue({
        id: 1,
        name: "Clear Area",
        isActive: false,
        _count: { equipment: 0 },
      });

      const response = await fetch(`${baseUrl}${request.path}`, {
        method: request.method,
        headers: {
          ...(request.body ? { "Content-Type": "application/json" } : {}),
          Cookie: `token=${adminToken}`,
        },
        ...(request.body ? { body: JSON.stringify(request.body) } : {}),
      });

      expect(response.status).toBe(200);
      expect((await response.json()).isActive).toBe(false);
    });
  });

  describe("Validation", () => {
    it("rejects empty name in create", async () => {
      const response = await fetch(`${baseUrl}/api/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${adminToken}`,
        },
        body: JSON.stringify({ name: "   " }),
      });

      expect(response.status).toBe(400);
      expect(masterDataService.createDepartment).not.toHaveBeenCalled();
    });

    it("rejects invalid id in deactivate", async () => {
      const response = await fetch(`${baseUrl}/api/locations/abc`, {
        method: "DELETE",
        headers: { Cookie: `token=${adminToken}` },
      });

      expect(response.status).toBe(400);
      expect(masterDataService.deactivateLocation).not.toHaveBeenCalled();
    });
  });
});
