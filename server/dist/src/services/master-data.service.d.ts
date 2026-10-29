import type { CreateMasterDataInput, MasterDataQuery, UpdateMasterDataInput } from "../schemas/master-data.schema.js";
export declare function listDepartments(query: MasterDataQuery): Promise<{
    items: ({
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function createDepartment(input: CreateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateDepartment(id: number, input: UpdateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deactivateDepartment(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function reactivateDepartment(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function listLocations(query: MasterDataQuery): Promise<{
    items: ({
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function createLocation(input: CreateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateLocation(id: number, input: UpdateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Deactivates a location with strict safety validation:
 * 1. Rejected with 409 Conflict if equipment is currently assigned to this location.
 * 2. Rejected with 409 Conflict if relocation history references this location as destination (toLocationId).
 * 3. Never hard-deletes; sets isActive = false.
 */
export declare function deactivateLocation(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function reactivateLocation(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function listCategories(query: MasterDataQuery): Promise<{
    items: ({
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[];
    total: number;
    page: number;
    pageSize: number;
}>;
export declare function createCategory(input: CreateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateCategory(id: number, input: UpdateMasterDataInput): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deactivateCategory(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function reactivateCategory(id: number): Promise<{
    _count: {
        equipment: number;
    };
} & {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=master-data.service.d.ts.map