import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { PreventiveMaintenancePage } from "./PreventiveMaintenancePage";

vi.mock("../api", () => ({
  api: {
    listMaintenancePlans: vi.fn(),
    listMaintenanceOccurrences: vi.fn(),
    getEquipment: vi.fn(),
    getUsers: vi.fn(),
    createMaintenancePlan: vi.fn(),
    updateMaintenancePlan: vi.fn(),
    completeMaintenanceOccurrence: vi.fn(),
    getNotifications: vi.fn().mockResolvedValue({ items: [], unreadCount: 0 }),
  },
  handleApiError: (err) => err?.message || "An error occurred",
}));

const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "ADMIN",
};

const mockPlans = [
  {
    id: 10,
    activity: "Lubricate Main Conveyor",
    frequency: "MONTHLY",
    nextDueDate: "2026-12-01T00:00:00.000Z",
    isActive: true,
    equipmentId: 1,
    equipment: { id: 1, name: "Conveyor 1", code: "EQ-100" },
    assignedTechnician: { id: 3, name: "Mike Tech" },
  },
];

const mockOccurrences = [
  {
    id: 101,
    maintenancePlanId: 10,
    dueDate: "2026-11-20T00:00:00.000Z",
    status: "PENDING",
    displayStatus: "UPCOMING",
    completedAt: null,
    workPerformed: null,
    remarks: null,
    maintenancePlan: mockPlans[0],
    completedBy: null,
    linkedWorkOrder: [{ id: 1, workOrderNumber: "WO-2026-0001", status: "OPEN" }],
  },
];

describe("PreventiveMaintenancePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.listMaintenancePlans.mockResolvedValue(mockPlans);
    api.listMaintenanceOccurrences.mockResolvedValue({
      items: mockOccurrences,
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });
    api.getEquipment.mockResolvedValue({ items: [{ id: 1, name: "Conveyor 1", code: "EQ-100" }] });
    api.getUsers.mockResolvedValue({ items: [{ id: 3, name: "Mike Tech", role: "TECHNICIAN" }] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders page header and occurrences list by default", async () => {
    render(<PreventiveMaintenancePage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getAllByText("Preventive Maintenance").length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Lubricate Main Conveyor/i).length).toBeGreaterThan(0);
      expect(screen.getByText("WO-2026-0001")).toBeInTheDocument();
    });
  });

  it("switches to PM Plans tab and displays plan list", async () => {
    render(<PreventiveMaintenancePage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText(/PM Plans \(1\)/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/PM Plans \(1\)/i));

    await waitFor(() => {
      expect(screen.getByText("Create PM plan")).toBeInTheDocument();
      expect(screen.getByText("Plan list")).toBeInTheDocument();
    });
  });

  it("opens completion modal and completes maintenance occurrence", async () => {
    api.completeMaintenanceOccurrence.mockResolvedValue({
      occurrence: { ...mockOccurrences[0], status: "COMPLETED" },
      plan: mockPlans[0],
      createdNextOccurrence: true,
    });

    render(<PreventiveMaintenancePage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText("Complete Work")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Complete Work"));

    expect(screen.getByText("Record Maintenance Completion")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Work Performed \*/i), {
      target: { value: "Greased rollers and checked belt tension" },
    });

    fireEvent.click(screen.getByText("Confirm Completion"));

    await waitFor(() => {
      expect(api.completeMaintenanceOccurrence).toHaveBeenCalledWith(
        101,
        expect.objectContaining({
          workPerformed: "Greased rollers and checked belt tension",
        }),
      );
    });
  });
});
