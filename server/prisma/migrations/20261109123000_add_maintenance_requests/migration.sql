-- CreateEnum
CREATE TYPE "MaintenanceRequestType" AS ENUM ('BREAKDOWN', 'PREVENTIVE', 'IMPROVEMENT');

-- CreateEnum
CREATE TYPE "MaintenanceRequestStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "id" SERIAL NOT NULL,
    "requestType" "MaintenanceRequestType" NOT NULL,
    "status" "MaintenanceRequestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "equipmentId" INTEGER NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "criticality" "Criticality" NOT NULL,
    "reviewerId" INTEGER,
    "decisionReason" TEXT,
    "problem" TEXT,
    "proposedSolution" TEXT,
    "expectedBenefit" TEXT,
    "outcome" TEXT,
    "implementationStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionHistory" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "previousStatus" "MaintenanceRequestStatus" NOT NULL,
    "newStatus" "MaintenanceRequestStatus" NOT NULL,
    "actorId" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DecisionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MaintenanceRequest_equipmentId_createdAt_idx" ON "MaintenanceRequest"("equipmentId", "createdAt");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_requesterId_createdAt_idx" ON "MaintenanceRequest"("requesterId", "createdAt");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_reviewerId_idx" ON "MaintenanceRequest"("reviewerId");

-- CreateIndex
CREATE INDEX "MaintenanceRequest_status_createdAt_idx" ON "MaintenanceRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "DecisionHistory_requestId_createdAt_idx" ON "DecisionHistory"("requestId", "createdAt");

-- CreateIndex
CREATE INDEX "DecisionHistory_actorId_idx" ON "DecisionHistory"("actorId");

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionHistory" ADD CONSTRAINT "DecisionHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "MaintenanceRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionHistory" ADD CONSTRAINT "DecisionHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

