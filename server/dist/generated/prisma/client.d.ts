import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Department
 *
 */
export type Department = Prisma.DepartmentModel;
/**
 * Model Location
 *
 */
export type Location = Prisma.LocationModel;
/**
 * Model EquipmentCategory
 *
 */
export type EquipmentCategory = Prisma.EquipmentCategoryModel;
/**
 * Model Equipment
 *
 */
export type Equipment = Prisma.EquipmentModel;
/**
 * Model EquipmentLocationHistory
 *
 */
export type EquipmentLocationHistory = Prisma.EquipmentLocationHistoryModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
/**
 * Model MaintenanceRequest
 *
 */
export type MaintenanceRequest = Prisma.MaintenanceRequestModel;
/**
 * Model DecisionHistory
 *
 */
export type DecisionHistory = Prisma.DecisionHistoryModel;
/**
 * Model WorkOrder
 *
 */
export type WorkOrder = Prisma.WorkOrderModel;
/**
 * Model MaintenancePlan
 *
 */
export type MaintenancePlan = Prisma.MaintenancePlanModel;
/**
 * Model MaintenanceOccurrence
 *
 */
export type MaintenanceOccurrence = Prisma.MaintenanceOccurrenceModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model NotificationRecipient
 *
 */
export type NotificationRecipient = Prisma.NotificationRecipientModel;
/**
 * Model SchedulerRun
 *
 */
export type SchedulerRun = Prisma.SchedulerRunModel;
/**
 * Model WorkOrderNumberCounter
 *
 */
export type WorkOrderNumberCounter = Prisma.WorkOrderNumberCounterModel;
//# sourceMappingURL=client.d.ts.map