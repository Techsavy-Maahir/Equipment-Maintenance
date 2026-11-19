-- CreateEnum
CREATE TYPE "NotificationKind" AS ENUM ('REMINDER', 'OVERDUE', 'ALERT');

-- AlterTable: add completion tracking to MaintenanceOccurrence
ALTER TABLE "MaintenanceOccurrence"
    ADD COLUMN "completedAt" TIMESTAMP(3),
    ADD COLUMN "completedById" INTEGER,
    ADD COLUMN "workPerformed" TEXT,
    ADD COLUMN "remarks" TEXT;

-- AlterTable: add work-order linkage for preventive work
ALTER TABLE "WorkOrder"
    ADD COLUMN "maintenanceOccurrenceId" INTEGER;

-- CreateTable: Notification
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "occurrenceId" INTEGER,
    "kind" "NotificationKind" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable: NotificationRecipient
CREATE TABLE "NotificationRecipient" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable: SchedulerRun
CREATE TABLE "SchedulerRun" (
    "id" SERIAL NOT NULL,
    "jobName" TEXT NOT NULL,
    "runDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchedulerRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_key_key"
    ON "Notification"("key");

CREATE UNIQUE INDEX "Notification_occurrenceId_kind_dueDate_key"
    ON "Notification"("occurrenceId", "kind", "dueDate");

CREATE INDEX "Notification_kind_dueDate_idx"
    ON "Notification"("kind", "dueDate");

CREATE UNIQUE INDEX "NotificationRecipient_notificationId_userId_key"
    ON "NotificationRecipient"("notificationId", "userId");

CREATE INDEX "NotificationRecipient_userId_isRead_idx"
    ON "NotificationRecipient"("userId", "isRead");

CREATE UNIQUE INDEX "SchedulerRun_jobName_runDate_key"
    ON "SchedulerRun"("jobName", "runDate");

CREATE UNIQUE INDEX "WorkOrder_maintenanceOccurrenceId_key"
    ON "WorkOrder"("maintenanceOccurrenceId");

ALTER TABLE "MaintenanceOccurrence"
    ADD CONSTRAINT "MaintenanceOccurrence_completedById_fkey"
    FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "WorkOrder"
    ADD CONSTRAINT "WorkOrder_maintenanceOccurrenceId_fkey"
    FOREIGN KEY ("maintenanceOccurrenceId") REFERENCES "MaintenanceOccurrence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Notification"
    ADD CONSTRAINT "Notification_occurrenceId_fkey"
    FOREIGN KEY ("occurrenceId") REFERENCES "MaintenanceOccurrence"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "NotificationRecipient"
    ADD CONSTRAINT "NotificationRecipient_notificationId_fkey"
    FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NotificationRecipient"
    ADD CONSTRAINT "NotificationRecipient_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
