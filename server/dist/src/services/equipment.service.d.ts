import type { CreateEquipmentInput, UpdateEquipmentInput } from "../schemas/equipment.schema.js";
export declare function listEquipment(): Promise<({
    department: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    location: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
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
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
})[]>;
export declare function getEquipment(id: number): Promise<{
    department: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    location: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
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
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function createEquipment(input: CreateEquipmentInput): Promise<{
    department: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    location: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
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
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function updateEquipment(id: number, input: UpdateEquipmentInput): Promise<{
    department: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    location: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    category: {
        id: number;
        name: string;
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
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
//# sourceMappingURL=equipment.service.d.ts.map