-- AlterTable
ALTER TABLE "Equipment"
ADD COLUMN "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "deactivatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "EquipmentLocationHistory" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "fromLocationId" INTEGER,
    "toLocationId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentLocationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EquipmentLocationHistory_equipmentId_changedAt_idx"
ON "EquipmentLocationHistory"("equipmentId", "changedAt");

-- CreateIndex
CREATE INDEX "EquipmentLocationHistory_fromLocationId_idx"
ON "EquipmentLocationHistory"("fromLocationId");

-- CreateIndex
CREATE INDEX "EquipmentLocationHistory_toLocationId_idx"
ON "EquipmentLocationHistory"("toLocationId");

-- AddForeignKey
ALTER TABLE "EquipmentLocationHistory"
ADD CONSTRAINT "EquipmentLocationHistory_equipmentId_fkey"
FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentLocationHistory"
ADD CONSTRAINT "EquipmentLocationHistory_fromLocationId_fkey"
FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentLocationHistory"
ADD CONSTRAINT "EquipmentLocationHistory_toLocationId_fkey"
FOREIGN KEY ("toLocationId") REFERENCES "Location"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
