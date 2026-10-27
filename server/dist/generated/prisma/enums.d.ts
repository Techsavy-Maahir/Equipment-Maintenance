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
};
export type EquipmentStatus = (typeof EquipmentStatus)[keyof typeof EquipmentStatus];
export declare const Criticality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
};
export type Criticality = (typeof Criticality)[keyof typeof Criticality];
//# sourceMappingURL=enums.d.ts.map