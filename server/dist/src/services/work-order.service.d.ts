import { type Role, type WorkOrderStatus } from "../../generated/prisma/client.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { WorkOrderListQuery } from "../schemas/work-order.schema.js";
export declare const workOrderScalarSelect: {
    readonly id: true;
    readonly workOrderNumber: true;
    readonly maintenanceRequestId: true;
    readonly equipmentId: true;
    readonly status: true;
    readonly assignedTechnicianId: true;
    readonly assignedById: true;
    readonly assignedAt: true;
    readonly startedAt: true;
    readonly completedAt: true;
    readonly closedAt: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export declare const workOrderReadSelect: {
    readonly equipment: {
        readonly select: {
            readonly id: true;
            readonly code: true;
            readonly name: true;
            readonly status: true;
            readonly criticality: true;
        };
    };
    readonly maintenanceRequest: {
        readonly select: {
            readonly id: true;
            readonly requestType: true;
            readonly status: true;
            readonly criticality: true;
            readonly description: true;
            readonly createdAt: true;
        };
    };
    readonly assignedTechnician: {
        readonly select: {
            readonly id: true;
            readonly name: true;
            readonly email: true;
            readonly role: true;
        };
    };
    readonly assignedBy: {
        readonly select: {
            readonly id: true;
            readonly name: true;
            readonly email: true;
            readonly role: true;
        };
    };
    readonly id: true;
    readonly workOrderNumber: true;
    readonly maintenanceRequestId: true;
    readonly equipmentId: true;
    readonly status: true;
    readonly assignedTechnicianId: true;
    readonly assignedById: true;
    readonly assignedAt: true;
    readonly startedAt: true;
    readonly completedAt: true;
    readonly closedAt: true;
    readonly createdAt: true;
    readonly updatedAt: true;
};
export declare function hasWorkOrderMaintenanceOccurrenceSupport(): Promise<boolean>;
export declare function listWorkOrders(query: WorkOrderListQuery, user: AuthenticatedUser): Promise<{
    items: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: WorkOrderStatus;
        completedAt: Date | null;
        equipmentId: number;
        assignedTechnicianId: number | null;
        equipment: {
            id: number;
            name: string;
            status: import("../../generated/prisma/enums.js").EquipmentStatus;
            code: string;
            criticality: import("../../generated/prisma/enums.js").Criticality;
        };
        assignedTechnician: {
            email: string;
            role: Role;
            id: number;
            name: string;
        } | null;
        maintenanceRequest: {
            id: number;
            createdAt: Date;
            status: import("../../generated/prisma/enums.js").MaintenanceRequestStatus;
            description: string;
            criticality: import("../../generated/prisma/enums.js").Criticality;
            requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
        };
        workOrderNumber: string;
        maintenanceRequestId: number;
        assignedById: number | null;
        assignedAt: Date | null;
        startedAt: Date | null;
        closedAt: Date | null;
        assignedBy: {
            email: string;
            role: Role;
            id: number;
            name: string;
        } | null;
    }[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function assignWorkOrder(workOrderId: number, assignedTechnicianId: number, actor: AuthenticatedUser): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: WorkOrderStatus;
    completedAt: Date | null;
    equipmentId: number;
    assignedTechnicianId: number | null;
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
    };
    assignedTechnician: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
    maintenanceRequest: {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").MaintenanceRequestStatus;
        description: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    };
    workOrderNumber: string;
    maintenanceRequestId: number;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    closedAt: Date | null;
    assignedBy: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
}>;
export declare function startWorkOrder(workOrderId: number, actor: AuthenticatedUser): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: WorkOrderStatus;
    completedAt: Date | null;
    equipmentId: number;
    assignedTechnicianId: number | null;
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
    };
    assignedTechnician: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
    maintenanceRequest: {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").MaintenanceRequestStatus;
        description: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    };
    workOrderNumber: string;
    maintenanceRequestId: number;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    closedAt: Date | null;
    assignedBy: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
}>;
export declare function completeWorkOrder(workOrderId: number, actor: AuthenticatedUser): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: WorkOrderStatus;
    completedAt: Date | null;
    equipmentId: number;
    assignedTechnicianId: number | null;
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
    };
    assignedTechnician: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
    maintenanceRequest: {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").MaintenanceRequestStatus;
        description: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    };
    workOrderNumber: string;
    maintenanceRequestId: number;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    closedAt: Date | null;
    assignedBy: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
}>;
export declare function closeWorkOrder(workOrderId: number, actor: AuthenticatedUser): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: WorkOrderStatus;
    completedAt: Date | null;
    equipmentId: number;
    assignedTechnicianId: number | null;
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
    };
    assignedTechnician: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
    maintenanceRequest: {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").MaintenanceRequestStatus;
        description: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    };
    workOrderNumber: string;
    maintenanceRequestId: number;
    assignedById: number | null;
    assignedAt: Date | null;
    startedAt: Date | null;
    closedAt: Date | null;
    assignedBy: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
}>;
//# sourceMappingURL=work-order.service.d.ts.map