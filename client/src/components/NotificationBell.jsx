import { useEffect, useState } from "react";
import { api } from "../api";

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const response = await api.getNotifications();
      setNotifications(response.items || []);
      setUnreadCount(response.unreadCount || 0);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      const nextNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      );
      setNotifications(nextNotifications);
      setUnreadCount(nextNotifications.filter((item) => !item.isRead).length);
      setOpen(true);
    } catch {
      setOpen(true);
    }
  };

  const visibleNotifications = notifications.slice(0, 5);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="equipment-notifications"
        aria-label="Notifications"
        onClick={() => setOpen((current) => !current)}
        title="Notifications"
      >
        <MaterialIcon>notifications</MaterialIcon>
        {unreadCount > 0 ? <span className="equipment-notification-dot" /> : null}
      </button>

      {open ? (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            width: 320,
            background: "#fff",
            border: "1px solid #d6dbe4",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
            padding: 8,
            zIndex: 20,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "#374151" }}>
            Notifications ({unreadCount})
          </div>
          {visibleNotifications.length === 0 ? (
            <div style={{ padding: "8px 4px", color: "#6b7280" }}>No notifications</div>
          ) : (
            visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  borderBottom: "1px solid #eef2f7",
                  padding: "8px 6px",
                  opacity: notification.isRead ? 0.7 : 1,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>{notification.title}</div>
                <div style={{ fontSize: 12, color: "#4b5563", marginTop: 4 }}>{notification.message}</div>
                {!notification.isRead ? (
                  <button
                    type="button"
                    style={{ marginTop: 6, fontSize: 12, color: "#1d4ed8", background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
                    onClick={() => handleRead(notification.id)}
                  >
                    Mark read
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
