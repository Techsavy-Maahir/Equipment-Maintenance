-- AlterTable
ALTER TABLE "Department" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "EquipmentCategory" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

