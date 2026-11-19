import { type MaintenanceFrequency, type MaintenanceOccurrenceStatus } from "../../generated/prisma/client.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { CreateMaintenancePlanInput, MaintenanceOccurrenceListQuery, UpdateMaintenancePlanInput } from "../schemas/maintenance.schema.js";
export declare const maintenanceOccurrenceInclude: {
    readonly maintenancePlan: {
        readonly include: {
            readonly equipment: {
                readonly select: {
                    readonly id: true;
                    readonly code: true;
                    readonly name: true;
                    readonly status: true;
                    readonly isDeactivated: true;
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
        };
    };
    readonly completedBy: {
        readonly select: {
            readonly id: true;
            readonly name: true;
            readonly email: true;
            readonly role: true;
        };
    };
    readonly linkedWorkOrder: {
        readonly select: {
            readonly id: true;
            readonly workOrderNumber: true;
            readonly status: true;
        };
    };
};
export declare function getOccurrenceDisplayStatus(occurrence: {
    dueDate: Date | string;
    status: MaintenanceOccurrenceStatus;
}): "COMPLETED" | "CANCELLED" | "MISSED" | "OVERDUE" | "DUE" | "UPCOMING";
export declare function getNextDueDate(fromDate: Date, frequency: MaintenanceFrequency): Date;
export declare function listMaintenancePlans(filters?: {
    equipmentId?: number;
    isActive?: boolean;
}): Promise<({
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        isDeactivated: boolean;
    };
    assignedTechnician: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
})[]>;
export declare function getMaintenancePlan(id: number): Promise<{
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        isDeactivated: boolean;
    };
    assignedTechnician: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
}>;
export declare function listMaintenancePlansForEquipment(equipmentId: number): Promise<({
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        isDeactivated: boolean;
    };
    assignedTechnician: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
})[]>;
export declare function listMaintenanceOccurrences(query?: MaintenanceOccurrenceListQuery): Promise<{
    items: {
        displayStatus: "COMPLETED" | "OVERDUE" | "MISSED" | "CANCELLED" | "DUE" | "UPCOMING";
        maintenancePlan: {
            equipment: {
                id: number;
                name: string;
                status: import("../../generated/prisma/enums.js").EquipmentStatus;
                code: string;
                isDeactivated: boolean;
            };
            assignedTechnician: {
                email: string;
                role: import("../../generated/prisma/enums.js").Role;
                id: number;
                name: string;
            } | null;
        } & {
            id: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            equipmentId: number;
            activity: string;
            instructions: string | null;
            frequency: MaintenanceFrequency;
            assignedTechnicianId: number | null;
            lastCompletedAt: Date | null;
            nextDueDate: Date;
        };
        completedBy: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: number;
            name: string;
        } | null;
        linkedWorkOrder: {
            id: number;
            status: import("../../generated/prisma/enums.js").WorkOrderStatus;
            workOrderNumber: string;
        }[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date;
        maintenancePlanId: number;
        status: MaintenanceOccurrenceStatus;
        completedAt: Date | null;
        completedById: number | null;
        workPerformed: string | null;
        remarks: string | null;
    }[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}>;
export declare function listOccurrencesForPlan(planId: number): Promise<{
    displayStatus: "COMPLETED" | "OVERDUE" | "MISSED" | "CANCELLED" | "DUE" | "UPCOMING";
    maintenancePlan: {
        equipment: {
            id: number;
            name: string;
            status: import("../../generated/prisma/enums.js").EquipmentStatus;
            code: string;
            isDeactivated: boolean;
        };
        assignedTechnician: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: number;
        activity: string;
        instructions: string | null;
        frequency: MaintenanceFrequency;
        assignedTechnicianId: number | null;
        lastCompletedAt: Date | null;
        nextDueDate: Date;
    };
    completedBy: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
    linkedWorkOrder: {
        id: number;
        status: import("../../generated/prisma/enums.js").WorkOrderStatus;
        workOrderNumber: string;
    }[];
    id: number;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    maintenancePlanId: number;
    status: MaintenanceOccurrenceStatus;
    completedAt: Date | null;
    completedById: number | null;
    workPerformed: string | null;
    remarks: string | null;
}[]>;
export declare function getMaintenanceOccurrence(id: number): Promise<{
    displayStatus: "COMPLETED" | "OVERDUE" | "MISSED" | "CANCELLED" | "DUE" | "UPCOMING";
    maintenancePlan: {
        equipment: {
            id: number;
            name: string;
            status: import("../../generated/prisma/enums.js").EquipmentStatus;
            code: string;
            isDeactivated: boolean;
        };
        assignedTechnician: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: number;
        activity: string;
        instructions: string | null;
        frequency: MaintenanceFrequency;
        assignedTechnicianId: number | null;
        lastCompletedAt: Date | null;
        nextDueDate: Date;
    };
    completedBy: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
    linkedWorkOrder: {
        id: number;
        status: import("../../generated/prisma/enums.js").WorkOrderStatus;
        workOrderNumber: string;
    }[];
    id: number;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    maintenancePlanId: number;
    status: MaintenanceOccurrenceStatus;
    completedAt: Date | null;
    completedById: number | null;
    workPerformed: string | null;
    remarks: string | null;
}>;
export declare function createMaintenancePlan(input: CreateMaintenancePlanInput, actor: AuthenticatedUser): Promise<{
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        isDeactivated: boolean;
    };
    assignedTechnician: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
}>;
export declare function updateMaintenancePlan(id: number, input: UpdateMaintenancePlanInput, actor: AuthenticatedUser): Promise<{
    equipment: {
        id: number;
        name: string;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        isDeactivated: boolean;
    };
    assignedTechnician: {
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    equipmentId: number;
    activity: string;
    instructions: string | null;
    frequency: MaintenanceFrequency;
    assignedTechnicianId: number | null;
    lastCompletedAt: Date | null;
    nextDueDate: Date;
}>;
export declare function generateOccurrenceForPlan(planId: number): Promise<{
    created: boolean;
    occurrence: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date;
        maintenancePlanId: number;
        status: MaintenanceOccurrenceStatus;
        completedAt: Date | null;
        completedById: number | null;
        workPerformed: string | null;
        remarks: string | null;
    };
    plan: {
        id: number;
        isActive: boolean;
        frequency: MaintenanceFrequency;
        nextDueDate: Date;
        equipment: {
            id: number;
            isDeactivated: boolean;
        };
    };
}>;
export declare function completeMaintenanceOccurrence(occurrenceId: number, input: {
    completedAt?: Date | string | null;
    workPerformed?: string | null;
    remarks?: string | null;
}, actor: AuthenticatedUser): Promise<{
    occurrence: {
        displayStatus: "COMPLETED" | "OVERDUE" | "MISSED" | "CANCELLED" | "DUE" | "UPCOMING";
        maintenancePlan: {
            equipment: {
                id: number;
                name: string;
                status: import("../../generated/prisma/enums.js").EquipmentStatus;
                code: string;
                isDeactivated: boolean;
            };
            assignedTechnician: {
                email: string;
                role: import("../../generated/prisma/enums.js").Role;
                id: number;
                name: string;
            } | null;
        } & {
            id: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            equipmentId: number;
            activity: string;
            instructions: string | null;
            frequency: MaintenanceFrequency;
            assignedTechnicianId: number | null;
            lastCompletedAt: Date | null;
            nextDueDate: Date;
        };
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date;
        maintenancePlanId: number;
        status: MaintenanceOccurrenceStatus;
        completedAt: Date | null;
        completedById: number | null;
        workPerformed: string | null;
        remarks: string | null;
    };
    plan: {
        equipment: {
            id: number;
            name: string;
            status: import("../../generated/prisma/enums.js").EquipmentStatus;
            code: string;
            isDeactivated: boolean;
        };
        assignedTechnician: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        equipmentId: number;
        activity: string;
        instructions: string | null;
        frequency: MaintenanceFrequency;
        assignedTechnicianId: number | null;
        lastCompletedAt: Date | null;
        nextDueDate: Date;
    };
    createdNextOccurrence: boolean;
}>;
export declare function generateDueOccurrencesForActivePlans(): Promise<{
    created: boolean;
    occurrence: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dueDate: Date;
        maintenancePlanId: number;
        status: MaintenanceOccurrenceStatus;
        completedAt: Date | null;
        completedById: number | null;
        workPerformed: string | null;
        remarks: string | null;
    };
    plan: {
        id: number;
        isActive: boolean;
        frequency: MaintenanceFrequency;
        nextDueDate: Date;
        equipment: {
            id: number;
            isDeactivated: boolean;
        };
    };
}[]>;
//# sourceMappingURL=maintenance.service.d.ts.map