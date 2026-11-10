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
//# sourceMappingURL=enums.d.ts.map