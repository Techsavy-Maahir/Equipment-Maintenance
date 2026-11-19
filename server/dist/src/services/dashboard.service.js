import { prisma } from "../prisma.js";
import { isPendingMigrationError } from "./notification.service.js";
import { workOrderReadSelect } from "./work-order.service.js";
export async function getDashboardStats(actor) {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 1. Equipment metrics
    const [totalEquipment, operationalEquipment, breakdownEquipment] = await Promise.all([
        prisma.equipment.count({ where: { isDeactivated: false } }),
        prisma.equipment.count({ where: { isDeactivated: false, status: "ACTIVE" } }),
        prisma.equipment.count({ where: { isDeactivated: false, status: "BREAKDOWN" } }),
    ]);
    const operationalPercentage = totalEquipment > 0 ? Math.round((operationalEquipment / totalEquipment) * 1000) / 10 : 0;
    // 2. Work order metrics (safe against pending M6)
    let openWorkOrders = 0;
    let inProgressWorkOrders = 0;
    let recentWorkOrders = [];
    try {
        const [openCount, inProgressCount, recentWos] = await Promise.all([
            prisma.workOrder.count({ where: { status: { in: ["OPEN", "ASSIGNED"] } } }),
            prisma.workOrder.count({ where: { status: "IN_PROGRESS" } }),
            prisma.workOrder.findMany({
                take: 6,
                orderBy: { createdAt: "desc" },
                select: {
                    ...workOrderReadSelect,
                    equipment: { select: { code: true, name: true } },
                    assignedTechnician: { select: { name: true } },
                    maintenanceRequest: { select: { criticality: true } },
                },
            }),
        ]);
        openWorkOrders = openCount;
        inProgressWorkOrders = inProgressCount;
        recentWorkOrders = recentWos.map((wo) => ({
            id: wo.id,
            workOrderNumber: wo.workOrderNumber,
            equipmentCode: wo.equipment?.code || "—",
            equipmentName: wo.equipment?.name || "Equipment",
            assignedTechnicianName: wo.assignedTechnician?.name || null,
            priority: wo.maintenanceRequest?.criticality || "MEDIUM",
            status: wo.status,
            dueDate: wo.createdAt ? wo.createdAt.toISOString() : null,
        }));
    }
    catch (err) {
        if (!isPendingMigrationError(err)) {
            // If it's not a pending migration error, log and continue safely
            console.warn("[DashboardService] WorkOrder query error:", err);
        }
    }
    // 3. Preventive Maintenance metrics (safe against pending M6)
    let overduePm = 0;
    let upcomingPm = [];
    try {
        const next7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        const [overdueCount, upcomingOccurrences] = await Promise.all([
            prisma.maintenanceOccurrence.count({
                where: {
                    status: { notIn: ["COMPLETED", "CANCELLED"] },
                    dueDate: { lt: startOfToday },
                },
            }),
            prisma.maintenanceOccurrence.findMany({
                where: {
                    status: { notIn: ["COMPLETED", "CANCELLED"] },
                    dueDate: { gte: startOfToday, lte: next7Days },
                },
                take: 5,
                orderBy: { dueDate: "asc" },
                include: {
                    maintenancePlan: {
                        include: {
                            equipment: { select: { code: true, name: true } },
                        },
                    },
                },
            }),
        ]);
        overduePm = overdueCount;
        upcomingPm = upcomingOccurrences.map((occ) => {
            const isDueToday = new Date(occ.dueDate).toDateString() === now.toDateString();
            return {
                id: occ.id,
                equipmentCode: occ.maintenancePlan.equipment.code,
                equipmentName: occ.maintenancePlan.equipment.name,
                activity: occ.maintenancePlan.activity,
                dueDate: occ.dueDate.toISOString(),
                status: isDueToday ? "Due today" : "Scheduled",
            };
        });
    }
    catch (err) {
        if (!isPendingMigrationError(err)) {
            console.warn("[DashboardService] MaintenanceOccurrence query error:", err);
        }
    }
    // 4. Monthly Request Volume (Last 6 calendar months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyVolume = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
        const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
        const label = monthNames[d.getMonth()];
        try {
            const [breakdown, preventive, kaizen, relocation] = await Promise.all([
                prisma.maintenanceRequest.count({
                    where: {
                        requestType: "BREAKDOWN",
                        createdAt: { gte: startOfMonth, lte: endOfMonth },
                    },
                }),
                prisma.maintenanceRequest.count({
                    where: {
                        requestType: "PREVENTIVE",
                        createdAt: { gte: startOfMonth, lte: endOfMonth },
                    },
                }),
                prisma.maintenanceRequest.count({
                    where: {
                        requestType: "IMPROVEMENT",
                        createdAt: { gte: startOfMonth, lte: endOfMonth },
                    },
                }),
                prisma.equipmentLocationHistory.count({
                    where: {
                        changedAt: { gte: startOfMonth, lte: endOfMonth },
                    },
                }),
            ]);
            monthlyVolume.push({
                month: label,
                breakdown,
                preventive,
                kaizen,
                relocation,
            });
        }
        catch {
            monthlyVolume.push({
                month: label,
                breakdown: 0,
                preventive: 0,
                kaizen: 0,
                relocation: 0,
            });
        }
    }
    // 5. Breakdown repair hours for the current month
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let downtimeThisMonthHours = 0;
    try {
        const breakdownWorkOrders = await prisma.workOrder.findMany({
            where: {
                startedAt: {
                    not: null,
                    lte: now,
                },
                maintenanceRequest: {
                    is: {
                        requestType: "BREAKDOWN",
                    },
                },
                OR: [
                    { completedAt: null },
                    { completedAt: { gte: currentMonthStart } },
                ],
            },
            select: {
                startedAt: true,
                completedAt: true,
            },
        });
        let totalRepairMilliseconds = 0;
        for (const workOrder of breakdownWorkOrders) {
            if (!workOrder.startedAt)
                continue;
            const periodStart = Math.max(workOrder.startedAt.getTime(), currentMonthStart.getTime());
            const periodEnd = Math.min((workOrder.completedAt ?? now).getTime(), now.getTime());
            if (periodEnd > periodStart) {
                totalRepairMilliseconds += periodEnd - periodStart;
            }
        }
        downtimeThisMonthHours = Math.round(totalRepairMilliseconds / (1000 * 60 * 60));
    }
    catch (err) {
        console.warn("[DashboardService] Breakdown repair hours query error:", err);
        downtimeThisMonthHours = 0;
    }
    return {
        kpis: {
            totalEquipment,
            operationalEquipment,
            operationalPercentage,
            activeBreakdowns: breakdownEquipment,
            openWorkOrders,
            inProgressWorkOrders,
            overduePm,
            downtimeThisMonthHours,
        },
        monthlyVolume,
        upcomingPm,
        recentWorkOrders,
    };
}
//# sourceMappingURL=dashboard.service.js.map