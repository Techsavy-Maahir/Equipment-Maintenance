import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { EquipmentDetailPage } from "./EquipmentDetailPage";

vi.mock("../api", () => ({
  api: {
    getEquipmentById: vi.fn(),
    getEquipmentLocationHistory: vi.fn(),
    deactivateEquipment: vi.fn(),
  },
  handleApiError: (error) =>
    error.response?.data?.message || error.message || "An error occurred",
}));

const equipment = {
  id: 10421,
  code: "EQ-10421",
  name: "CNC Milling Center",
  serialNumber: "SN-9941-X",
  description: "High-precision vertical mill",
  criticality: "HIGH",
  status: "ACTIVE",
  purchaseDate: "2024-05-10T00:00:00.000Z",
  purchaseCost: "145000",
  warrantyStartDate: "2024-05-10T00:00:00.000Z",
  warrantyExpiryDate: "2027-05-10T00:00:00.000Z",
  warrantyStatus: "VALID",
  department: { name: "Machining" },
  location: { name: "Line A" },
  category: { name: "CNC Machine" },
};

const history = [{
  id: 1,
  equipmentId: equipment.id,
  fromLocation: { id: 1, name: "Plant A" },
  toLocation: { id: 2, name: "Line A" },
  changedAt: "2026-11-01T10:00:00.000Z",
}];

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("EquipmentDetailPage", () => {
  it("shows equipment, procurement, warranty, and location history", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue(history);

    render(
      <EquipmentDetailPage
        user={{ role: "VIEWER" }}
        equipmentId="10421"
      />,
    );

    expect(await screen.findByRole("heading", { name: "CNC Milling Center" })).toBeInTheDocument();
    expect(screen.getByText("SN-9941-X")).toBeInTheDocument();
    expect(screen.getByText("Machining")).toBeInTheDocument();
    expect(screen.getByText("Plant A")).toBeInTheDocument();
    expect(screen.getAllByText("Line A")).toHaveLength(2);
    expect(screen.getAllByText("Warranty Active")).toHaveLength(2);
    expect(screen.getByText("$145,000.00")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Deactivate" })).not.toBeInTheDocument();
  });

  it("shows an empty state when location history is empty", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue([]);

    render(<EquipmentDetailPage equipmentId="10421" />);

    expect(
      await screen.findByText("No location history has been recorded."),
    ).toBeInTheDocument();
  });

  it("rejects malformed equipment IDs without making API requests", async () => {
    render(<EquipmentDetailPage equipmentId="0" />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid equipment ID.");
    expect(api.getEquipmentById).not.toHaveBeenCalled();
    expect(api.getEquipmentLocationHistory).not.toHaveBeenCalled();
  });

  it("asks for confirmation before authorized users deactivate equipment", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue([]);
    api.deactivateEquipment.mockResolvedValue(equipment);
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <EquipmentDetailPage
        user={{ role: "MANAGER" }}
        equipmentId="10421"
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Deactivate" }));

    await waitFor(() => {
      expect(api.deactivateEquipment).toHaveBeenCalledWith(equipment.id);
    });
    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining("CNC Milling Center (EQ-10421)"),
    );
    expect(await screen.findByRole("status")).toHaveTextContent("EQ-10421 was deactivated.");
  });

  it("does not deactivate when confirmation is declined", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue([]);
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(
      <EquipmentDetailPage
        user={{ role: "ADMIN" }}
        equipmentId="10421"
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Deactivate" }));
    expect(api.deactivateEquipment).not.toHaveBeenCalled();
  });

  it("prevents repeated deactivation submissions while the request is pending", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue([]);
    let finishRequest;
    api.deactivateEquipment.mockReturnValue(
      new Promise((resolve) => {
        finishRequest = resolve;
      }),
    );
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <EquipmentDetailPage
        user={{ role: "ADMIN" }}
        equipmentId="10421"
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Deactivate" }));
    const pendingButton = await screen.findByRole("button", { name: "Deactivating..." });
    expect(pendingButton).toBeDisabled();
    expect(api.deactivateEquipment).toHaveBeenCalledOnce();

    finishRequest(equipment);
    await screen.findByRole("status");
  });

  it("shows a clear error if deactivation fails", async () => {
    api.getEquipmentById.mockResolvedValue(equipment);
    api.getEquipmentLocationHistory.mockResolvedValue([]);
    api.deactivateEquipment.mockRejectedValue(new Error("Service unavailable"));
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <EquipmentDetailPage
        user={{ role: "ADMIN" }}
        equipmentId="10421"
      />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Deactivate" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Service unavailable");
  });
});
