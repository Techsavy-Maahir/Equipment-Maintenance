import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { api } from "../api";
import { EquipmentListPage } from "./EquipmentListPage";

vi.mock("../api", () => ({
  api: {
    getEquipment: vi.fn(),
  },
  handleApiError: (error) => error.message,
}));

function createResponse(filters = {}) {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 8;

  return {
    items: [
      {
        id: page,
        code: `ASSET-${page}`,
        name: `Equipment ${page}`,
        status: "ACTIVE",
        criticality: "LOW",
        department: { name: "Operations" },
        location: { name: "Plant A" },
        category: { name: "Pumps" },
      },
    ],
    total: 17,
    page,
    pageSize,
    locations: [{ id: 2, name: "Plant A" }],
    categories: [{ id: 3, name: "Pumps" }],
  };
}

afterEach(() => {
  vi.useRealTimers();
  window.history.replaceState(null, "", "/");
  vi.clearAllMocks();
});

describe("EquipmentListPage", () => {
  it("loads filters from the URL and sends them to the API", async () => {
    window.history.replaceState(
      null,
      "",
      "/?search=CNC&status=ACTIVE&location=2&category=3&page=2&pageSize=8",
    );
    api.getEquipment.mockImplementation(async (filters) =>
      createResponse(filters),
    );

    render(<EquipmentListPage />);

    expect(await screen.findByText("ASSET-2")).toBeInTheDocument();
    expect(api.getEquipment).toHaveBeenCalledWith({
      search: "CNC",
      status: "ACTIVE",
      location: "2",
      category: "3",
      page: 2,
      pageSize: 8,
    });
  });

  it("debounces search for 300 ms before fetching and updates the URL", async () => {
    vi.useFakeTimers();
    api.getEquipment.mockImplementation(async (filters) =>
      createResponse(filters),
    );
    render(<EquipmentListPage />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(api.getEquipment).toHaveBeenCalledTimes(1);
    const callsBeforeSearch = api.getEquipment.mock.calls.length;

    fireEvent.change(screen.getByRole("searchbox", { name: "Search equipment" }), {
      target: { value: "CNC" },
    });
    expect(
      screen.getByRole("searchbox", { name: "Search equipment from header" }),
    ).toHaveValue("CNC");

    await act(async () => {
      vi.advanceTimersByTime(299);
    });
    expect(api.getEquipment).toHaveBeenCalledTimes(callsBeforeSearch);

    await act(async () => {
      vi.advanceTimersByTime(1);
      await Promise.resolve();
    });
    expect(api.getEquipment).toHaveBeenCalledWith(
      expect.objectContaining({ search: "CNC", page: 1 }),
    );
    expect(new URLSearchParams(window.location.search).get("search")).toBe("CNC");
  });

  it("shows filtered totals and fetches the selected page", async () => {
    api.getEquipment.mockImplementation(async (filters) =>
      createResponse(filters),
    );
    render(<EquipmentListPage />);

    expect(await screen.findByText("ASSET-1")).toBeInTheDocument();
    expect(screen.getByText("17 matching assets")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(await screen.findByText("ASSET-2")).toBeInTheDocument();
    expect(api.getEquipment).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2 }),
    );
    expect(new URLSearchParams(window.location.search).get("page")).toBe("2");
  });

  it("displays warranty status and opens details modal with full purchase & warranty info", async () => {
    const assetWithWarranty = {
      id: 1,
      code: "EQ-10421",
      name: "CNC Milling Center #04",
      status: "ACTIVE",
      criticality: "HIGH",
      department: { name: "Machining" },
      location: { name: "Line A" },
      category: { name: "CNC Machine" },
      purchaseDate: "2024-05-10T00:00:00.000Z",
      purchaseCost: 145000,
      warrantyStartDate: "2024-05-10T00:00:00.000Z",
      warrantyExpiryDate: "2027-05-10T00:00:00.000Z",
      warrantyStatus: "VALID",
    };

    api.getEquipment.mockResolvedValue({
      items: [assetWithWarranty],
      total: 1,
      page: 1,
      pageSize: 8,
      locations: [{ id: 2, name: "Line A" }],
      categories: [{ id: 3, name: "CNC Machine" }],
    });

    render(<EquipmentListPage />);

    expect(await screen.findByText("EQ-10421")).toBeInTheDocument();
    expect(screen.getByText("Warranty Active")).toBeInTheDocument();

    // Click view details button
    const viewBtn = screen.getByRole("button", {
      name: "View details for CNC Milling Center #04",
    });
    fireEvent.click(viewBtn);

    // Modal opens with purchase and warranty information
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /CNC Milling Center #04 \(EQ-10421\)/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("$145,000.00")).toBeInTheDocument();
    expect(screen.getByText("Procurement & Warranty Details")).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByRole("button", { name: "Close details" }));
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: /CNC Milling Center #04 \(EQ-10421\)/i,
      })
    ).not.toBeInTheDocument();
  });

  it("navigates from the existing details modal to the dedicated detail page", async () => {
    api.getEquipment.mockResolvedValue(createResponse());
    const onNavigate = vi.fn();

    render(<EquipmentListPage onNavigate={onNavigate} />);
    fireEvent.click(await screen.findByRole("button", { name: "View details for Equipment 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Open full details" }));

    expect(onNavigate).toHaveBeenCalledWith("equipment-detail-1");
    expect(
      screen.queryByRole("heading", { name: /Equipment 1 \(ASSET-1\)/i }),
    ).not.toBeInTheDocument();
  });
});
