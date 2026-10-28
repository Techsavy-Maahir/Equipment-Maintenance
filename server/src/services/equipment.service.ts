import type { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "../errors.js";
import { prisma } from "../prisma.js";
import type {
  CreateEquipmentInput,
  UpdateEquipmentInput,
} from "../schemas/equipment.schema.js";

const equipmentInclude = {
  department: true,
  location: true,
  category: true,
} as const;

export async function listEquipment() {
  return prisma.equipment.findMany({
    where: { isDeactivated: false },
    include: equipmentInclude,
    orderBy: { id: "asc" },
  });
}

export async function getEquipment(id: number) {
  const equipment = await prisma.equipment.findUnique({
    where: { id },
    include: equipmentInclude,
  });

  if (!equipment) {
    throw new AppError(404, "Equipment not found");
  }

  return equipment;
}

export async function createEquipment(input: CreateEquipmentInput) {
  return prisma.equipment.create({
    data: {
      ...input,
      description: input.description ?? null,
    },
    include: equipmentInclude,
  });
}

async function changeEquipmentLocation(
  tx: Prisma.TransactionClient,
  equipmentId: number,
  newLocationId: number,
) {
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

export async function updateEquipment(
  id: number,
  input: UpdateEquipmentInput,
) {
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

export async function deactivateEquipment(id: number) {
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
