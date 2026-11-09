import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { EquipmentFormPage } from "./EquipmentFormPage";

vi.mock("../api", () => ({
  api: {
    getDepartments: vi.fn(),
    getLocations: vi.fn(),
    getCategories: vi.fn(),
    getEquipmentById: vi.fn(),
    createEquipment: vi.fn(),
    updateEquipment: vi.fn(),
  },
  handleApiError: (error) => (error.response?.data?.message || error.message || "An error occurred"),
}));

const mockDepartments = {
  items: [{ id: 1, name: "Machining Division" }],
  total: 1,
};

const mockLocations = {
  items: [{ id: 2, name: "Line A / Machining Hall" }],
  total: 1,
};

const mockCategories = {
  items: [{ id: 3, name: "CNC Machine" }],
  total: 1,
};

const mockExistingEquipment = {
  id: 10421,
  code: "EQ-10421",
  name: "CNC Milling Center #04",
  serialNumber: "SN-9941-X",
  description: "High-precision 5-axis vertical mill",
  criticality: "HIGH",
  status: "ACTIVE",
  departmentId: 1,
  locationId: 2,
  categoryId: 3,
  purchaseDate: "2024-05-10T00:00:00.000Z",
  purchaseCost: 145000,
  warrantyStartDate: "2024-05-10T00:00:00.000Z",
  warrantyExpiryDate: "2027-05-10T00:00:00.000Z",
  warrantyStatus: "VALID",
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("EquipmentFormPage", () => {
  it("renders create form mode and populates master data options", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.getLocations.mockResolvedValue(mockLocations);
    api.getCategories.mockResolvedValue(mockCategories);

    render(<EquipmentFormPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);

    expect(screen.getByText("Add New Equipment")).toBeInTheDocument();
    expect(await screen.findByText("Machining Division")).toBeInTheDocument();
    expect(screen.getByText("Line A / Machining Hall")).toBeInTheDocument();
    expect(screen.getByText("CNC Machine")).toBeInTheDocument();
  });

  it("submits new equipment creation with purchase and warranty fields", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.getLocations.mockResolvedValue(mockLocations);
    api.getCategories.mockResolvedValue(mockCategories);
    api.createEquipment.mockResolvedValue({ id: 999, ...mockExistingEquipment });

    const handleSuccess = vi.fn();
    const handleNavigate = vi.fn();

    render(
      <EquipmentFormPage
        user={{ name: "Alex Morgan", role: "ADMIN" }}
        onSuccess={handleSuccess}
        onNavigate={handleNavigate}
      />
    );

    expect(await screen.findByText("Machining Division")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Equipment ID \/ Code/i), {
      target: { value: "EQ-10499" },
    });
    fireEvent.change(screen.getByLabelText(/Equipment Name/i), {
      target: { value: "Automated Press AP-01" },
    });
    fireEvent.change(screen.getByLabelText(/Serial Number/i), {
      target: { value: "SN-AP-77" },
    });
    fireEvent.change(screen.getByLabelText(/Purchase Date/i), {
      target: { value: "2025-01-15" },
    });
    fireEvent.change(screen.getByLabelText(/Purchase Cost/i), {
      target: { value: "75000" },
    });
    fireEvent.change(screen.getByLabelText(/Warranty Start Date/i), {
      target: { value: "2025-01-15" },
    });
    fireEvent.change(screen.getByLabelText(/Warranty Expiry Date/i), {
      target: { value: "2027-01-15" },
    });

    const submitBtn = screen.getByRole("button", { name: "Create Asset" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.createEquipment).toHaveBeenCalledWith(
        expect.objectContaining({
          code: "EQ-10499",
          name: "Automated Press AP-01",
          serialNumber: "SN-AP-77",
          purchaseCost: 75000,
        })
      );
    });
  });

  it("validates that warranty expiry must be after warranty start date", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.getLocations.mockResolvedValue(mockLocations);
    api.getCategories.mockResolvedValue(mockCategories);

    render(<EquipmentFormPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);

    expect(await screen.findByText("Machining Division")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Equipment ID \/ Code/i), {
      target: { value: "EQ-10499" },
    });
    fireEvent.change(screen.getByLabelText(/Equipment Name/i), {
      target: { value: "Automated Press AP-01" },
    });
    fireEvent.change(screen.getByLabelText(/Warranty Start Date/i), {
      target: { value: "2026-05-10" },
    });
    fireEvent.change(screen.getByLabelText(/Warranty Expiry Date/i), {
      target: { value: "2025-05-10" },
    });

    const submitBtn = screen.getByRole("button", { name: "Create Asset" });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/Warranty expiry must be after warranty start date/i)
    ).toBeInTheDocument();
    expect(api.createEquipment).not.toHaveBeenCalled();
  });

  it("loads existing equipment data in edit mode and submits updates", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.getLocations.mockResolvedValue(mockLocations);
    api.getCategories.mockResolvedValue(mockCategories);
    api.getEquipmentById.mockResolvedValue(mockExistingEquipment);
    api.updateEquipment.mockResolvedValue({ ...mockExistingEquipment, name: "CNC Milling Center #04 (Updated)" });

    render(
      <EquipmentFormPage
        user={{ name: "Alex Morgan", role: "ADMIN" }}
        equipmentId={10421}
      />
    );

    expect(await screen.findByDisplayValue("EQ-10421")).toBeInTheDocument();
    expect(screen.getByDisplayValue("CNC Milling Center #04")).toBeInTheDocument();
    expect(screen.getByDisplayValue("SN-9941-X")).toBeInTheDocument();
    expect(screen.getByDisplayValue("145000")).toBeInTheDocument();
    expect(screen.getByText("VALID")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Equipment Name/i), {
      target: { value: "CNC Milling Center #04 (Updated)" },
    });

    const saveBtn = screen.getByRole("button", { name: "Save Changes" });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(api.updateEquipment).toHaveBeenCalledWith(
        10421,
        expect.objectContaining({
          name: "CNC Milling Center #04 (Updated)",
          serialNumber: "SN-9941-X",
        })
      );
    });
  });
});
