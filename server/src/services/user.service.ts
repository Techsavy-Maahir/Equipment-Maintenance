import bcrypt from "bcryptjs";
import { Prisma, type Role } from "../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundError } from "../errors.js";
import { prisma } from "../prisma.js";
import type { CreateUserInput, UserListQuery } from "../schemas/user.schema.js";

const SAFE_USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function acquireActiveAdminSafetyLock(tx: Prisma.TransactionClient) {
  // Serialize administrator demotions/deactivations across database transactions.
  await tx.$queryRaw(Prisma.sql`SELECT pg_advisory_xact_lock(9104202810)`);
}

export async function listUsers(query: UserListQuery) {
  const where: Prisma.UserWhereInput = {};

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { email: { contains: query.search, mode: "insensitive" } },
    ];
  }

  if (query.role && query.role !== "ALL") {
    where.role = query.role as Role;
  }

  if (query.status === "active") {
    where.isActive = true;
  } else if (query.status === "inactive") {
    where.isActive = false;
  }

  const total = await prisma.user.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, pageCount);

  const items = await prisma.user.findMany({
    where,
    select: SAFE_USER_SELECT,
    orderBy: { id: "asc" },
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  });

  return { items, total, page, pageSize: query.pageSize };
}

export async function createUser(input: CreateUserInput) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (existing) {
    throw new ConflictError("User with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: input.email.toLowerCase(),
      name: input.name,
      password_hash: passwordHash,
      role: input.role,
      isActive: true,
    },
    select: SAFE_USER_SELECT,
  });

  return newUser;
}

export async function changeUserRole(
  targetUserId: number,
  newRole: Role,
  currentAdminId: number
) {
  return prisma.$transaction(async (tx) => {
    await acquireActiveAdminSafetyLock(tx);

    const targetUser = await tx.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new NotFoundError("User not found");
    }

    if (targetUserId === currentAdminId && newRole !== "ADMIN") {
      throw new AppError(400, "Cannot change your own role away from Administrator");
    }

    if (targetUser.role === "ADMIN" && newRole !== "ADMIN") {
      const activeAdminCount = await tx.user.count({
        where: { role: "ADMIN", isActive: true },
      });
      if (activeAdminCount <= 1) {
        throw new AppError(400, "Cannot demote the only active administrator in the system");
      }
    }

    return tx.user.update({
      where: { id: targetUserId },
      data: { role: newRole },
      select: SAFE_USER_SELECT,
    });
  });
}

export async function deactivateUser(
  targetUserId: number,
  currentAdminId: number
) {
  return prisma.$transaction(async (tx) => {
    await acquireActiveAdminSafetyLock(tx);

    const targetUser = await tx.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new NotFoundError("User not found");
    }

    if (!targetUser.isActive) {
      throw new AppError(400, "User is already deactivated");
    }

    if (targetUserId === currentAdminId) {
      throw new AppError(400, "Cannot deactivate your own administrator account");
    }

    if (targetUser.role === "ADMIN") {
      const activeAdminCount = await tx.user.count({
        where: { role: "ADMIN", isActive: true },
      });
      if (activeAdminCount <= 1) {
        throw new AppError(400, "Cannot deactivate the only active administrator in the system");
      }
    }

    return tx.user.update({
      where: { id: targetUserId },
      data: { isActive: false },
      select: SAFE_USER_SELECT,
    });
  });
}

export async function reactivateUser(targetUserId: number) {
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
  });

  if (!targetUser) {
    throw new NotFoundError("User not found");
  }

  return prisma.user.update({
    where: { id: targetUserId },
    data: { isActive: true },
    select: SAFE_USER_SELECT,
  });
}
