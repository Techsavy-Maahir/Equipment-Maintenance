import type { Prisma } from "../../generated/prisma/client.js";
import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { CreateEquipmentInput, EquipmentListQuery, UpdateEquipmentInput } from "../schemas/equipment.schema.js";
export declare function listEquipment(query: EquipmentListQuery): Promise<{
    items: {
        warrantyStatus: import("./warranty.service.js").WarrantyStatus;
        department: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
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
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../generated/prisma/enums.js").EquipmentStatus;
        code: string;
        serialNumber: string | null;
        purchaseDate: Date | null;
        purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
        warrantyStartDate: Date | null;
        warrantyExpiryDate: Date | null;
        description: string | null;
        criticality: import("../../generated/prisma/enums.js").Criticality;
        departmentId: number;
        locationId: number;
        categoryId: number;
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
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
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
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    code: string;
    serialNumber: string | null;
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
    description: string | null;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function createEquipment(input: CreateEquipmentInput, actor?: Pick<AuthenticatedUser, "id"> | null): Promise<{
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
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
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    code: string;
    serialNumber: string | null;
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
    description: string | null;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function changeEquipmentLocation(tx: Prisma.TransactionClient, equipmentId: number, newLocationId: number): Promise<void>;
export declare function updateEquipment(id: number, input: UpdateEquipmentInput, actor?: Pick<AuthenticatedUser, "id"> | null): Promise<{
    department: {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
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
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    code: string;
    serialNumber: string | null;
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
    description: string | null;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
    isDeactivated: boolean;
    deactivatedAt: Date | null;
}>;
export declare function deactivateEquipment(id: number, actor?: Pick<AuthenticatedUser, "id"> | null): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    status: import("../../generated/prisma/enums.js").EquipmentStatus;
    code: string;
    serialNumber: string | null;
    purchaseDate: Date | null;
    purchaseCost: import("@prisma/client/runtime/library.js").Decimal | null;
    warrantyStartDate: Date | null;
    warrantyExpiryDate: Date | null;
    description: string | null;
    criticality: import("../../generated/prisma/enums.js").Criticality;
    departmentId: number;
    locationId: number;
    categoryId: number;
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