import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import NotificationBell, { getNotificationPriority, getOverallPriority } from "./NotificationBell";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    getNotifications: vi.fn(),
    markNotificationRead: vi.fn(),
  },
  handleApiError: (err) => err?.message || "API Error",
}));

describe("NotificationBell priority calculation", () => {
  it("classifies OVERDUE kind as red", () => {
    expect(getNotificationPriority({ kind: "OVERDUE" })).toBe("red");
  });

  it("classifies past due date as red", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(getNotificationPriority({ kind: "REMINDER", dueDate: yesterday.toISOString() })).toBe("red");
  });

  it("classifies future REMINDER kind as blue", () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 5);
    expect(getNotificationPriority({ kind: "REMINDER", dueDate: nextWeek.toISOString() })).toBe("blue");
  });

  it("classifies ALERT kind as green", () => {
    expect(getNotificationPriority({ kind: "ALERT" })).toBe("green");
  });

  it("computes overall priority: red when any unread is overdue", () => {
    const notifications = [
      { id: 1, kind: "REMINDER", isRead: false },
      { id: 2, kind: "OVERDUE", isRead: false },
    ];
    expect(getOverallPriority(notifications)).toBe("red");
  });

  it("computes overall priority: blue when unread items only have upcoming reminders", () => {
    const notifications = [
      { id: 1, kind: "REMINDER", isRead: false },
      { id: 2, kind: "ALERT", isRead: false },
    ];
    expect(getOverallPriority(notifications)).toBe("blue");
  });

  it("computes overall priority: green when all notifications are read or empty", () => {
    expect(getOverallPriority([])).toBe("green");
    expect(getOverallPriority([{ id: 1, kind: "OVERDUE", isRead: true }])).toBe("green");
  });
});

describe("NotificationBell component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders notification bell and toggles panel on click", async () => {
    vi.mocked(api.getNotifications).mockResolvedValue({
      items: [
        {
          id: 101,
          key: "notif-1",
          kind: "OVERDUE",
          dueDate: "2026-10-01T00:00:00.000Z",
          title: "Overdue: Hydraulic Press HP-02",
          message: "Seal inspection is overdue",
          createdAt: "2026-10-02T10:00:00.000Z",
          occurrenceId: 10,
          isRead: false,
          readAt: null,
          recipientId: 1,
          occurrence: null,
        },
      ],
      unreadCount: 1,
    });

    render(<NotificationBell onNavigate={vi.fn()} />);

    // Wait for notifications to load
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Notifications/i })).toBeInTheDocument();
    });

    const bellBtn = screen.getByRole("button", { name: /Notifications/i });
    expect(bellBtn).toHaveAttribute("aria-expanded", "false");

    // Click to open
    await userEvent.click(bellBtn);

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Notifications panel" })).toBeInTheDocument();
      expect(screen.getByText("Overdue: Hydraulic Press HP-02")).toBeInTheDocument();
    });

    // Priority dot reflects red for overdue
    const dot = screen.getByTestId("notification-priority-dot");
    expect(dot).toBeInTheDocument();
    expect(dot.style.background).toBe("rgb(220, 38, 38)"); // #dc2626 in rgb
  });

  it("shows green okay state when there are no unread notifications", async () => {
    vi.mocked(api.getNotifications).mockResolvedValue({
      items: [],
      unreadCount: 0,
    });

    render(<NotificationBell onNavigate={vi.fn()} />);

    await waitFor(() => {
      const dot = screen.getByTestId("notification-priority-dot");
      expect(dot.style.background).toBe("rgb(16, 185, 129)"); // #10b981
    });

    const bellBtn = screen.getByRole("button", { name: /Notifications/i });
    await userEvent.click(bellBtn);

    await waitFor(() => {
      expect(screen.getByText("All systems on schedule")).toBeInTheDocument();
      expect(screen.getByText(/Green – Okay/i)).toBeInTheDocument();
    });
  });

  it("marks single notification as read on click and navigates", async () => {
    const onNavigate = vi.fn();
    const notifItem = {
      id: 201,
      key: "notif-201",
      kind: "REMINDER",
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      title: "Upcoming: Spindle calibration",
      message: "Scheduled in 3 days",
      createdAt: new Date().toISOString(),
      occurrenceId: 20,
      isRead: false,
      readAt: null,
      recipientId: 1,
      occurrence: null,
    };

    vi.mocked(api.getNotifications).mockResolvedValue({
      items: [notifItem],
      unreadCount: 1,
    });
    vi.mocked(api.markNotificationRead).mockResolvedValue({ id: 201, isRead: true, readAt: new Date().toISOString() });

    render(<NotificationBell onNavigate={onNavigate} />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Notifications/i })).toBeInTheDocument();
    });

    // Open panel
    await userEvent.click(screen.getByRole("button", { name: /Notifications/i }));

    const itemBtn = await screen.findByText("Upcoming: Spindle calibration");
    await userEvent.click(itemBtn);

    // Should call API to mark read
    expect(api.markNotificationRead).toHaveBeenCalledWith(201);
    // Should navigate to preventive-maintenance
    expect(onNavigate).toHaveBeenCalledWith("preventive-maintenance");
  });

  it("marks all notifications as read when Mark all read is clicked", async () => {
    const items = [
      { id: 1, key: "k1", kind: "OVERDUE", isRead: false, title: "N1", message: "M1", createdAt: new Date().toISOString() },
      { id: 2, key: "k2", kind: "REMINDER", isRead: false, title: "N2", message: "M2", createdAt: new Date().toISOString() },
    ];
    vi.mocked(api.getNotifications).mockResolvedValue({ items, unreadCount: 2 });
    vi.mocked(api.markNotificationRead).mockResolvedValue({ id: 1, isRead: true });

    render(<NotificationBell onNavigate={vi.fn()} />);

    await userEvent.click(await screen.findByRole("button", { name: /Notifications/i }));

    const markAllBtn = await screen.findByRole("button", { name: /Mark all read/i });
    await userEvent.click(markAllBtn);

    expect(api.markNotificationRead).toHaveBeenCalledWith(1);
    expect(api.markNotificationRead).toHaveBeenCalledWith(2);

    await waitFor(() => {
      expect(screen.queryByText(/2 Unread/i)).not.toBeInTheDocument();
    });
  });

  it("closes dialog when Escape key is pressed", async () => {
    vi.mocked(api.getNotifications).mockResolvedValue({ items: [], unreadCount: 0 });

    render(<NotificationBell onNavigate={vi.fn()} />);

    const bellBtn = await screen.findByRole("button", { name: /Notifications/i });
    await userEvent.click(bellBtn);

    expect(screen.getByRole("dialog", { name: "Notifications panel" })).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Notifications panel" })).not.toBeInTheDocument();
    });
  });
});
