import { runReminderJob, isPendingMigrationError } from "../services/notification.service.js";
const REMINDER_INTERVAL_MS = 60 * 60 * 1000;
let timerHandle = null;
export function resetReminderJobStateForTests() {
    globalThis.__immsReminderJobStarted = undefined;
    globalThis.__immsReminderPendingMigrationLogged = undefined;
    if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
    }
}
export async function executeReminderJobTick() {
    try {
        const result = await runReminderJob();
        if (result && typeof result === "object" && "status" in result && result.status === "PAUSED_MIGRATION_PENDING") {
            if (!globalThis.__immsReminderPendingMigrationLogged) {
                console.warn("[ReminderScheduler] Reminder job paused: required tables (SchedulerRun / Notification) are not yet migrated. Waiting for M6/M7 database migration.");
                globalThis.__immsReminderPendingMigrationLogged = true;
            }
            return { executed: false, pausedReason: "MIGRATION_PENDING" };
        }
        if (globalThis.__immsReminderPendingMigrationLogged) {
            console.log("[ReminderScheduler] Database migration detected. Reminder job resumed successfully.");
            globalThis.__immsReminderPendingMigrationLogged = false;
        }
        return { executed: true };
    }
    catch (error) {
        if (isPendingMigrationError(error)) {
            if (!globalThis.__immsReminderPendingMigrationLogged) {
                console.warn("[ReminderScheduler] Reminder job paused: required tables are not yet migrated. Waiting for M6/M7 database migration.");
                globalThis.__immsReminderPendingMigrationLogged = true;
            }
            return { executed: false, pausedReason: "MIGRATION_PENDING" };
        }
        console.error("[ReminderScheduler] Unexpected failure during reminder job:", error);
        throw error;
    }
}
export function startReminderJob(intervalMs = REMINDER_INTERVAL_MS) {
    if (globalThis.__immsReminderJobStarted) {
        return;
    }
    globalThis.__immsReminderJobStarted = true;
    // Execute initial startup tick without unhandled promise rejection
    void executeReminderJobTick().catch(() => { });
    if (!timerHandle) {
        timerHandle = setInterval(() => {
            void executeReminderJobTick().catch(() => { });
        }, intervalMs);
        if (timerHandle.unref) {
            timerHandle.unref();
        }
    }
}
export function stopReminderJob() {
    if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
    }
    globalThis.__immsReminderJobStarted = undefined;
}
//# sourceMappingURL=reminderJob.js.map