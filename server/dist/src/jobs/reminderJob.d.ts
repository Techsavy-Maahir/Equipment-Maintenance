declare global {
    var __immsReminderJobStarted: boolean | undefined;
    var __immsReminderPendingMigrationLogged: boolean | undefined;
}
export declare function resetReminderJobStateForTests(): void;
export declare function executeReminderJobTick(): Promise<{
    executed: boolean;
    pausedReason?: string;
}>;
export declare function startReminderJob(intervalMs?: number): void;
export declare function stopReminderJob(): void;
//# sourceMappingURL=reminderJob.d.ts.map