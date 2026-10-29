import type { CreateEquipmentInput, EquipmentListQuery, UpdateEquipmentInput } from "../schemas/equipment.schema.js";
export declare function listEquipment(query: EquipmentListQuery): Promise<{
    items: ({
        location: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        category: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        department: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        departmentId: number;
        locationId: number;
        categoryId: number;
        serialNumber: string | null;
        description: string | null;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        isDeactivated: boolean;
        deactivatedAt: Date | null;
    })[];
    total: number;
    page: number;
    pageSize: number;
    locations: {
        id: number;
        name: string;
    }[];
    categories: {
        id: number;
        name: string;
    }[];
}>;
export declare function getEquipment(id: number): Promise<{
    location: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    serialNumber: string | null;
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function createEquipment(input: CreateEquipmentInput): Promise<{
    location: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    serialNumber: string | null;
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function updateEquipment(id: number, input: UpdateEquipmentInput): Promise<{
    location: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    serialNumber: string | null;
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function deactivateEquipment(id: number): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    serialNumber: string | null;
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
//# sourceMappingURL=equipment.service.d.ts.map