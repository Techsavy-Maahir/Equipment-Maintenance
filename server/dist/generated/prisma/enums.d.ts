export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly TECHNICIAN: "TECHNICIAN";
    readonly VIEWER: "VIEWER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const EquipmentStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly UNDER_MAINTENANCE: "UNDER_MAINTENANCE";
    readonly BREAKDOWN: "BREAKDOWN";
};
export type EquipmentStatus = (typeof EquipmentStatus)[keyof typeof EquipmentStatus];
export declare const Criticality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type Criticality = (typeof Criticality)[keyof typeof Criticality];
export declare const MaintenanceRequestType: {
    readonly BREAKDOWN: "BREAKDOWN";
    readonly PREVENTIVE: "PREVENTIVE";
    readonly IMPROVEMENT: "IMPROVEMENT";
};
export type MaintenanceRequestType = (typeof MaintenanceRequestType)[keyof typeof MaintenanceRequestType];
export declare const NotificationKind: {
    readonly REMINDER: "REMINDER";
    readonly OVERDUE: "OVERDUE";
    readonly ALERT: "ALERT";
};
export type NotificationKind = (typeof NotificationKind)[keyof typeof NotificationKind];
export declare const MaintenanceFrequency: {
    readonly DAILY: "DAILY";
    readonly WEEKLY: "WEEKLY";
    readonly MONTHLY: "MONTHLY";
    readonly QUARTERLY: "QUARTERLY";
    readonly HALF_YEARLY: "HALF_YEARLY";
    readonly YEARLY: "YEARLY";
};
export type MaintenanceFrequency = (typeof MaintenanceFrequency)[keyof typeof MaintenanceFrequency];
export declare const MaintenanceOccurrenceStatus: {
    readonly PENDING: "PENDING";
    readonly SCHEDULED: "SCHEDULED";
    readonly COMPLETED: "COMPLETED";
    readonly MISSED: "MISSED";
    readonly CANCELLED: "CANCELLED";
};
export type MaintenanceOccurrenceStatus = (typeof MaintenanceOccurrenceStatus)[keyof typeof MaintenanceOccurrenceStatus];
export declare const MaintenanceRequestStatus: {
    readonly SUBMITTED: "SUBMITTED";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type MaintenanceRequestStatus = (typeof MaintenanceRequestStatus)[keyof typeof MaintenanceRequestStatus];
export declare const WorkOrderStatus: {
    readonly OPEN: "OPEN";
    readonly ASSIGNED: "ASSIGNED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CLOSED: "CLOSED";
};
export type WorkOrderStatus = (typeof WorkOrderStatus)[keyof typeof WorkOrderStatus];
//# sourceMappingURL=enums.d.ts.map