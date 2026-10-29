import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { MasterDataPage } from "./MasterDataPage";

vi.mock("../api", () => ({
  api: {
    getDepartments: vi.fn(),
    getLocations: vi.fn(),
    getCategories: vi.fn(),
    createDepartment: vi.fn(),
    updateDepartment: vi.fn(),
    deactivateDepartment: vi.fn(),
    createLocation: vi.fn(),
    updateLocation: vi.fn(),
    deactivateLocation: vi.fn(),
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deactivateCategory: vi.fn(),
  },
  handleApiError: (error) => (error.response?.data?.message || error.message || "An error occurred"),
}));

const mockDepartments = {
  items: [
    {
      id: 1,
      name: "Operations",
      isActive: true,
      _count: { equipment: 5 },
    },
    {
      id: 2,
      name: "Packaging",
      isActive: false,
      _count: { equipment: 0 },
    },
  ],
  total: 2,
  page: 1,
  pageSize: 10,
};

const mockLocations = {
  items: [
    {
      id: 10,
      name: "Building A",
      isActive: true,
      _count: { equipment: 8 },
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
};

const mockCategories = {
  items: [
    {
      id: 20,
      name: "Centrifugal Pumps",
      isActive: true,
      _count: { equipment: 3 },
    },
  ],
  total: 1,
  page: 1,
  pageSize: 10,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("MasterDataPage", () => {
  it("renders departments tab by default and displays data from API", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);

    render(<MasterDataPage user={{ name: "Admin User", role: "ADMIN" }} />);

    expect(screen.getByRole("heading", { name: "Master Data" })).toBeInTheDocument();
    expect(await screen.findByText("Operations")).toBeInTheDocument();
    expect(screen.getByText("DEP-01")).toBeInTheDocument();
    expect(screen.getByText("Packaging")).toBeInTheDocument();
    expect(screen.getByText("DEP-02")).toBeInTheDocument();
  });

  it("switches tabs to Locations and Categories and requests respective APIs", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.getLocations.mockResolvedValue(mockLocations);
    api.getCategories.mockResolvedValue(mockCategories);

    render(<MasterDataPage user={{ name: "Admin User", role: "ADMIN" }} />);

    expect(await screen.findByText("Operations")).toBeInTheDocument();

    // Switch to Locations
    const locationsTab = screen.getByRole("tab", { name: /Locations/i });
    fireEvent.click(locationsTab);

    expect(await screen.findByText("Building A")).toBeInTheDocument();
    expect(screen.getByText("LOC-10")).toBeInTheDocument();
    expect(api.getLocations).toHaveBeenCalled();

    // Switch to Categories
    const categoriesTab = screen.getByRole("tab", { name: /Categories/i });
    fireEvent.click(categoriesTab);

    expect(await screen.findByText("Centrifugal Pumps")).toBeInTheDocument();
    expect(screen.getByText("CAT-20")).toBeInTheDocument();
    expect(api.getCategories).toHaveBeenCalled();
  });

  it("opens create modal and submits a new department", async () => {
    api.getDepartments.mockResolvedValue(mockDepartments);
    api.createDepartment.mockResolvedValue({
      id: 3,
      name: "Quality Control",
      isActive: true,
      _count: { equipment: 0 },
    });

    render(<MasterDataPage user={{ name: "Admin User", role: "ADMIN" }} />);
    expect(await screen.findByText("Operations")).toBeInTheDocument();

    const addBtn = screen.getByRole("button", { name: /Add Department/i });
    fireEvent.click(addBtn);

    expect(screen.getByText("Add New Department")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Name \*/i), {
      target: { value: "Quality Control" },
    });

    const submitBtn = screen.getByRole("button", { name: "Create Department" });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.createDepartment).toHaveBeenCalledWith({
        name: "Quality Control",
      });
    });
  });

  it("displays conflict error when location deactivation is blocked", async () => {
    api.getLocations.mockResolvedValue(mockLocations);
    const conflictError = new Error("Cannot deactivate location: 8 equipment items currently assigned");
    conflictError.response = {
      data: {
        message: "Cannot deactivate location: 8 equipment items currently assigned to it.",
      },
    };
    api.deactivateLocation.mockRejectedValue(conflictError);

    render(<MasterDataPage user={{ name: "Admin User", role: "ADMIN" }} initialTab="locations" />);

    expect(await screen.findByText("Building A")).toBeInTheDocument();

    // Click deactivate action button
    const deactivateBtn = screen.getByRole("button", { name: /Deactivate Building A/i });
    fireEvent.click(deactivateBtn);

    expect(screen.getByText("Confirm Deactivation")).toBeInTheDocument();

    const confirmDeactivateBtn = screen.getByRole("button", { name: "Deactivate" });
    fireEvent.click(confirmDeactivateBtn);

    expect(
      await screen.findByText(/Cannot deactivate location: 8 equipment items currently assigned/i)
    ).toBeInTheDocument();
  });
});
