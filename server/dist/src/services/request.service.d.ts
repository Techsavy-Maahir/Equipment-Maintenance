import { type MaintenanceRequestStatus, type Role } from "../../generated/prisma/client.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { CreateMaintenanceRequestInput, MaintenanceRequestListQuery, TransitionMaintenanceRequestInput } from "../schemas/request.schema.js";
export declare function createMaintenanceRequest(input: CreateMaintenanceRequestInput, requester: AuthenticatedUser): Promise<{
    equipment: {
        id: number;
        name: string;
        code: string;
        isDeactivated: boolean;
    };
    requester: {
        email: string;
        role: Role;
        id: number;
        name: string;
    };
    reviewer: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: MaintenanceRequestStatus;
    equipmentId: number;
    description: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    requesterId: number;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
}>;
export declare function listMaintenanceRequests(query: MaintenanceRequestListQuery, actor: AuthenticatedUser): Promise<{
    items: ({
        equipment: {
            id: number;
            name: string;
            code: string;
            isDeactivated: boolean;
        };
        requester: {
            email: string;
            role: Role;
            id: number;
            name: string;
        };
        reviewer: {
            email: string;
            role: Role;
            id: number;
            name: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: MaintenanceRequestStatus;
        equipmentId: number;
        description: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
        requesterId: number;
        reviewerId: number | null;
        decisionReason: string | null;
        problem: string | null;
        proposedSolution: string | null;
        expectedBenefit: string | null;
        outcome: string | null;
        implementationStatus: string | null;
    })[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function getMaintenanceRequest(requestId: number, actor: AuthenticatedUser): Promise<{
    equipment: {
        id: number;
        name: string;
        code: string;
        isDeactivated: boolean;
    };
    decisionHistory: ({
        actor: {
            email: string;
            role: Role;
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        actorId: number;
        comment: string | null;
        requestId: number;
        previousStatus: MaintenanceRequestStatus;
        newStatus: MaintenanceRequestStatus;
    })[];
    requester: {
        email: string;
        role: Role;
        id: number;
        name: string;
    };
    reviewer: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: MaintenanceRequestStatus;
    equipmentId: number;
    description: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    requesterId: number;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
}>;
export declare function transitionMaintenanceRequest(requestId: number, actor: AuthenticatedUser, input: TransitionMaintenanceRequestInput): Promise<{
    equipment: {
        id: number;
        name: string;
        code: string;
        isDeactivated: boolean;
    };
    decisionHistory: ({
        actor: {
            email: string;
            role: Role;
            id: number;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        actorId: number;
        comment: string | null;
        requestId: number;
        previousStatus: MaintenanceRequestStatus;
        newStatus: MaintenanceRequestStatus;
    })[];
    requester: {
        email: string;
        role: Role;
        id: number;
        name: string;
    };
    reviewer: {
        email: string;
        role: Role;
        id: number;
        name: string;
    } | null;
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: MaintenanceRequestStatus;
    equipmentId: number;
    description: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    requestType: import("../../generated/prisma/enums.js").MaintenanceRequestType;
    requesterId: number;
    reviewerId: number | null;
    decisionReason: string | null;
    problem: string | null;
    proposedSolution: string | null;
    expectedBenefit: string | null;
    outcome: string | null;
    implementationStatus: string | null;
}>;
//# sourceMappingURL=request.service.d.ts.map