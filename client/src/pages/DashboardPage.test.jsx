import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DashboardPage } from "./DashboardPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getDashboardStats: vi.fn(),
    getNotificationsForUser: vi.fn().mockResolvedValue({ items: [], unreadCount: 0 }),
  },
  handleApiError: (err) => err?.message || "API Error",
}));

describe("DashboardPage", () => {
  const mockStats = {
    kpis: {
      totalEquipment: 248,
      operationalEquipment: 221,
      operationalPercentage: 89.1,
      activeBreakdowns: 12,
      openWorkOrders: 18,
      inProgressWorkOrders: 6,
      overduePm: 7,
      downtimeThisMonthHours: 42,
    },
    monthlyVolume: [
      { month: "Apr", breakdown: 40, preventive: 25, kaizen: 10, relocation: 5 },
      { month: "May", breakdown: 35, preventive: 30, kaizen: 12, relocation: 4 },
      { month: "Jun", breakdown: 45, preventive: 32, kaizen: 11, relocation: 6 },
    ],
    upcomingPm: [
      {
        id: 1,
        equipmentCode: "EQ-0042",
        equipmentName: "Hydraulic Press HP-02",
        activity: "Seal inspection",
        dueDate: "2026-10-12T00:00:00.000Z",
        status: "Overdue",
      },
      {
        id: 2,
        equipmentCode: "EQ-0108",
        equipmentName: "Air Compressor AC-01",
        activity: "Filter change",
        dueDate: "2026-10-13T00:00:00.000Z",
        status: "Due today",
      },
    ],
    recentWorkOrders: [
      {
        id: 841,
        workOrderNumber: "WO-2026-0841",
        equipmentCode: "EQ-0042",
        equipmentName: "Hydraulic Press HP-02",
        assignedTechnicianName: "Michael Chen",
        priority: "CRITICAL",
        status: "IN_PROGRESS",
        dueDate: "2026-10-13T00:00:00.000Z",
      },
    ],
  };

  it("renders KPI cards, requests chart, and recent work orders", async () => {
    vi.mocked(api.getDashboardStats).mockResolvedValue(mockStats);

    const onNavigate = vi.fn();
    render(<DashboardPage user={{ name: "James Davis", role: "MANAGER" }} onNavigate={onNavigate} />);

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("248")).toBeInTheDocument();
      expect(screen.getByText("221")).toBeInTheDocument();
      expect(screen.getByText("WO-2026-0841")).toBeInTheDocument();
      expect(screen.getByText("Hydraulic Press HP-02", { selector: ".dash-pm-name" })).toBeInTheDocument();
    });

    // Test clicking navigation buttons
    const newWoBtn = screen.getByRole("button", { name: /New Work Order/i });
    await userEvent.click(newWoBtn);
    expect(onNavigate).toHaveBeenCalledWith("work-orders");
  });
});
