export interface DashboardStats {
    kpis: {
        totalEquipment: number;
        operationalEquipment: number;
        operationalPercentage: number;
        activeBreakdowns: number;
        openWorkOrders: number;
        inProgressWorkOrders: number;
        overduePm: number;
        downtimeThisMonthHours: number;
    };
    monthlyVolume: Array<{
        month: string;
        breakdown: number;
        preventive: number;
        kaizen: number;
        relocation: number;
    }>;
    upcomingPm: Array<{
        id: number;
        equipmentCode: string;
        equipmentName: string;
        activity: string;
        dueDate: string;
        status: string;
    }>;
    recentWorkOrders: Array<{
        id: number;
        workOrderNumber: string;
        equipmentCode: string;
        equipmentName: string;
        assignedTechnicianName: string | null;
        priority: string;
        status: string;
        dueDate: string | null;
    }>;
}
export declare function getDashboardStats(actor: {
    id: number;
    role: string;
}): Promise<DashboardStats>;
//# sourceMappingURL=dashboard.service.d.ts.map