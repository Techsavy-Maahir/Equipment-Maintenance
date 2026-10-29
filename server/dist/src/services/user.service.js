import bcrypt from "bcryptjs";
import { AppError, ConflictError, NotFoundError } from "../errors.js";
import { prisma } from "../prisma.js";
const SAFE_USER_SELECT = {
    id: true,
    email: true,
    name: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
};
export async function listUsers(query) {
    const where = {};
    if (query.search) {
        where.OR = [
            { name: { contains: query.search, mode: "insensitive" } },
            { email: { contains: query.search, mode: "insensitive" } },
        ];
    }
    if (query.role && query.role !== "ALL") {
        where.role = query.role;
    }
    if (query.status === "active") {
        where.isActive = true;
    }
    else if (query.status === "inactive") {
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
export async function createUser(input) {
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
export async function changeUserRole(targetUserId, newRole, currentAdminId) {
    const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
    });
    if (!targetUser) {
        throw new NotFoundError("User not found");
    }
    // 1. Cannot demote self away from ADMIN
    if (targetUserId === currentAdminId && newRole !== "ADMIN") {
        throw new AppError(400, "Cannot change your own role away from Administrator");
    }
    // 2. Cannot demote the last active administrator
    if (targetUser.role === "ADMIN" && newRole !== "ADMIN") {
        const activeAdminCount = await prisma.user.count({
            where: { role: "ADMIN", isActive: true },
        });
        if (activeAdminCount <= 1) {
            throw new AppError(400, "Cannot demote the only active administrator in the system");
        }
    }
    return prisma.user.update({
        where: { id: targetUserId },
        data: { role: newRole },
        select: SAFE_USER_SELECT,
    });
}
export async function deactivateUser(targetUserId, currentAdminId) {
    const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
    });
    if (!targetUser) {
        throw new NotFoundError("User not found");
    }
    if (!targetUser.isActive) {
        throw new AppError(400, "User is already deactivated");
    }
    // 1. Cannot deactivate self
    if (targetUserId === currentAdminId) {
        throw new AppError(400, "Cannot deactivate your own administrator account");
    }
    // 2. Cannot deactivate the last active administrator
    if (targetUser.role === "ADMIN") {
        const activeAdminCount = await prisma.user.count({
            where: { role: "ADMIN", isActive: true },
        });
        if (activeAdminCount <= 1) {
            throw new AppError(400, "Cannot deactivate the only active administrator in the system");
        }
    }
    return prisma.user.update({
        where: { id: targetUserId },
        data: { isActive: false },
        select: SAFE_USER_SELECT,
    });
}
export async function reactivateUser(targetUserId) {
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
//# sourceMappingURL=user.service.js.map