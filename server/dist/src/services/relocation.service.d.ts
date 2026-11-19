import type { AuthenticatedUser } from "../middleware/auth.middleware.js";
import type { CreateRelocationInput, RelocationListQuery } from "../schemas/relocation.schema.js";
export interface RelocationRecord {
    id: number;
    equipmentId: number;
    equipment: {
        id: number;
        code: string;
        name: string;
    };
    fromLocationId: number | null;
    fromLocation: {
        id: number;
        name: string;
    } | null;
    toLocationId: number;
    toLocation: {
        id: number;
        name: string;
    };
    reason: string;
    relocatedAt: Date;
    relocatedBy: {
        id: number;
        name: string;
        email: string;
        role: string;
    } | null;
}
export declare function relocateEquipment(input: CreateRelocationInput, actor: AuthenticatedUser): Promise<RelocationRecord>;
export declare function listRelocations(query?: Partial<RelocationListQuery>): Promise<{
    items: RelocationRecord[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}>;
export declare function getRelocationsForEquipment(equipmentId: number): Promise<RelocationRecord[]>;
//# sourceMappingURL=relocation.service.d.ts.map