import { NotFoundError } from "../errors.js";
import { prisma } from "../prisma.js";
export async function getNotificationsForUser(userId) {
    try {
        const items = await prisma.notificationRecipient.findMany({
            where: { userId },
            select: {
                id: true,
                isRead: true,
                readAt: true,
                notificationId: true,
                notification: {
                    select: {
                        id: true,
                        key: true,
                        kind: true,
                        dueDate: true,
                        title: true,
                        message: true,
                        createdAt: true,
                        occurrenceId: true,
                        occurrence: {
                            select: {
                                id: true,
                                dueDate: true,
                                status: true,
                                maintenancePlan: {
                                    select: {
                                        id: true,
                                        activity: true,
                                        equipment: {
                                            select: {
                                                id: true,
                                                code: true,
                                                name: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: [{ notification: { createdAt: "desc" } }, { id: "desc" }],
        });
        return {
            items: items.map((item) => ({
                id: item.notification.id,
                key: item.notification.key,
                kind: item.notification.kind,
                dueDate: item.notification.dueDate,
                title: item.notification.title,
                message: item.notification.message,
                createdAt: item.notification.createdAt,
                occurrenceId: item.notification.occurrenceId,
                isRead: item.isRead,
                readAt: item.readAt,
                occurrence: item.notification.occurrence,
                recipientId: item.id,
            })),
            unreadCount: items.filter((item) => !item.isRead).length,
        };
    }
    catch (error) {
        if (isPendingMigrationError(error)) {
            return { items: [], unreadCount: 0 };
        }
        throw error;
    }
}
export async function markNotificationRead(notificationId, userId) {
    try {
        const recipient = await prisma.notificationRecipient.findFirst({
            where: { notificationId, userId },
        });
        if (!recipient) {
            throw new NotFoundError("Notification not found for this user");
        }
        if (recipient.isRead) {
            return recipient;
        }
        return prisma.notificationRecipient.update({
            where: { id: recipient.id },
            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }
    catch (error) {
        if (isPendingMigrationError(error)) {
            throw new NotFoundError("Notification database setup is pending until M7 is applied");
        }
        throw error;
    }
}
const PENDING_MIGRATION_TABLES = new Set([
    "schedulerrun",
    "maintenanceoccurrence",
    "maintenanceplan",
    "notification",
    "notificationrecipient",
]);
export function isPendingMigrationError(error) {
    if (!error || typeof error !== "object") {
        return false;
    }
    const err = error;
    if (err.code !== "P2021") {
        return false;
    }
    // 1. Check meta.table
    const rawTable = err.meta?.table;
    if (typeof rawTable === "string") {
        const normalized = rawTable
            .replace(/^public\./i, "")
            .replace(/["`]/g, "")
            .trim()
            .toLowerCase();
        if (PENDING_MIGRATION_TABLES.has(normalized)) {
            return true;
        }
    }
    // 2. Check meta.modelName
    const rawModel = err.meta?.modelName;
    if (typeof rawModel === "string") {
        const normalized = rawModel.replace(/["`]/g, "").trim().toLowerCase();
        if (PENDING_MIGRATION_TABLES.has(normalized)) {
            return true;
        }
    }
    // 3. Fall back to inspecting message
    const msg = err.message || "";
    for (const table of PENDING_MIGRATION_TABLES) {
        const regex = new RegExp(`table\\s+[\`"]?(?:public\\.)?${table}[\`"]?\\s+does not exist`, "i");
        if (regex.test(msg)) {
            return true;
        }
    }
    return false;
}
export async function runReminderJob() {
    try {
        return await prisma.$transaction(async (tx) => {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const windowEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
            const runStamp = await tx.schedulerRun.upsert({
                where: {
                    jobName_runDate: {
                        jobName: "maintenance-reminder",
                        runDate: startOfDay,
                    },
                },
                create: {
                    jobName: "maintenance-reminder",
                    runDate: startOfDay,
                },
                update: {},
            });
            const occurrences = await tx.maintenanceOccurrence.findMany({
                where: {
                    status: { notIn: ["COMPLETED", "CANCELLED"] },
                    dueDate: {
                        lte: windowEnd,
                    },
                    maintenancePlan: {
                        isActive: true,
                        equipment: {
                            isDeactivated: false,
                        },
                    },
                },
                include: {
                    maintenancePlan: {
                        select: {
                            id: true,
                            activity: true,
                            assignedTechnicianId: true,
                            equipment: {
                                select: {
                                    id: true,
                                    code: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            const users = await tx.user.findMany({
                where: { role: { in: ["ADMIN", "MANAGER"] }, isActive: true },
                select: { id: true },
            });
            const notificationRows = [];
            const recipientRows = [];
            for (const occurrence of occurrences) {
                const dueIn = Math.max(0, Math.ceil((occurrence.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
                const kind = dueIn <= 0 ? "OVERDUE" : dueIn <= 7 ? "REMINDER" : "ALERT";
                const notificationKey = `maintenance:${occurrence.id}:${kind}:${occurrence.dueDate.toISOString()}`;
                notificationRows.push({
                    key: notificationKey,
                    occurrenceId: occurrence.id,
                    kind,
                    dueDate: occurrence.dueDate,
                    title: `Maintenance due: ${occurrence.maintenancePlan.equipment.name}`,
                    message: `${occurrence.maintenancePlan.activity} is due for ${occurrence.maintenancePlan.equipment.code} ${dueIn <= 0 ? "overdue" : `in ${dueIn} day${dueIn === 1 ? "" : "s"}`}.`,
                });
            }
            if (notificationRows.length === 0) {
                return { status: "COMPLETED", run: runStamp, created: 0, recipients: 0 };
            }
            const createdNotifications = await Promise.all(notificationRows.map(async (notification) => {
                return tx.notification.upsert({
                    where: { key: notification.key },
                    create: {
                        key: notification.key,
                        occurrenceId: notification.occurrenceId,
                        kind: notification.kind,
                        dueDate: notification.dueDate,
                        title: notification.title,
                        message: notification.message,
                    },
                    update: {},
                });
            }));
            for (const notification of createdNotifications) {
                const recipients = new Set();
                if (notification.occurrenceId) {
                    const occurrence = await tx.maintenanceOccurrence.findUnique({
                        where: { id: notification.occurrenceId },
                        select: {
                            maintenancePlan: {
                                select: { assignedTechnicianId: true },
                            },
                        },
                    });
                    if (occurrence?.maintenancePlan.assignedTechnicianId) {
                        recipients.add(occurrence.maintenancePlan.assignedTechnicianId);
                    }
                }
                for (const user of users) {
                    recipients.add(user.id);
                }
                for (const userId of recipients) {
                    recipientRows.push({ notificationId: notification.id, userId });
                }
            }
            if (recipientRows.length > 0) {
                await tx.notificationRecipient.createMany({
                    data: recipientRows,
                    skipDuplicates: true,
                });
            }
            return {
                status: "COMPLETED",
                run: runStamp,
                created: createdNotifications.length,
                recipients: recipientRows.length,
            };
        });
    }
    catch (error) {
        if (isPendingMigrationError(error)) {
            return {
                status: "PAUSED_MIGRATION_PENDING",
                run: null,
                created: 0,
                recipients: 0,
            };
        }
        throw error;
    }
}
//# sourceMappingURL=notification.service.js.map