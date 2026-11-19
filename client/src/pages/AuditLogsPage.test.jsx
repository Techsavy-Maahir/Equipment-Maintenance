import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AuditLogsPage } from "./AuditLogsPage";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getAuditLogs: vi.fn(),
  },
  handleApiError: (err) => err?.message || "Error",
}));

describe("AuditLogsPage", () => {
  const mockLogs = [
    {
      id: 1,
      action: "MAINTENANCE_REQUEST_STATUS_CHANGED",
      entityType: "MaintenanceRequest",
      entityId: 412,
      summary: "Approved request with emergency authorization",
      createdAt: "2026-10-12T10:02:00.000Z",
      user: { id: 2, name: "Alex Morgan", role: "MANAGER" },
    },
  ];

  it("renders audit log list and filters by search term", async () => {
    vi.mocked(api.getAuditLogs).mockResolvedValue({
      items: mockLogs,
      total: 1,
    });

    render(<AuditLogsPage user={{ name: "Alex Morgan", role: "MANAGER" }} />);

    expect(screen.getByRole("heading", { name: "Audit Log" })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("REQ-2026-0412")).toBeInTheDocument();
      expect(screen.getByText("Approved request with emergency authorization")).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText("Search audit logs");
    await userEvent.type(searchInput, "412");

    await waitFor(() => {
      expect(api.getAuditLogs).toHaveBeenCalledWith(
        expect.objectContaining({ search: "412" }),
      );
    });
  });
});
