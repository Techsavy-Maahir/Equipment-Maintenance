import type { CreateEquipmentInput, EquipmentListQuery, UpdateEquipmentInput } from "../schemas/equipment.schema.js";
export declare function listEquipment(query: EquipmentListQuery): Promise<{
    items: {
        warrantyStatus: import("./warranty.service.js").WarrantyStatus;
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
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        departmentId: number;
        locationId: number;
        categoryId: number;
        purchaseDate: Date | null;
        purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
        warrantyStartDate: Date | null;
        warrantyExpiryDate: Date | null;
        serialNumber: string | null;
        description: string | null;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        isDeactivated: boolean;
        deactivatedAt: Date | null;
    }[];
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
    warrantyStatus: import("./warranty.service.js").WarrantyStatus;
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
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
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
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
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
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
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
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
    serialNumber: string | null;
    description: string | null;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
/**
 * Retrieves the location history for a specific equipment.
 * Returns records in reverse chronological order (newest first).
 * Throws AppError(404) if the equipment does not exist.
 */
export declare function getEquipmentLocationHistory(equipmentId: number): Promise<({
    fromLocation: {
        id: number;
        name: string;
    } | null;
    toLocation: {
        id: number;
        name: string;
    };
} & {
    id: number;
    equipmentId: number;
    fromLocationId: number | null;
    toLocationId: number;
    changedAt: Date;
})[]>;
//# sourceMappingURL=equipment.service.d.ts.map