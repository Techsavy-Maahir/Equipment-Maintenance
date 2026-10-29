import { AppError } from "../errors.js";
import { prisma } from "../prisma.js";
const equipmentInclude = {
    department: true,
    location: true,
    category: true,
};
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
        const items = await tx.equipment.findMany({
            where,
            include: equipmentInclude,
            orderBy: { id: "asc" },
            skip: (page - 1) * query.pageSize,
            take: query.pageSize,
        });
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
    return equipment;
}
export async function createEquipment(input) {
    return prisma.equipment.create({
        data: {
            ...input,
            description: input.description ?? null,
        },
        include: equipmentInclude,
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
//# sourceMappingURL=equipment.service.js.map