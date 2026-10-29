import type { Prisma } from "../../generated/prisma/client.js";
import { AppError, ConflictError, NotFoundError } from "../errors.js";
import { prisma } from "../prisma.js";
import type {
  CreateMasterDataInput,
  MasterDataQuery,
  UpdateMasterDataInput,
} from "../schemas/master-data.schema.js";

// Helper to construct filter conditions
function buildWhereClause(query: MasterDataQuery) {
  const where: {
    name?: { contains: string; mode: Prisma.QueryMode };
    isActive?: boolean;
  } = {};

  if (query.search) {
    where.name = { contains: query.search, mode: "insensitive" };
  }

  if (query.status === "active") {
    where.isActive = true;
  } else if (query.status === "inactive") {
    where.isActive = false;
  }

  return where;
}

// ==================== DEPARTMENTS ====================

export async function listDepartments(query: MasterDataQuery) {
  const where = buildWhereClause(query);
  const total = await prisma.department.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, pageCount);

  const items = await prisma.department.findMany({
    where,
    include: {
      _count: {
        select: { equipment: true },
      },
    },
    orderBy: { id: "asc" },
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  });

  return { items, total, page, pageSize: query.pageSize };
}

export async function createDepartment(input: CreateMasterDataInput) {
  const existing = await prisma.department.findFirst({
    where: { name: { equals: input.name, mode: "insensitive" } },
  });

  if (existing) {
    throw new ConflictError(`Department '${input.name}' already exists`);
  }

  return prisma.department.create({
    data: {
      name: input.name,
      isActive: true,
    },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function updateDepartment(id: number, input: UpdateMasterDataInput) {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new NotFoundError("Department not found");
  }

  if (input.name && input.name.toLowerCase() !== department.name.toLowerCase()) {
    const existing = await prisma.department.findFirst({
      where: {
        name: { equals: input.name, mode: "insensitive" },
        NOT: { id },
      },
    });
    if (existing) {
      throw new ConflictError(`Department '${input.name}' already exists`);
    }
  }

  return prisma.department.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function deactivateDepartment(id: number) {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new NotFoundError("Department not found");
  }

  if (!department.isActive) {
    throw new AppError(400, "Department is already inactive");
  }

  return prisma.department.update({
    where: { id },
    data: { isActive: false },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function reactivateDepartment(id: number) {
  const department = await prisma.department.findUnique({ where: { id } });
  if (!department) {
    throw new NotFoundError("Department not found");
  }

  return prisma.department.update({
    where: { id },
    data: { isActive: true },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

// ==================== LOCATIONS ====================

export async function listLocations(query: MasterDataQuery) {
  const where = buildWhereClause(query);
  const total = await prisma.location.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, pageCount);

  const items = await prisma.location.findMany({
    where,
    include: {
      _count: {
        select: { equipment: true },
      },
    },
    orderBy: { id: "asc" },
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  });

  return { items, total, page, pageSize: query.pageSize };
}

export async function createLocation(input: CreateMasterDataInput) {
  const existing = await prisma.location.findFirst({
    where: { name: { equals: input.name, mode: "insensitive" } },
  });

  if (existing) {
    throw new ConflictError(`Location '${input.name}' already exists`);
  }

  return prisma.location.create({
    data: {
      name: input.name,
      isActive: true,
    },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function updateLocation(id: number, input: UpdateMasterDataInput) {
  return prisma.$transaction(async (tx) => {
    const location = await tx.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundError("Location not found");
    }

    if (input.name && input.name.toLowerCase() !== location.name.toLowerCase()) {
      const existing = await tx.location.findFirst({
        where: {
          name: { equals: input.name, mode: "insensitive" },
          NOT: { id },
        },
      });
      if (existing) {
        throw new ConflictError(`Location '${input.name}' already exists`);
      }
    }

    if (input.isActive === false && location.isActive) {
      await assertLocationCanBeDeactivated(tx, id, location.name);
    }

    return tx.location.update({
      where: { id },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
      },
      include: {
        _count: {
          select: { equipment: true },
        },
      },
    });
  });
}

async function assertLocationCanBeDeactivated(
  tx: Prisma.TransactionClient,
  id: number,
  locationName: string
) {
  const assignedEquipmentCount = await tx.equipment.count({
    where: { locationId: id },
  });
  if (assignedEquipmentCount > 0) {
    throw new ConflictError(
      `Cannot deactivate location '${locationName}': ${assignedEquipmentCount} equipment item(s) are currently assigned to it.`
    );
  }

  const historyCount = await tx.equipmentLocationHistory.count({
    where: { toLocationId: id },
  });
  if (historyCount > 0) {
    throw new ConflictError(
      `Cannot deactivate location '${locationName}': location is referenced as a destination in relocation history.`
    );
  }
}

/**
 * Deactivates a location with strict safety validation:
 * 1. Rejected with 409 Conflict if equipment is currently assigned to this location.
 * 2. Rejected with 409 Conflict if relocation history references this location as destination (toLocationId).
 * 3. Never hard-deletes; sets isActive = false.
 */
export async function deactivateLocation(id: number) {
  return prisma.$transaction(async (tx) => {
    const location = await tx.location.findUnique({ where: { id } });
    if (!location) {
      throw new NotFoundError("Location not found");
    }

    if (!location.isActive) {
      throw new AppError(400, "Location is already inactive");
    }

    await assertLocationCanBeDeactivated(tx, id, location.name);

    // 3. Neither restriction applies: safely soft deactivate
    return tx.location.update({
      where: { id },
      data: { isActive: false },
      include: {
        _count: {
          select: { equipment: true },
        },
      },
    });
  });
}

export async function reactivateLocation(id: number) {
  const location = await prisma.location.findUnique({ where: { id } });
  if (!location) {
    throw new NotFoundError("Location not found");
  }

  return prisma.location.update({
    where: { id },
    data: { isActive: true },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

// ==================== EQUIPMENT CATEGORIES ====================

export async function listCategories(query: MasterDataQuery) {
  const where = buildWhereClause(query);
  const total = await prisma.equipmentCategory.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
  const page = Math.min(query.page, pageCount);

  const items = await prisma.equipmentCategory.findMany({
    where,
    include: {
      _count: {
        select: { equipment: true },
      },
    },
    orderBy: { id: "asc" },
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  });

  return { items, total, page, pageSize: query.pageSize };
}

export async function createCategory(input: CreateMasterDataInput) {
  const existing = await prisma.equipmentCategory.findFirst({
    where: { name: { equals: input.name, mode: "insensitive" } },
  });

  if (existing) {
    throw new ConflictError(`Equipment category '${input.name}' already exists`);
  }

  return prisma.equipmentCategory.create({
    data: {
      name: input.name,
      isActive: true,
    },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function updateCategory(id: number, input: UpdateMasterDataInput) {
  const category = await prisma.equipmentCategory.findUnique({ where: { id } });
  if (!category) {
    throw new NotFoundError("Equipment category not found");
  }

  if (input.name && input.name.toLowerCase() !== category.name.toLowerCase()) {
    const existing = await prisma.equipmentCategory.findFirst({
      where: {
        name: { equals: input.name, mode: "insensitive" },
        NOT: { id },
      },
    });
    if (existing) {
      throw new ConflictError(`Equipment category '${input.name}' already exists`);
    }
  }

  return prisma.equipmentCategory.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
    },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function deactivateCategory(id: number) {
  const category = await prisma.equipmentCategory.findUnique({ where: { id } });
  if (!category) {
    throw new NotFoundError("Equipment category not found");
  }

  if (!category.isActive) {
    throw new AppError(400, "Equipment category is already inactive");
  }

  return prisma.equipmentCategory.update({
    where: { id },
    data: { isActive: false },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}

export async function reactivateCategory(id: number) {
  const category = await prisma.equipmentCategory.findUnique({ where: { id } });
  if (!category) {
    throw new NotFoundError("Equipment category not found");
  }

  return prisma.equipmentCategory.update({
    where: { id },
    data: { isActive: true },
    include: {
      _count: {
        select: { equipment: true },
      },
    },
  });
}
