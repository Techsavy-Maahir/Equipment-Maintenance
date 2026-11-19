-- CreateEnum
CREATE TYPE "MaintenanceFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "MaintenanceOccurrenceStatus" AS ENUM ('PENDING', 'SCHEDULED', 'COMPLETED', 'MISSED', 'CANCELLED');

-- CreateTable
CREATE TABLE "MaintenancePlan" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "instructions" TEXT,
    "frequency" "MaintenanceFrequency" NOT NULL,
    "assignedTechnicianId" INTEGER,
    "lastCompletedAt" TIMESTAMP(3),
    "nextDueDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenancePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenanceOccurrence" (
    "id" SERIAL NOT NULL,
    "maintenancePlanId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "MaintenanceOccurrenceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MaintenancePlan_equipmentId_isActive_idx"
    ON "MaintenancePlan"("equipmentId", "isActive");

-- CreateIndex
CREATE INDEX "MaintenancePlan_assignedTechnicianId_isActive_idx"
    ON "MaintenancePlan"("assignedTechnicianId", "isActive");

-- CreateIndex
CREATE INDEX "MaintenancePlan_nextDueDate_idx"
    ON "MaintenancePlan"("nextDueDate");

-- CreateIndex
CREATE INDEX "MaintenanceOccurrence_maintenancePlanId_dueDate_idx"
    ON "MaintenanceOccurrence"("maintenancePlanId", "dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceOccurrence_maintenancePlanId_dueDate_key"
    ON "MaintenanceOccurrence"("maintenancePlanId", "dueDate");

-- AddForeignKey
ALTER TABLE "MaintenancePlan"
    ADD CONSTRAINT "MaintenancePlan_equipmentId_fkey"
    FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenancePlan"
    ADD CONSTRAINT "MaintenancePlan_assignedTechnicianId_fkey"
    FOREIGN KEY ("assignedTechnicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceOccurrence"
    ADD CONSTRAINT "MaintenanceOccurrence_maintenancePlanId_fkey"
    FOREIGN KEY ("maintenancePlanId") REFERENCES "MaintenancePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
