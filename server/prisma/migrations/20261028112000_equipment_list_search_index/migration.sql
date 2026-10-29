-- AlterTable
ALTER TABLE "Equipment"
ADD COLUMN "serialNumber" TEXT;

-- CreateIndex
CREATE INDEX "Equipment_isDeactivated_status_idx"
ON "Equipment"("isDeactivated", "status");
