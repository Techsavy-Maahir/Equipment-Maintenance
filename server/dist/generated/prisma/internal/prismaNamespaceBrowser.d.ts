import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull;
    JsonNull: new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull;
    AnyNull: new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull;
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#5@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#6@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#4@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Department: "Department";
    readonly Location: "Location";
    readonly EquipmentCategory: "EquipmentCategory";
    readonly Equipment: "Equipment";
    readonly EquipmentLocationHistory: "EquipmentLocationHistory";
    readonly AuditLog: "AuditLog";
    readonly MaintenanceRequest: "MaintenanceRequest";
    readonly DecisionHistory: "DecisionHistory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly password_hash: "password_hash";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const EquipmentCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EquipmentCategoryScalarFieldEnum = (typeof EquipmentCategoryScalarFieldEnum)[keyof typeof EquipmentCategoryScalarFieldEnum];
export declare const EquipmentScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly serialNumber: "serialNumber";
    readonly purchaseDate: "purchaseDate";
    readonly purchaseCost: "purchaseCost";
    readonly warrantyStartDate: "warrantyStartDate";
    readonly warrantyExpiryDate: "warrantyExpiryDate";
    readonly name: "name";
    readonly description: "description";
    readonly status: "status";
    readonly criticality: "criticality";
    readonly departmentId: "departmentId";
    readonly locationId: "locationId";
    readonly categoryId: "categoryId";
    readonly isDeactivated: "isDeactivated";
    readonly deactivatedAt: "deactivatedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EquipmentScalarFieldEnum = (typeof EquipmentScalarFieldEnum)[keyof typeof EquipmentScalarFieldEnum];
export declare const EquipmentLocationHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly equipmentId: "equipmentId";
    readonly fromLocationId: "fromLocationId";
    readonly toLocationId: "toLocationId";
    readonly changedAt: "changedAt";
};
export type EquipmentLocationHistoryScalarFieldEnum = (typeof EquipmentLocationHistoryScalarFieldEnum)[keyof typeof EquipmentLocationHistoryScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly summary: "summary";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const MaintenanceRequestScalarFieldEnum: {
    readonly id: "id";
    readonly requestType: "requestType";
    readonly status: "status";
    readonly equipmentId: "equipmentId";
    readonly requesterId: "requesterId";
    readonly description: "description";
    readonly criticality: "criticality";
    readonly reviewerId: "reviewerId";
    readonly decisionReason: "decisionReason";
    readonly problem: "problem";
    readonly proposedSolution: "proposedSolution";
    readonly expectedBenefit: "expectedBenefit";
    readonly outcome: "outcome";
    readonly implementationStatus: "implementationStatus";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MaintenanceRequestScalarFieldEnum = (typeof MaintenanceRequestScalarFieldEnum)[keyof typeof MaintenanceRequestScalarFieldEnum];
export declare const DecisionHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly requestId: "requestId";
    readonly previousStatus: "previousStatus";
    readonly newStatus: "newStatus";
    readonly actorId: "actorId";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
};
export type DecisionHistoryScalarFieldEnum = (typeof DecisionHistoryScalarFieldEnum)[keyof typeof DecisionHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map