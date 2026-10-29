import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcryptjs";

const { prismaMock } = vi.hoisted(() => {
  const userDelegates = {
    count: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  return {
    prismaMock: {
      $transaction: vi.fn(),
      user: userDelegates,
    },
  };
});

vi.mock("../src/prisma.js", () => ({
  prisma: prismaMock,
}));

import {
  changeUserRole,
  createUser,
  deactivateUser,
  listUsers,
} from "../src/services/user.service.js";
import { AppError, ConflictError } from "../src/errors.js";

beforeEach(() => {
  vi.clearAllMocks();
  prismaMock.$transaction.mockImplementation(async (callback: any) =>
    callback({
      $queryRaw: vi.fn().mockResolvedValue([]),
      user: prismaMock.user,
    })
  );
});

describe("User Management Service", () => {
  describe("createUser", () => {
    it("hashes password and does not return password_hash in response", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockImplementation(async ({ data }: any) => {
        // Assert password was hashed with bcrypt
        const matches = await bcrypt.compare("supersecret123", data.password_hash);
        expect(matches).toBe(true);

        return {
          id: 101,
          email: data.email,
          name: data.name,
          role: data.role,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      const user = await createUser({
        email: "newtech@example.com",
        name: "New Tech",
        password: "supersecret123",
        role: "TECHNICIAN",
      });

      expect(user.id).toBe(101);
      expect(user.email).toBe("newtech@example.com");
      expect((user as any).password_hash).toBeUndefined();
      expect((user as any).password).toBeUndefined();
    });

    it("rejects duplicate email upon user creation", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 5,
        email: "existing@example.com",
      });

      await expect(
        createUser({
          email: "existing@example.com",
          name: "Existing User",
          password: "password123",
          role: "VIEWER",
        })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe("changeUserRole safety checks", () => {
    it("prevents currently authenticated admin from demoting themselves away from ADMIN", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        role: "ADMIN",
        isActive: true,
      });

      // currentAdminId = 1, targetUserId = 1, newRole = "VIEWER"
      await expect(changeUserRole(1, "VIEWER", 1)).rejects.toThrow(
        /Cannot change your own role away from Administrator/
      );
    });

    it("prevents demoting the last active administrator in the system", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 2,
        role: "ADMIN",
        isActive: true,
      });
      // Only 1 active admin exists in system
      prismaMock.user.count.mockResolvedValue(1);

      // currentAdminId = 1, targetUserId = 2, newRole = "MANAGER"
      await expect(changeUserRole(2, "MANAGER", 1)).rejects.toThrow(
        /Cannot demote the only active administrator/
      );
    });

    it("allows demoting an admin when another active admin exists", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 2,
        role: "ADMIN",
        isActive: true,
      });
      // 2 active admins exist in system
      prismaMock.user.count.mockResolvedValue(2);
      prismaMock.user.update.mockResolvedValue({
        id: 2,
        email: "admin2@example.com",
        name: "Admin 2",
        role: "MANAGER",
        isActive: true,
      });

      const updated = await changeUserRole(2, "MANAGER", 1);
      expect(updated.role).toBe("MANAGER");
    });
  });

  describe("deactivateUser safety checks", () => {
    it("prevents an admin from deactivating themselves", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        role: "ADMIN",
        isActive: true,
      });

      await expect(deactivateUser(1, 1)).rejects.toThrow(
        /Cannot deactivate your own administrator account/
      );
    });

    it("prevents deactivating an already-inactive user", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 3,
        role: "VIEWER",
        isActive: false,
      });

      await expect(deactivateUser(3, 1)).rejects.toThrow(
        /User is already deactivated/
      );
    });

    it("prevents deactivating the only active administrator", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 2,
        role: "ADMIN",
        isActive: true,
      });
      prismaMock.user.count.mockResolvedValue(1);

      await expect(deactivateUser(2, 1)).rejects.toThrow(
        /Cannot deactivate the only active administrator/
      );
    });

    it("successfully deactivates user when safety checks pass", async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 4,
        role: "TECHNICIAN",
        isActive: true,
      });
      prismaMock.user.update.mockResolvedValue({
        id: 4,
        email: "tech@example.com",
        name: "Technician",
        role: "TECHNICIAN",
        isActive: false,
      });

      const deactivated = await deactivateUser(4, 1);
      expect(deactivated.isActive).toBe(false);
    });

    it("serializes concurrent admin demotion and deactivation checks", async () => {
      let activeAdmins = 2;
      let transactionQueue = Promise.resolve();
      prismaMock.user.findUnique.mockImplementation(async ({ where }: any) => ({
        id: where.id,
        role: "ADMIN",
        isActive: true,
      }));
      prismaMock.user.count.mockImplementation(async () => activeAdmins);
      prismaMock.user.update.mockImplementation(async ({ where, data }: any) => {
        if (data.role !== "ADMIN" || data.isActive === false) {
          activeAdmins -= 1;
        }
        return {
          id: where.id,
          role: data.role ?? "ADMIN",
          isActive: data.isActive ?? true,
        };
      });
      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        let releaseLock: (() => void) | undefined;
        try {
          return await callback({
            $queryRaw: vi.fn(async () => {
              const previousTransaction = transactionQueue;
              transactionQueue = new Promise<void>((resolve) => {
                releaseLock = resolve;
              });
              await previousTransaction;
              return [];
            }),
            user: prismaMock.user,
          });
        } finally {
          releaseLock?.();
        }
      });

      const outcomes = await Promise.allSettled([
        changeUserRole(2, "MANAGER", 1),
        deactivateUser(3, 1),
      ]);

      expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
      expect(outcomes.filter((outcome) => outcome.status === "rejected")).toHaveLength(1);
      expect(activeAdmins).toBe(1);
    });
  });
});
