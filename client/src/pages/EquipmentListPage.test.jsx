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
});
