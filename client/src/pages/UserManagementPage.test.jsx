import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api } from "../api";
import { UserManagementPage } from "./UserManagementPage";

vi.mock("../api", () => ({
  api: {
    getUsers: vi.fn(),
    createUser: vi.fn(),
    updateUserRole: vi.fn(),
    deactivateUser: vi.fn(),
    reactivateUser: vi.fn(),
  },
  handleApiError: (error) => (error.response?.data?.message || error.message || "An error occurred"),
}));

const mockUsers = {
  items: [
    {
      id: "u-1",
      name: "Alex Morgan",
      email: "alex@plant.imms",
      role: "ADMIN",
      isActive: true,
      createdAt: "2026-01-15T10:00:00.000Z",
    },
    {
      id: "u-2",
      name: "Marcus Vance",
      email: "marcus@plant.imms",
      role: "TECHNICIAN",
      isActive: false,
      createdAt: "2026-02-10T10:00:00.000Z",
    },
  ],
  total: 2,
  page: 1,
  pageSize: 10,
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("UserManagementPage", () => {
  it("denies access to non-admin users", () => {
    render(<UserManagementPage user={{ name: "John Tech", role: "TECHNICIAN" }} />);

    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
    expect(screen.queryByText(/Manage system users, roles, and access permissions/i)).not.toBeInTheDocument();
  });

  it("loads and displays users for admin user", async () => {
    api.getUsers.mockResolvedValue(mockUsers);

    render(<UserManagementPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);

    expect(screen.getByRole("heading", { level: 1, name: "User Management" })).toBeInTheDocument();
    expect(await screen.findByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("alex@plant.imms")).toBeInTheDocument();
    expect(screen.getAllByText("ADMIN").length).toBeGreaterThan(0);
    expect(screen.getByText("Marcus Vance")).toBeInTheDocument();
    expect(screen.getByText("marcus@plant.imms")).toBeInTheDocument();
    expect(screen.getAllByText("TECHNICIAN").length).toBeGreaterThan(0);
  });

  it("filters users by role", async () => {
    api.getUsers.mockResolvedValue(mockUsers);

    render(<UserManagementPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);
    expect(await screen.findByText("Alex Morgan")).toBeInTheDocument();

    const roleSelect = screen.getByRole("combobox", { name: /Filter by role/i });
    fireEvent.change(roleSelect, { target: { value: "TECHNICIAN" } });

    await waitFor(() => {
      expect(api.getUsers).toHaveBeenCalledWith(
        expect.objectContaining({ role: "TECHNICIAN" })
      );
    });
  });

  it("opens create user modal and submits a new user", async () => {
    api.getUsers.mockResolvedValue(mockUsers);
    api.createUser.mockResolvedValue({
      id: "u-3",
      name: "Sarah Chen",
      email: "sarah@plant.imms",
      role: "MANAGER",
      isActive: true,
      createdAt: "2026-03-01T10:00:00.000Z",
    });

    render(<UserManagementPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);
    expect(await screen.findByText("Alex Morgan")).toBeInTheDocument();

    const addBtn = screen.getByRole("button", { name: /Add User/i });
    fireEvent.click(addBtn);

    expect(screen.getByText("Add New User")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Full Name \*/i), {
      target: { value: "Sarah Chen" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address \*/i), {
      target: { value: "sarah@plant.imms" },
    });
    fireEvent.change(screen.getByLabelText(/^Role \*/i), {
      target: { value: "MANAGER" },
    });
    fireEvent.change(screen.getByLabelText(/Password \(min\. 8 characters\) \*/i), {
      target: { value: "Password123!" },
    });

    const submitBtn = screen.getByRole("button", { name: /^Create User/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.createUser).toHaveBeenCalledWith({
        name: "Sarah Chen",
        email: "sarah@plant.imms",
        role: "MANAGER",
        password: "Password123!",
      });
    });
  });

  it("opens change role modal and submits role update", async () => {
    api.getUsers.mockResolvedValue(mockUsers);
    api.updateUserRole.mockResolvedValue({
      id: "u-2",
      name: "Marcus Vance",
      email: "marcus@plant.imms",
      role: "MANAGER",
      isActive: false,
    });

    render(<UserManagementPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);
    expect(await screen.findByText("Marcus Vance")).toBeInTheDocument();

    const editRoleBtn = screen.getByRole("button", { name: /Change role for Marcus Vance/i });
    fireEvent.click(editRoleBtn);

    expect(screen.getByText("Change User Role")).toBeInTheDocument();

    const roleSelect = screen.getByLabelText(/Select Role \*/i);
    fireEvent.change(roleSelect, { target: { value: "MANAGER" } });

    const submitBtn = screen.getByRole("button", { name: /^Update Role/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(api.updateUserRole).toHaveBeenCalledWith("u-2", "MANAGER");
    });
  });

  it("handles self-deactivation rejection error", async () => {
    api.getUsers.mockResolvedValue(mockUsers);
    const err = new Error("Administrators cannot deactivate their own account");
    err.response = {
      data: {
        message: "Administrators cannot deactivate their own account.",
      },
    };
    api.deactivateUser.mockRejectedValue(err);

    render(<UserManagementPage user={{ name: "Alex Morgan", role: "ADMIN" }} />);
    expect(await screen.findByText("Alex Morgan")).toBeInTheDocument();

    const deactivateBtn = screen.getByRole("button", { name: /Deactivate Alex Morgan/i });
    fireEvent.click(deactivateBtn);

    expect(screen.getByText("Confirm User Deactivation")).toBeInTheDocument();

    const confirmBtn = screen.getByRole("button", { name: /^Deactivate User/i });
    fireEvent.click(confirmBtn);

    expect(
      await screen.findByText(/Administrators cannot deactivate their own account/i)
    ).toBeInTheDocument();
  });
});
