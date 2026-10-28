-- DropForeignKey
ALTER TABLE "EquipmentLocationHistory" DROP CONSTRAINT "EquipmentLocationHistory_fromLocationId_fkey";

-- AddForeignKey
ALTER TABLE "EquipmentLocationHistory" ADD CONSTRAINT "EquipmentLocationHistory_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
