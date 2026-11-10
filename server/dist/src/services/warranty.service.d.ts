export type WarrantyStatus = "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_RECORDED";
export declare function getWarrantyStatus(warrantyExpiryDate: Date | null | undefined, today?: Date): WarrantyStatus;
//# sourceMappingURL=warranty.service.d.ts.map