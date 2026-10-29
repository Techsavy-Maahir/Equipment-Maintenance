import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import { env } from "../src/env.js";

const userService = vi.hoisted(() => ({
  listUsers: vi.fn(),
  createUser: vi.fn(),
  changeUserRole: vi.fn(),
  deactivateUser: vi.fn(),
  reactivateUser: vi.fn(),
}));

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
}));

vi.mock("../src/services/user.service.js", () => userService);
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

describe("User Management API Authorization and Operations", () => {
  describe("Security & Role-based Access Control", () => {
    it("rejects unauthenticated requests to list users with 401", async () => {
      const response = await fetch(`${baseUrl}/api/users`);
      expect(response.status).toBe(401);
    });

    it("rejects non-admin users with 403 Forbidden", async () => {
      const response = await fetch(`${baseUrl}/api/users`, {
        headers: { Cookie: `token=${viewerToken}` },
      });
      expect(response.status).toBe(403);
      expect(userService.listUsers).not.toHaveBeenCalled();
    });

    it("allows admin user to list users", async () => {
      userService.listUsers.mockResolvedValue({
        items: [
          {
            id: 1,
            email: "admin@example.com",
            name: "Admin",
            role: "ADMIN",
            isActive: true,
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
      });

      const response = await fetch(`${baseUrl}/api/users`, {
        headers: { Cookie: `token=${adminToken}` },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.items[0].email).toBe("admin@example.com");
    });
  });

  describe("Create User", () => {
    it("rejects invalid role in create user request", async () => {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${adminToken}`,
        },
        body: JSON.stringify({
          email: "test@example.com",
          name: "Test",
          password: "password123",
          role: "SUPERUSER", // Invalid role!
        }),
      });

      expect(response.status).toBe(400);
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it("creates user when input is valid and passes admin check", async () => {
      const newUser = {
        id: 10,
        email: "tech@example.com",
        name: "Tech Person",
        role: "TECHNICIAN",
        isActive: true,
      };
      userService.createUser.mockResolvedValue(newUser);

      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${adminToken}`,
        },
        body: JSON.stringify({
          email: "tech@example.com",
          name: "Tech Person",
          password: "password123",
          role: "TECHNICIAN",
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data.email).toBe("tech@example.com");
      expect(data.password_hash).toBeUndefined();
    });
  });

  describe("Role Change and Deactivation", () => {
    it("allows admin to change another user's role", async () => {
      userService.changeUserRole.mockResolvedValue({
        id: 5,
        email: "carlos@example.com",
        name: "Carlos",
        role: "MANAGER",
        isActive: true,
      });

      const response = await fetch(`${baseUrl}/api/users/5/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${adminToken}`,
        },
        body: JSON.stringify({ role: "MANAGER" }),
      });

      expect(response.status).toBe(200);
      expect(userService.changeUserRole).toHaveBeenCalledWith(5, "MANAGER", 1);
    });

    it("allows admin to deactivate a user", async () => {
      userService.deactivateUser.mockResolvedValue({
        id: 5,
        email: "carlos@example.com",
        name: "Carlos",
        role: "VIEWER",
        isActive: false,
      });

      const response = await fetch(`${baseUrl}/api/users/5`, {
        method: "DELETE",
        headers: { Cookie: `token=${adminToken}` },
      });

      expect(response.status).toBe(200);
      expect(userService.deactivateUser).toHaveBeenCalledWith(5, 1);
    });
  });
});

