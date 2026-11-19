import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { KaizenPage } from "./KaizenPage";

vi.mock("../api", () => ({
  api: {
    listMaintenanceRequests: vi.fn(),
    getMaintenanceRequest: vi.fn(),
    createMaintenanceRequest: vi.fn(),
    transitionMaintenanceRequest: vi.fn(),
    getEquipment: vi.fn(),
    getNotifications: vi.fn().mockResolvedValue({ items: [], unreadCount: 0 }),
  },
  handleApiError: (err) => err?.message || "An error occurred",
}));

const mockUser = {
  id: 1,
  name: "Jane Manager",
  email: "jane@example.com",
  role: "MANAGER",
};

const mockKaizenList = [
  {
    id: 50,
    requestType: "IMPROVEMENT",
    status: "UNDER_REVIEW",
    criticality: "HIGH",
    description: "Install auto-feeder sensor",
    problem: "Manual feeding causes 10% operator delay",
    proposedSolution: "Add optical proximity sensor to inlet chute",
    expectedBenefit: "Reduces cycle time by 4 seconds per part",
    createdAt: "2026-11-12T00:00:00.000Z",
    equipment: { id: 1, name: "Stamping Press", code: "SP-01" },
    requester: { id: 2, name: "Bob Operator" },
  },
];

describe("KaizenPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.listMaintenanceRequests.mockResolvedValue({ items: mockKaizenList, total: 1 });
    api.getEquipment.mockResolvedValue({ items: [{ id: 1, name: "Stamping Press", code: "SP-01" }] });
    api.getMaintenanceRequest.mockResolvedValue(mockKaizenList[0]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Kaizen backlog and displays problem, solution, benefit", async () => {
    render(<KaizenPage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText(/Kaizen Continuous Improvement/i)).toBeInTheDocument();
      expect(screen.getByText(/Install auto-feeder sensor/i)).toBeInTheDocument();
      expect(screen.getAllByText("Stamping Press").length).toBeGreaterThan(0);
    });

    // Click item to load details
    fireEvent.click(screen.getByText(/Install auto-feeder sensor/i));

    await waitFor(() => {
      expect(screen.getByText(/Manual feeding causes 10% operator delay/i)).toBeInTheDocument();
      expect(screen.getByText(/Add optical proximity sensor to inlet chute/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Reduces cycle time by 4 seconds per part/i).length).toBeGreaterThan(0);
    });
  });

  it("allows manager to approve a Kaizen request", async () => {
    api.transitionMaintenanceRequest.mockResolvedValue({ ...mockKaizenList[0], status: "APPROVED" });

    render(<KaizenPage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText(/Install auto-feeder sensor/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Install auto-feeder sensor/i));

    await waitFor(() => {
      expect(screen.getByText("Approve Kaizen")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Approve Kaizen"));

    expect(screen.getByText("Approve Kaizen Improvement")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Confirm Approval"));

    await waitFor(() => {
      expect(api.transitionMaintenanceRequest).toHaveBeenCalledWith(
        50,
        expect.objectContaining({ status: "APPROVED" }),
      );
    });
  });

  it("completes Kaizen closure with mandatory outcome and implementation status", async () => {
    const inProgressKaizen = { ...mockKaizenList[0], status: "IN_PROGRESS" };
    api.getMaintenanceRequest.mockResolvedValue(inProgressKaizen);
    api.transitionMaintenanceRequest.mockResolvedValue({ ...inProgressKaizen, status: "COMPLETED" });

    render(<KaizenPage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByText(/Install auto-feeder sensor/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Install auto-feeder sensor/i));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Complete & Close Kaizen" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Complete & Close Kaizen" }));

    expect(screen.getByRole("heading", { name: "Complete & Close Kaizen" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Verified Outcome \/ Results \*/i), {
      target: { value: "Optical sensor active, zero feeding delays verified across 3 shifts" },
    });

    fireEvent.click(screen.getByText("Confirm Closure"));

    await waitFor(() => {
      expect(api.transitionMaintenanceRequest).toHaveBeenCalledWith(
        50,
        expect.objectContaining({
          status: "COMPLETED",
          outcome: "Optical sensor active, zero feeding delays verified across 3 shifts",
          implementationStatus: "Fully Implemented",
        }),
      );
    });
  });
});
