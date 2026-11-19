import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { RelocationPage } from "./RelocationPage";

vi.mock("../api", () => ({
  api: {
    getEquipment: vi.fn(),
    getLocations: vi.fn(),
    getEquipmentById: vi.fn(),
    getEquipmentLocationHistory: vi.fn(),
    createRelocation: vi.fn(),
    listRelocations: vi.fn(),
    getNotifications: vi.fn().mockResolvedValue({ items: [], unreadCount: 0 }),
  },
  handleApiError: (err) => err?.message || "An error occurred",
}));

const mockUser = {
  id: 1,
  name: "Site Admin",
  email: "admin@example.com",
  role: "ADMIN",
};

const mockEquipment = [
  { id: 10, name: "CNC Milling Station", code: "CNC-01", locationId: 1, location: { id: 1, name: "Bay A" } },
];

const mockLocations = [
  { id: 1, name: "Bay A", isActive: true },
  { id: 2, name: "Assembly Line 3", isActive: true },
];

const mockRelocations = [
  {
    id: 1,
    equipmentId: 10,
    equipment: { id: 10, code: "CNC-01", name: "CNC Milling Station" },
    fromLocationId: 1,
    fromLocation: { id: 1, name: "Bay A" },
    toLocationId: 2,
    toLocation: { id: 2, name: "Assembly Line 3" },
    reason: "Production rerouting for model year refresh",
    relocatedAt: "2026-11-15T12:00:00.000Z",
    relocatedBy: { id: 1, name: "Site Admin", role: "ADMIN" },
  },
];

describe("RelocationPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.getEquipment.mockResolvedValue({ items: mockEquipment });
    api.getLocations.mockResolvedValue({ items: mockLocations });
    api.getEquipmentById.mockResolvedValue(mockEquipment[0]);
    api.getEquipmentLocationHistory.mockResolvedValue([]);
    api.listRelocations.mockResolvedValue({
      items: mockRelocations,
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders relocation page and lists recorded relocations with reason and transfer trail", async () => {
    render(<RelocationPage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getAllByText("Equipment Relocation").length).toBeGreaterThan(0);
      expect(screen.getAllByText("CNC Milling Station").length).toBeGreaterThan(0);
      expect(screen.getByText("Production rerouting for model year refresh")).toBeInTheDocument();
      expect(screen.getAllByText("Bay A").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Assembly Line 3").length).toBeGreaterThan(0);
    });
  });

  it("submits a relocation request with mandatory reason", async () => {
    api.createRelocation.mockResolvedValue(mockRelocations[0]);

    render(<RelocationPage user={mockUser} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Destination Location \*/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Destination Location \*/i), {
      target: { value: "2" },
    });

    fireEvent.change(screen.getByLabelText(/Relocation Reason \*/i), {
      target: { value: "Reassigned to secondary machining unit" },
    });

    fireEvent.click(screen.getByText("Confirm Relocation"));

    await waitFor(() => {
      expect(api.createRelocation).toHaveBeenCalledWith({
        equipmentId: 10,
        toLocationId: 2,
        reason: "Reassigned to secondary machining unit",
      });
    });
  });
});
