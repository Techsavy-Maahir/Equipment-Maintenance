import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DashboardPage } from "./DashboardPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getDashboardStats: vi.fn(),
    getNotifications: vi.fn().mockResolvedValue({ items: [], unreadCount: 0 }),
    markNotificationRead: vi.fn().mockResolvedValue({ id: 1, isRead: true, readAt: null }),
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
        assignedTechnicianName: "Michael Chen",
      },
      {
        id: 2,
        equipmentCode: "EQ-0108",
        equipmentName: "Air Compressor AC-01",
        activity: "Filter change",
        dueDate: "2026-10-13T00:00:00.000Z",
        status: "Due today",
        assignedTechnicianName: null,
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
    });

    // PM items are now rendered as buttons with aria-label — check equipment code
    await waitFor(() => {
      expect(screen.getAllByText("EQ-0042").length).toBeGreaterThanOrEqual(1);
    });

    // Overdue badge appears in the PM section
    expect(screen.getByText("Overdue")).toBeInTheDocument();

    // Activity name is shown
    expect(screen.getByText("Seal inspection")).toBeInTheDocument();

    // Technician name is shown for the overdue item (and recent work order)
    expect(screen.getAllByText("Michael Chen").length).toBeGreaterThanOrEqual(1);

    // Test clicking navigation buttons
    const newWoBtn = screen.getByRole("button", { name: /New Work Order/i });
    await userEvent.click(newWoBtn);
    expect(onNavigate).toHaveBeenCalledWith("work-orders");
  });

  it("shows empty state when no upcoming PM", async () => {
    vi.mocked(api.getDashboardStats).mockResolvedValue({
      ...mockStats,
      upcomingPm: [],
      kpis: { ...mockStats.kpis, overduePm: 0 },
    });

    render(<DashboardPage user={{ name: "James Davis", role: "MANAGER" }} onNavigate={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/All maintenance on schedule/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Green – Okay/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("shows error state when API fails", async () => {
    vi.mocked(api.getDashboardStats).mockRejectedValue(new Error("Network error"));

    render(<DashboardPage user={{ name: "Admin" }} onNavigate={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it("notification bell renders without crashing", async () => {
    vi.mocked(api.getDashboardStats).mockResolvedValue(mockStats);
    vi.mocked(api.getNotifications).mockResolvedValue({
      items: [
        {
          id: 1,
          key: "overdue-1",
          kind: "OVERDUE",
          dueDate: "2026-10-10T00:00:00.000Z",
          title: "Overdue: Seal inspection",
          message: "EQ-0042 is overdue for Seal inspection",
          createdAt: "2026-10-11T09:00:00.000Z",
          occurrenceId: 1,
          isRead: false,
          readAt: null,
          recipientId: 10,
          occurrence: null,
        },
      ],
      unreadCount: 1,
    });

    const onNavigate = vi.fn();
    render(<DashboardPage user={{ name: "James Davis", role: "MANAGER" }} onNavigate={onNavigate} />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Notifications/i })).toBeInTheDocument();
    });

    // Open the notification panel
    const bellBtn = screen.getByRole("button", { name: /Notifications/i });
    await userEvent.click(bellBtn);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Notifications panel" })).toBeInTheDocument();
    });
  });
});
