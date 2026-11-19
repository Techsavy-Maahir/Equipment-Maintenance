export declare function getNotificationsForUser(userId: number): Promise<{
    items: {
        id: any;
        key: any;
        kind: any;
        dueDate: any;
        title: any;
        message: any;
        createdAt: any;
        occurrenceId: any;
        isRead: any;
        readAt: any;
        occurrence: any;
        recipientId: any;
    }[];
    unreadCount: number;
}>;
export declare function markNotificationRead(notificationId: number, userId: number): Promise<{
    userId: number;
    id: number;
    createdAt: Date;
    notificationId: number;
    isRead: boolean;
    readAt: Date | null;
}>;
export declare function isPendingMigrationError(error: unknown): boolean;
export declare function runReminderJob(): Promise<{
    status: "COMPLETED";
    run: {
        id: number;
        createdAt: Date;
        jobName: string;
        runDate: Date;
    };
    created: number;
    recipients: number;
} | {
    status: "PAUSED_MIGRATION_PENDING";
    run: null;
    created: number;
    recipients: number;
}>;
//# sourceMappingURL=notification.service.d.ts.map