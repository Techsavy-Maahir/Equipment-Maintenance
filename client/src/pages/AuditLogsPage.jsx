import { useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./AuditLogsPage.css";

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function formatTimestamp(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRecordCode(log) {
  const entityType = log.entityType || "";
  const id = log.entityId;

  if (entityType === "MaintenanceRequest") {
    return `REQ-2026-${String(id).padStart(4, "0")}`;
  }
  if (entityType === "WorkOrder") {
    return `WO-2026-${String(id).padStart(4, "0")}`;
  }
  if (entityType === "Equipment") {
    return `EQ-${String(id).padStart(4, "0")}`;
  }
  if (entityType === "EquipmentCategory") {
    return `CAT-${String(id).padStart(3, "0")}`;
  }
  return `${entityType.slice(0, 3).toUpperCase()}-${id}`;
}

function getActionPresentation(action) {
  const act = (action || "").toUpperCase();

  if (act.includes("APPROV") || act.includes("CLOSE") || act.includes("COMPLET")) {
    return {
      label: act.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
      bulletClass: "audit-bullet-green",
      hasBullet: true,
    };
  }
  if (act.includes("REJECT") || act.includes("CANCEL") || act.includes("DEACTIVAT")) {
    return {
      label: act.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
      bulletClass: "audit-bullet-red",
      hasBullet: true,
    };
  }
  if (act.includes("START") || act.includes("ASSIGN") || act.includes("CREATE")) {
    return {
      label: act.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
      bulletClass: "audit-bullet-blue",
      hasBullet: true,
    };
  }
  return {
    label: act.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()),
    bulletClass: "audit-bullet-gray",
    hasBullet: false,
  };
}

export function AuditLogsPage({ user, onNavigate = () => {} }) {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [userFilter, setUserFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canView = user?.role === "ADMIN" || user?.role === "MANAGER";

  const loadLogs = async (nextPage = page) => {
    try {
      setLoading(true);
      setError("");
      const response = await api.getAuditLogs({
        page: nextPage,
        pageSize: 10,
        search: searchTerm.trim() || undefined,
      });
      setLogs(response.items || []);
      setTotal(response.total || 0);
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canView) return;
    void loadLogs(page);
  }, [page, searchTerm, canView]);

  // Client side filtering for action type and user dropdowns
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchAction =
        actionFilter === "ALL" || log.action === actionFilter;
      const matchUser =
        userFilter === "ALL" || log.user?.name === userFilter || String(log.userId) === userFilter;
      return matchAction && matchUser;
    });
  }, [logs, actionFilter, userFilter]);

  // Unique users and actions for filters
  const uniqueUsers = useMemo(() => {
    const set = new Set();
    logs.forEach((l) => {
      if (l.user?.name) set.add(l.user.name);
    });
    return Array.from(set);
  }, [logs]);

  const uniqueActions = useMemo(() => {
    const set = new Set();
    logs.forEach((l) => {
      if (l.action) set.add(l.action);
    });
    return Array.from(set);
  }, [logs]);

  const totalPages = Math.max(1, Math.ceil(total / 10));

  if (!canView) {
    return (
      <div className="equipment-app">
        <aside className="equipment-sidebar">
          <div className="equipment-sidebar-top">
            <div className="equipment-brand">
              <span className="equipment-brand-mark" style={{ background: "#ffffff", padding: "2px", overflow: "hidden" }}>
                <img
                  src="/assets/zamil-steel-logo.png"
                  alt="Zamil Steel"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </span>
              <span className="equipment-brand-copy">
                <strong>Zamil Steel</strong>
                <small>Maintenance</small>
              </span>
            </div>
            <nav className="equipment-nav">
              <button type="button" className="equipment-nav-item" onClick={() => onNavigate("dashboard")}>
                <MaterialIcon>dashboard</MaterialIcon>
                <span>Dashboard</span>
              </button>
            </nav>
          </div>
        </aside>
        <main className="audit-main">
          <div className="audit-content">
            <div className="rq-empty-state">
              Audit log access is restricted to ADMIN and MANAGER users.
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="equipment-app">
      {/* ── Standard Navigation Sidebar ── */}
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a
            className="equipment-brand"
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("dashboard");
            }}
            aria-label="Zamil Steel Equipment Maintenance"
          >
            <span className="equipment-brand-mark" style={{ background: "#ffffff", padding: "2px", overflow: "hidden" }}>
              <img
                src="/assets/zamil-steel-logo.png"
                alt="Zamil Steel"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </span>
            <span className="equipment-brand-copy">
              <strong>Zamil Steel</strong>
              <small>Maintenance</small>
            </span>
          </a>

          <div
            className="rq-plant-facility-selector"
            style={{
              margin: "12px 16px",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                display: "block",
              }}
            >
              PLANT FACILITY
            </span>
            <strong style={{ fontSize: "12px", color: "#f8fafc" }}>Riverside Plant</strong>
            <small style={{ display: "block", fontSize: "10px", color: "#64748b" }}>
              Manufacturing operations
            </small>
          </div>

          <nav className="equipment-nav" aria-label="Main navigation">
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("dashboard")}>
              <MaterialIcon>dashboard</MaterialIcon>
              <span>Dashboard</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("equipment")}>
              <MaterialIcon>precision_manufacturing</MaterialIcon>
              <span>Equipment</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("requests")}>
              <MaterialIcon>build_circle</MaterialIcon>
              <span>Maintenance Requests</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("approvals")}>
              <MaterialIcon>verified</MaterialIcon>
              <span>Approvals</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("work-orders")}>
              <MaterialIcon>assignment</MaterialIcon>
              <span>Work Orders</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("preventive-maintenance")}>
              <MaterialIcon>event_repeat</MaterialIcon>
              <span>Preventive Maintenance</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("kaizen")}><MaterialIcon>trending_up</MaterialIcon><span>Kaizen</span></button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("relocation")}><MaterialIcon>sync_alt</MaterialIcon><span>Relocation</span></button>

            <div className="equipment-nav-divider" style={{ margin: "16px 16px 8px 16px", fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}>
              ADMINISTRATION
            </div>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("master-data")}>
              <MaterialIcon>database</MaterialIcon>
              <span>Master Data</span>
            </button>
            <button type="button" className="equipment-nav-item is-active" onClick={() => onNavigate("audit-logs")}>
              <MaterialIcon>history_edu</MaterialIcon>
              <span>Audit Log</span>
            </button>

            {user?.role === "ADMIN" && (
              <button type="button" className="equipment-nav-item" onClick={() => onNavigate("user-management")}>
                <MaterialIcon>manage_accounts</MaterialIcon>
                <span>User Management</span>
              </button>
            )}
          </nav>
        </div>

        <div className="equipment-sidebar-bottom" style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", color: "#10b981" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
            <span>All systems operational</span>
          </div>
          <small style={{ color: "#64748b", fontSize: "10px", display: "block", marginTop: "4px" }}>
            v2.4.0 © 2026 Zamil Steel Maintenance
          </small>
        </div>
      </aside>

      {/* ── Main Audit Log Workspace ── */}
      <main className="audit-main">
        {/* ── Topbar Breadcrumbs ── */}
        <header className="dash-topbar">
          <nav className="dash-breadcrumb" aria-label="Breadcrumb">
            <span>Administration</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span className="dash-breadcrumb-active">Audit Log</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <NotificationBell user={user} onNavigate={onNavigate} />
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
              {user?.name}
            </div>
          </div>
        </header>

        <div className="audit-content">
          {error && <div className="rq-form-error-banner">{error}</div>}

          {/* ── Header (Reference: media_1794817046778_42c8d278.jpg) ── */}
          <div className="audit-header">
            <h1 className="audit-title">Audit Log</h1>
            <p className="audit-sub">Record of system changes. Entries cannot be edited.</p>
          </div>

          {/* ── Filter Bar ── */}
          <div className="audit-filter-card">
            <div className="audit-search-box">
              <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>search</MaterialIcon>
              <input
                type="text"
                placeholder="Search by user, record ID, or action"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                aria-label="Search audit logs"
              />
            </div>

            <select
              className="audit-select"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              aria-label="Filter by action type"
            >
              <option value="ALL">All Action Types</option>
              {uniqueActions.map((act) => (
                <option key={act} value={act}>
                  {act.replace(/_/g, " ")}
                </option>
              ))}
            </select>

            <select
              className="audit-select"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              aria-label="Filter by user"
            >
              <option value="ALL">All Users</option>
              {uniqueUsers.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <div className="audit-date-picker">
              <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>calendar_today</MaterialIcon>
              <span>Current Cycle</span>
            </div>

            <button
              type="button"
              className="audit-btn-clear"
              onClick={() => {
                setSearchTerm("");
                setActionFilter("ALL");
                setUserFilter("ALL");
                setPage(1);
              }}
            >
              Clear filters
            </button>
          </div>

          {/* ── Table Card ── */}
          <div className="audit-table-card">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>TIMESTAMP</th>
                  <th>USER</th>
                  <th>ROLE</th>
                  <th>ACTION</th>
                  <th>RECORD</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>
                      Loading audit logs...
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>
                      No audit records found matching current criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const actionPres = getActionPresentation(log.action);
                    const userRole = (log.user?.role || "USER").toLowerCase();
                    const roleClass =
                      userRole === "admin"
                        ? "audit-role-admin"
                        : userRole === "manager"
                        ? "audit-role-manager"
                        : userRole === "technician"
                        ? "audit-role-technician"
                        : "audit-role-engineer";

                    return (
                      <tr key={log.id}>
                        <td>{formatTimestamp(log.createdAt)}</td>
                        <td>
                          <strong>{log.user?.name || "System"}</strong>
                        </td>
                        <td>
                          <span className={`audit-role-badge ${roleClass}`}>
                            {log.user?.role || "System"}
                          </span>
                        </td>
                        <td>
                          <span className="audit-action-cell">
                            {actionPres.hasBullet && (
                              <span className={`audit-bullet ${actionPres.bulletClass}`}>●</span>
                            )}
                            <span>{actionPres.label}</span>
                          </span>
                        </td>
                        <td>
                          <span className="audit-record-link">{formatRecordCode(log)}</span>
                        </td>
                        <td>
                          <span className="audit-details-cell" title={log.summary || log.details}>
                            {log.summary || log.details || "—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* ── Pagination ── */}
            <div className="pm-pagination">
              <span>
                Showing {filteredLogs.length > 0 ? (page - 1) * 10 + 1 : 0}–
                {Math.min(page * 10, total)} of {total}
              </span>

              <div className="pm-page-btns">
                <button
                  type="button"
                  className="pm-page-btn"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pageNo) => (
                  <button
                    key={pageNo}
                    type="button"
                    className={`pm-page-btn ${pageNo === page ? "is-active" : ""}`}
                    onClick={() => setPage(pageNo)}
                  >
                    {pageNo}
                  </button>
                ))}
                <button
                  type="button"
                  className="pm-page-btn"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
