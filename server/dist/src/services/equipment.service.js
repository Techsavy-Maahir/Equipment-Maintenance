import { AppError, ValidationError } from "../errors.js";
import { prisma } from "../prisma.js";
import { getWarrantyStatus } from "./warranty.service.js";
const equipmentInclude = {
    department: true,
    location: true,
    category: true,
};
function validateCombinedWarrantyDates(warrantyStartDate, warrantyExpiryDate) {
    if (warrantyStartDate &&
        warrantyExpiryDate &&
        warrantyExpiryDate <= warrantyStartDate) {
        throw new ValidationError({
            warrantyExpiryDate: "Warranty expiry must be after warranty start date",
        });
    }
}
async function validateEquipmentReferences(tx, references) {
    const details = {};
    if (references.departmentId !== undefined) {
        const department = await tx.department.findUnique({
            where: { id: references.departmentId },
            select: { isActive: true },
        });
        if (!department || !department.isActive) {
            details.departmentId = "Department does not exist or is inactive";
        }
    }
    if (references.locationId !== undefined) {
        const location = await tx.location.findUnique({
            where: { id: references.locationId },
            select: { isActive: true },
        });
        if (!location || !location.isActive) {
            details.locationId = "Location does not exist or is inactive";
        }
    }
    if (references.categoryId !== undefined) {
        const category = await tx.equipmentCategory.findUnique({
            where: { id: references.categoryId },
            select: { isActive: true },
        });
        if (!category || !category.isActive) {
            details.categoryId =
                "Equipment category does not exist or is inactive";
        }
    }
    if (Object.keys(details).length > 0) {
        throw new ValidationError(details);
    }
}
export async function listEquipment(query) {
    const where = {
        isDeactivated: false,
        ...(query.status ? { status: query.status } : {}),
        ...(query.location ? { locationId: query.location } : {}),
        ...(query.category ? { categoryId: query.category } : {}),
        ...(query.search
            ? {
                OR: [
                    { code: { contains: query.search, mode: "insensitive" } },
                    { name: { contains: query.search, mode: "insensitive" } },
                    { serialNumber: { contains: query.search, mode: "insensitive" } },
                ],
            }
            : {}),
    };
    return prisma.$transaction(async (tx) => {
        const [total, locations, categories] = await Promise.all([
            tx.equipment.count({ where }),
            tx.location.findMany({
                select: { id: true, name: true },
                orderBy: { name: "asc" },
            }),
            tx.equipmentCategory.findMany({
                select: { id: true, name: true },
                orderBy: { name: "asc" },
            }),
        ]);
        const pageCount = Math.max(1, Math.ceil(total / query.pageSize));
        const page = Math.min(query.page, pageCount);
        const rawItems = await tx.equipment.findMany({
            where,
            include: equipmentInclude,
            orderBy: { id: "asc" },
            skip: (page - 1) * query.pageSize,
            take: query.pageSize,
        });
        const items = rawItems.map((item) => ({
            ...item,
            warrantyStatus: getWarrantyStatus(item.warrantyExpiryDate),
        }));
        return { items, total, page, pageSize: query.pageSize, locations, categories };
    });
}
export async function getEquipment(id) {
    const equipment = await prisma.equipment.findUnique({
        where: { id },
        include: equipmentInclude,
    });
    if (!equipment) {
        throw new AppError(404, "Equipment not found");
    }
    return {
        ...equipment,
        warrantyStatus: getWarrantyStatus(equipment.warrantyExpiryDate),
    };
}
export async function createEquipment(input) {
    return prisma.$transaction(async (tx) => {
        await validateEquipmentReferences(tx, {
            departmentId: input.departmentId,
            locationId: input.locationId,
            categoryId: input.categoryId,
        });
        return tx.equipment.create({
            data: {
                ...input,
                description: input.description ?? null,
            },
            include: equipmentInclude,
        });
    });
}
async function changeEquipmentLocation(tx, equipmentId, newLocationId) {
    const current = await tx.equipment.findUnique({
        where: { id: equipmentId },
        select: {
            locationId: true,
            isDeactivated: true,
        },
    });
    if (!current || current.isDeactivated) {
        throw new AppError(404, "Active equipment not found");
    }
    if (current.locationId === newLocationId) {
        return;
    }
    await tx.equipment.update({
        where: { id: equipmentId },
        data: { locationId: newLocationId },
    });
    await tx.equipmentLocationHistory.create({
        data: {
            equipmentId,
            fromLocationId: current.locationId,
            toLocationId: newLocationId,
        },
    });
}
export async function updateEquipment(id, input) {
    return prisma.$transaction(async (tx) => {
        const current = await tx.equipment.findUnique({
            where: { id },
        });
        if (!current || current.isDeactivated) {
            throw new AppError(404, "Active equipment not found");
        }
        // Validate combined existing and incoming warranty dates
        validateCombinedWarrantyDates(input.warrantyStartDate !== undefined
            ? input.warrantyStartDate
            : current.warrantyStartDate, input.warrantyExpiryDate !== undefined
            ? input.warrantyExpiryDate
            : current.warrantyExpiryDate);
        await validateEquipmentReferences(tx, {
            departmentId: input.departmentId,
            locationId: input.locationId,
            categoryId: input.categoryId,
        });
        const { locationId, ...otherFields } = input;
        if (Object.keys(otherFields).length > 0) {
            await tx.equipment.update({
                where: { id },
                data: otherFields,
            });
        }
        if (locationId !== undefined && locationId !== current.locationId) {
            await changeEquipmentLocation(tx, id, locationId);
        }
        return tx.equipment.findUniqueOrThrow({
            where: { id },
            include: equipmentInclude,
        });
    });
}
export async function deactivateEquipment(id) {
    return prisma.$transaction(async (tx) => {
        const current = await tx.equipment.findUnique({
            where: { id },
        });
        if (!current) {
            throw new AppError(404, "Equipment not found");
        }
        if (current.isDeactivated) {
            return current;
        }
        return tx.equipment.update({
            where: { id },
            data: {
                isDeactivated: true,
                deactivatedAt: new Date(),
            },
            include: equipmentInclude,
        });
    });
}
/**
 * Retrieves the location history for a specific equipment.
 * Returns records in reverse chronological order (newest first).
 * Throws AppError(404) if the equipment does not exist.
 */
export async function getEquipmentLocationHistory(equipmentId) {
    const equipment = await prisma.equipment.findUnique({
        where: { id: equipmentId },
        select: { id: true },
    });
    if (!equipment) {
        throw new AppError(404, "Equipment not found");
    }
    return prisma.equipmentLocationHistory.findMany({
        where: { equipmentId },
        include: {
            fromLocation: {
                select: { id: true, name: true },
            },
            toLocation: {
                select: { id: true, name: true },
            },
        },
        orderBy: [
            { changedAt: "desc" },
            { id: "desc" },
        ],
    });
}
//# sourceMappingURL=equipment.service.js.map