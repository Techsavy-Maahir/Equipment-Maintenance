import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { api } from "../api";
import { RequestsPage } from "./RequestsPage";

vi.mock("../api", () => ({
  api: {
    listMaintenanceRequests: vi.fn(),
    createMaintenanceRequest: vi.fn(),
    getEquipment: vi.fn(),
  },
  handleApiError: (error) =>
    error?.response?.data?.message || error?.message || "An error occurred",
}));

const mockRequestsResponse = {
  items: [
    {
      id: 412,
      requestType: "BREAKDOWN",
      status: "UNDER_REVIEW",
      criticality: "HIGH",
      description: "Hydraulic pump pressure dropped significantly",
      createdAt: "2026-11-10T10:00:00.000Z",
      equipment: {
        id: 1,
        code: "EQ-10422",
        name: "Hydraulic Press HP-02",
        isDeactivated: false,
      },
      requester: {
        id: 2,
        name: "Carlos Mendez",
        email: "carlos@example.com",
        role: "TECHNICIAN",
      },
      reviewer: null,
    },
    {
      id: 409,
      requestType: "PREVENTIVE",
      status: "APPROVED",
      criticality: "MEDIUM",
      description: "Quarterly lubrication and belt inspection",
      createdAt: "2026-11-09T08:30:00.000Z",
      equipment: {
        id: 2,
        code: "EQ-10421",
        name: "CNC Milling Center #04",
        isDeactivated: false,
      },
      requester: {
        id: 3,
        name: "David Chen",
        email: "david@example.com",
        role: "TECHNICIAN",
      },
      reviewer: null,
    },
  ],
  total: 2,
  page: 1,
  pageSize: 10,
};

const mockEquipmentList = {
  items: [
    {
      id: 1,
      code: "EQ-10422",
      name: "Hydraulic Press HP-02",
      status: "ACTIVE",
      isDeactivated: false,
    },
    {
      id: 2,
      code: "EQ-10421",
      name: "CNC Milling Center #04",
      status: "ACTIVE",
      isDeactivated: false,
    },
  ],
  total: 2,
  page: 1,
  pageSize: 100,
};

beforeEach(() => {
  vi.clearAllMocks();
  api.listMaintenanceRequests.mockResolvedValue(mockRequestsResponse);
  api.getEquipment.mockResolvedValue(mockEquipmentList);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("RequestsPage", () => {
  it("renders page header and request items from the API", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Maintenance Requests" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Hydraulic Press HP-02")).toBeInTheDocument();
    expect(screen.getByText("CNC Milling Center #04")).toBeInTheDocument();
    expect(screen.getByText("REQ-2026-0412")).toBeInTheDocument();
    expect(screen.getByText("REQ-2026-0409")).toBeInTheDocument();
  });

  it("filters by request type tabs", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    const breakdownTab = screen.getByRole("tab", { name: /^Breakdown/ });
    fireEvent.click(breakdownTab);

    await waitFor(() => {
      expect(api.listMaintenanceRequests).toHaveBeenCalledWith(
        expect.objectContaining({ requestType: "BREAKDOWN" }),
      );
    });
  });

  it("filters by status dropdown", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    const statusSelect = screen.getByLabelText("Filter by status");
    fireEvent.change(statusSelect, { target: { value: "UNDER_REVIEW" } });

    await waitFor(() => {
      expect(api.listMaintenanceRequests).toHaveBeenCalledWith(
        expect.objectContaining({ status: "UNDER_REVIEW" }),
      );
    });
  });

  it("opens the breakdown modal and loads active equipment options", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    fireEvent.click(screen.getByRole("button", { name: /New Breakdown Request/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole("heading", { level: 2, name: "New Breakdown Request" }),
    ).toBeInTheDocument();

    const select = await within(dialog).findByRole("combobox", { name: /^Equipment/i });
    expect(select).toBeInTheDocument();
    expect(within(dialog).getByText(/EQ-10422 · Hydraulic Press HP-02/)).toBeInTheDocument();
  });

  it("validates required fields on breakdown submission", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    fireEvent.click(screen.getByRole("button", { name: /New Breakdown Request/i }));

    const dialog = screen.getByRole("dialog");
    // Wait for equipment to finish loading so the submit button is enabled
    await within(dialog).findByRole("combobox", { name: /^Equipment/i });

    const submitBtn = within(dialog).getByRole("button", { name: /Submit Breakdown/i });
    fireEvent.click(submitBtn);

    expect(await within(dialog).findByText("Please select equipment.")).toBeInTheDocument();
    expect(within(dialog).getByText("Description is required.")).toBeInTheDocument();
    expect(api.createMaintenanceRequest).not.toHaveBeenCalled();
  });

  it("submits a breakdown request successfully and shows success banner", async () => {
    api.createMaintenanceRequest.mockResolvedValue({
      id: 413,
      requestType: "BREAKDOWN",
      status: "SUBMITTED",
      criticality: "HIGH",
    });

    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    fireEvent.click(screen.getByRole("button", { name: /New Breakdown Request/i }));

    const dialog = screen.getByRole("dialog");
    const equipSelect = await within(dialog).findByRole("combobox", { name: /^Equipment/i });
    fireEvent.change(equipSelect, { target: { value: "1" } });

    const descInput = within(dialog).getByLabelText(/^Description/i);
    fireEvent.change(descInput, {
      target: { value: "Cooling fluid pump stopped working unexpectedly." },
    });

    const submitBtn = within(dialog).getByRole("button", { name: /Submit Breakdown/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.createMaintenanceRequest).toHaveBeenCalledWith({
        requestType: "BREAKDOWN",
        equipmentId: 1,
        description: "Cooling fluid pump stopped working unexpectedly.",
        criticality: "HIGH",
        problem: undefined,
      });
    });

    expect(
      await screen.findByText(/Breakdown request submitted successfully/i),
    ).toBeInTheDocument();
  });

  it("handles server submission errors cleanly", async () => {
    api.createMaintenanceRequest.mockRejectedValue({
      response: {
        data: {
          message: "Equipment is currently under maintenance",
        },
      },
    });

    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    fireEvent.click(screen.getByRole("button", { name: /New Breakdown Request/i }));

    const dialog = screen.getByRole("dialog");
    const equipSelect = await within(dialog).findByRole("combobox", { name: /^Equipment/i });
    fireEvent.change(equipSelect, { target: { value: "1" } });

    const descInput = within(dialog).getByLabelText(/^Description/i);
    fireEvent.change(descInput, {
      target: { value: "Oil leak detected on main cylinder seal." },
    });

    const submitBtn = within(dialog).getByRole("button", { name: /Submit Breakdown/i });
    fireEvent.click(submitBtn);

    expect(
      await within(dialog).findByText("Equipment is currently under maintenance"),
    ).toBeInTheDocument();
  });

  it("closes the modal when clicking Cancel", async () => {
    render(<RequestsPage user={{ role: "MANAGER", name: "Alex Morgan" }} />);

    await screen.findByText("Hydraulic Press HP-02");

    fireEvent.click(screen.getByRole("button", { name: /New Breakdown Request/i }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

