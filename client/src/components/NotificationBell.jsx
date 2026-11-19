import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../api";

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

/**
 * Priority color rules per IMMS specification:
 * RED   – Immediate attention: Overdue PM or Critical maintenance requiring immediate action.
 * BLUE  – Medium priority: Upcoming PM requiring attention soon.
 * GREEN – Okay: No immediate PM action required; on schedule.
 */
export function getNotificationPriority(notification) {
  if (!notification) return "green";
  const { kind, occurrence, dueDate } = notification;

  // OVERDUE kind → RED
  if (kind === "OVERDUE") return "red";

  // If due date has passed → RED
  if (dueDate) {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (due < today) return "red";
  }

  // Occurrence marked as MISSED or OVERDUE → RED
  if (occurrence) {
    if (occurrence.status === "MISSED") return "red";
    if (occurrence.dueDate) {
      const due = new Date(occurrence.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (due < today && occurrence.status !== "COMPLETED" && occurrence.status !== "CANCELLED") {
        return "red";
      }
    }
  }

  // REMINDER kind or upcoming PM → BLUE
  if (kind === "REMINDER") return "blue";

  // ALERT or fallback → GREEN (informational / okay)
  return "green";
}

const PRIORITY_CONFIG = {
  red: {
    color: "#dc2626",
    dotBg: "#dc2626",
    badgeBg: "#fef2f2",
    badgeBorder: "#fecaca",
    badgeColor: "#b91c1c",
    label: "Immediate Attention",
    shortLabel: "Overdue",
  },
  blue: {
    color: "#2563eb",
    dotBg: "#2563eb",
    badgeBg: "#eff6ff",
    badgeBorder: "#bfdbfe",
    badgeColor: "#1d4ed8",
    label: "Medium Priority",
    shortLabel: "Upcoming",
  },
  green: {
    color: "#15803d",
    dotBg: "#10b981",
    badgeBg: "#f0fdf4",
    badgeBorder: "#bbf7d0",
    badgeColor: "#15803d",
    label: "Okay / Normal",
    shortLabel: "Okay",
  },
};

/**
 * Determine the overall indicator color across all notifications:
 * - If any unread notification is RED  → RED
 * - Else if any unread notification is BLUE → BLUE
 * - Else if any unread notification is GREEN → GREEN
 * - If NO unread notifications exist → GREEN (Okay: No action required)
 */
export function getOverallPriority(notifications) {
  const unread = (notifications || []).filter((n) => !n.isRead);
  if (unread.length === 0) return "green"; // All okay
  if (unread.some((n) => getNotificationPriority(n) === "red")) return "red";
  if (unread.some((n) => getNotificationPriority(n) === "blue")) return "blue";
  return "green";
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationBell({ onNavigate }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getNotifications();
      const items = response?.items || [];
      const count = response?.unreadCount ?? items.filter((n) => !n.isRead).length;
      setNotifications(items);
      setUnreadCount(count);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  // Refresh notifications when window regains focus
  useEffect(() => {
    const handleFocus = () => {
      void loadNotifications();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadNotifications]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return undefined;
    function handleOutsideClick(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleRead = async (notification) => {
    if (notification.isRead) return;
    try {
      await api.markNotificationRead(notification.id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
      // silently ignore mark-read failures
    }
  };

  const handleNotificationClick = async (notification) => {
    await handleRead(notification);
    if (onNavigate) {
      onNavigate("preventive-maintenance");
    }
    setOpen(false);
  };

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    const unread = notifications.filter((n) => !n.isRead);
    await Promise.allSettled(unread.map((n) => api.markNotificationRead(n.id)));
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const overallPriority = getOverallPriority(notifications);
  const overallConfig = PRIORITY_CONFIG[overallPriority];

  const visibleNotifications = notifications.slice(0, 8);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        className="equipment-notifications dash-bell-btn"
        aria-label={`Notifications: ${unreadCount} unread. Status: ${overallConfig.label}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleToggle}
        title={`Notifications (${unreadCount} unread) – Status: ${overallConfig.label}`}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          padding: 0,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 9,
          color: "#475569",
          cursor: "pointer",
          outline: "none",
          transition: "background 150ms, border-color 150ms",
        }}
      >
        <MaterialIcon style={{ fontSize: 20 }}>notifications</MaterialIcon>

        {/* Priority Status Dot */}
        <span
          data-testid="notification-priority-dot"
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: unreadCount > 0 ? 14 : 8,
            height: unreadCount > 0 ? 14 : 8,
            borderRadius: "50%",
            background: overallConfig.dotBg,
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1,
            pointerEvents: "none",
            boxShadow: `0 0 0 1px ${overallConfig.badgeBorder}`,
          }}
          aria-hidden="true"
        >
          {unreadCount > 0 ? (unreadCount > 9 ? "9+" : unreadCount) : ""}
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notifications panel"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 380,
            maxHeight: 520,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            boxShadow: "0 14px 36px rgba(15, 23, 42, 0.16)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 100,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid #e9eff6",
              background: "#ffffff",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#172033" }}>
                Notifications
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  background: overallConfig.badgeBg,
                  color: overallConfig.badgeColor,
                  border: `1px solid ${overallConfig.badgeBorder}`,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {unreadCount > 0 ? `${unreadCount} Unread` : "All Caught Up (Okay)"}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllRead}
                  style={{
                    fontSize: 11,
                    color: "#2563eb",
                    background: "transparent",
                    border: 0,
                    padding: 0,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Mark all read
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  color: "#64748b",
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Close notifications"
              >
                <MaterialIcon style={{ fontSize: 18 }}>close</MaterialIcon>
              </button>
            </div>
          </div>

          {/* Priority Color Legend Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 16px",
              background: "#f8fafc",
              borderBottom: "1px solid #e9eff6",
              flexShrink: 0,
              fontSize: 10,
              color: "#64748b",
            }}
          >
            <span style={{ fontWeight: 600, color: "#475569" }}>Priority:</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626", display: "inline-block" }} />
              <span>Red (Overdue)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
              <span>Blue (Upcoming)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              <span>Green (Okay)</span>
            </div>
          </div>

          {/* Notification list */}
          <div style={{ overflowY: "auto", flex: 1, maxHeight: 380 }}>
            {loading ? (
              <div style={{ padding: "28px 16px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
                Loading notifications…
              </div>
            ) : visibleNotifications.length === 0 ? (
              <div style={{ padding: "36px 20px", textAlign: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#f0fdf4",
                    color: "#15803d",
                    marginBottom: 10,
                  }}
                >
                  <MaterialIcon style={{ fontSize: 28 }}>check_circle</MaterialIcon>
                </span>
                <div style={{ fontWeight: 700, color: "#166534", fontSize: 14 }}>
                  All systems on schedule
                </div>
                <div style={{ color: "#4b5563", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                  No immediate preventive maintenance action required (Green – Okay).
                </div>
              </div>
            ) : (
              visibleNotifications.map((notification) => {
                const priority = getNotificationPriority(notification);
                const config = PRIORITY_CONFIG[priority];
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
                    style={{
                      display: "flex",
                      width: "100%",
                      textAlign: "left",
                      gap: 12,
                      padding: "12px 16px",
                      border: 0,
                      borderBottom: "1px solid #f1f5f9",
                      background: notification.isRead ? "#ffffff" : "#f8faff",
                      cursor: "pointer",
                      transition: "background 120ms ease",
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0f4ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = notification.isRead ? "#ffffff" : "#f8faff";
                    }}
                    aria-label={`${notification.title} – ${config.label}: ${notification.message}`}
                  >
                    {/* Priority Accent Dot */}
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        marginTop: 4,
                        flexShrink: 0,
                        background: notification.isRead ? "#cbd5e1" : config.dotBg,
                        boxShadow: notification.isRead ? "none" : `0 0 0 2px ${config.badgeBg}`,
                      }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: notification.isRead ? 600 : 750,
                            fontSize: 12,
                            color: notification.isRead ? "#64748b" : "#0f172a",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {notification.title}
                        </span>

                        <span
                          style={{
                            padding: "1px 6px",
                            borderRadius: 999,
                            fontSize: 9,
                            fontWeight: 700,
                            background: config.badgeBg,
                            color: config.badgeColor,
                            border: `1px solid ${config.badgeBorder}`,
                            flexShrink: 0,
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {config.shortLabel}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: 11,
                          color: "#475569",
                          marginTop: 4,
                          lineHeight: 1.45,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {notification.message}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 6,
                          fontSize: 10,
                          color: "#94a3b8",
                        }}
                      >
                        <span>{formatRelativeTime(notification.createdAt)}</span>
                        {!notification.isRead && (
                          <span style={{ color: "#2563eb", fontWeight: 600 }}>Click to review</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer: Navigate to PM occurrences */}
          <div
            style={{
              padding: "10px 16px",
              borderTop: "1px solid #e9eff6",
              background: "#ffffff",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (onNavigate) onNavigate("preventive-maintenance");
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                color: "#2563eb",
                fontSize: 12,
                fontWeight: 650,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <span>View Preventive Maintenance Occurrences</span>
              <MaterialIcon style={{ fontSize: 14 }}>arrow_forward</MaterialIcon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
