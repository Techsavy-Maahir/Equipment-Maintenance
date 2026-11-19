import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApprovalsPage } from "./ApprovalsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    listMaintenanceRequests: vi.fn(),
    transitionMaintenanceRequest: vi.fn(),
  },
  handleApiError: (err) => err?.message || "Error",
}));

describe("ApprovalsPage", () => {
  const mockRequests = [
    {
      id: 412,
      requestType: "BREAKDOWN",
      status: "SUBMITTED",
      criticality: "HIGH",
      description: "Hydraulic leak on Line A",
      equipment: { id: 10, name: "Hydraulic Press HP-02", code: "EQ-10422" },
      requester: { id: 5, name: "Carlos Mendez", email: "carlos@example.com" },
      createdAt: "2026-10-12T08:00:00.000Z",
    },
  ];

  it("renders approval queue table and opens review decision modal", async () => {
    vi.mocked(api.listMaintenanceRequests).mockResolvedValue({
      items: mockRequests,
      total: 1,
    });
    vi.mocked(api.transitionMaintenanceRequest).mockResolvedValue({
      ...mockRequests[0],
      status: "APPROVED",
    });

    render(<ApprovalsPage user={{ name: "Alex Morgan", role: "MANAGER" }} />);

    expect(screen.getByRole("heading", { name: "Approval Queue" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("REQ-2026-0412")).toBeInTheDocument();
      expect(screen.getByText("Hydraulic Press HP-02")).toBeInTheDocument();
      expect(screen.getByText("Carlos Mendez")).toBeInTheDocument();
    });

    const reviewBtn = screen.getByRole("button", { name: "Review" });
    await userEvent.click(reviewBtn);

    expect(screen.getByRole("heading", { name: /Review Request/i })).toBeInTheDocument();

    const approveBtn = screen.getByRole("button", { name: "Approve Request" });
    await userEvent.click(approveBtn);

    await waitFor(() => {
      expect(api.transitionMaintenanceRequest).toHaveBeenCalledWith(412, {
        status: "APPROVED",
        comment: undefined,
      });
    });
  });
});
