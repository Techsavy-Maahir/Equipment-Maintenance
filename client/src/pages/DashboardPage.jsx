import { useCallback, useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./DashboardPage.css";

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function DashboardPage({ user, onNavigate = () => {} }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [stats, setStats] = useState({
    kpis: {
      totalEquipment: 0,
      operationalEquipment: 0,
      operationalPercentage: 0,
      activeBreakdowns: 0,
      openWorkOrders: 0,
      inProgressWorkOrders: 0,
      overduePm: 0,
      downtimeThisMonthHours: 0,
    },
    monthlyVolume: [],
    upcomingPm: [],
    recentWorkOrders: [],
  });

  const loadStats = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError("");
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadStats(false);
  }, [loadStats]);

  // Auto-refresh when tab/window regains focus or visibility (Task 5)
  useEffect(() => {
    const handleActive = () => {
      if (document.visibilityState === "visible") {
        void loadStats(true);
      }
    };
    window.addEventListener("focus", handleActive);
    document.addEventListener("visibilitychange", handleActive);
    return () => {
      window.removeEventListener("focus", handleActive);
      document.removeEventListener("visibilitychange", handleActive);
    };
  }, [loadStats]);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  // Filter recent work orders based on search and status
  const filteredWorkOrders = useMemo(() => {
    return (stats.recentWorkOrders || []).filter((wo) => {
      const matchSearch =
        !searchQuery ||
        wo.workOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.equipmentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wo.equipmentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        statusFilter === "ALL" || wo.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [stats.recentWorkOrders, searchQuery, statusFilter]);

  // Max value for bar chart scaling
  const maxVolume = useMemo(() => {
    let max = 20;
    (stats.monthlyVolume || []).forEach((m) => {
      max = Math.max(max, m.breakdown, m.preventive, m.kaizen, m.relocation);
    });
    return Math.ceil(max / 10) * 10;
  }, [stats.monthlyVolume]);

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

          <div className="rq-plant-facility-selector" style={{ margin: "12px 16px", padding: "8px 12px", background: "rgba(255,255,255,0.06)", borderRadius: "8px" }}>
            <span style={{ fontSize: "10px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block" }}>PLANT FACILITY</span>
            <strong style={{ fontSize: "12px", color: "#f8fafc" }}>Riverside Plant</strong>
            <small style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Manufacturing operations</small>
          </div>

          <nav className="equipment-nav" aria-label="Main navigation">
            <button
              type="button"
              className="equipment-nav-item is-active"
              onClick={() => onNavigate("dashboard")}
            >
              <MaterialIcon>dashboard</MaterialIcon>
              <span>Dashboard</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("equipment")}
            >
              <MaterialIcon>precision_manufacturing</MaterialIcon>
              <span>Equipment</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("requests")}
            >
              <MaterialIcon>build_circle</MaterialIcon>
              <span>Maintenance Requests</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("approvals")}
            >
              <MaterialIcon>verified</MaterialIcon>
              <span>Approvals</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("work-orders")}
            >
              <MaterialIcon>assignment</MaterialIcon>
              <span>Work Orders</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("preventive-maintenance")}
            >
              <MaterialIcon>event_repeat</MaterialIcon>
              <span>Preventive Maintenance</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("kaizen")}
            >
              <MaterialIcon>trending_up</MaterialIcon>
              <span>Kaizen</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("relocation")}
            >
              <MaterialIcon>sync_alt</MaterialIcon>
              <span>Relocation</span>
            </button>

            {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
              <>
                <div className="equipment-nav-divider" style={{ margin: "16px 16px 8px 16px", fontSize: "10px", color: "#64748b", textTransform: "uppercase" }}>
                  ADMINISTRATION
                </div>
                <button
                  type="button"
                  className="equipment-nav-item"
                  onClick={() => onNavigate("master-data")}
                >
                  <MaterialIcon>database</MaterialIcon>
                  <span>Master Data</span>
                </button>
                <button
                  type="button"
                  className="equipment-nav-item"
                  onClick={() => onNavigate("audit-logs")}
                >
                  <MaterialIcon>history_edu</MaterialIcon>
                  <span>Audit Log</span>
                </button>
              </>
            )}

            {user?.role === "ADMIN" && (
              <button
                type="button"
                className="equipment-nav-item"
                onClick={() => onNavigate("user-management")}
              >
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
          <small style={{ color: "#64748b", fontSize: "10px", display: "block", marginTop: "4px" }}>v2.4.0 © 2026 Zamil Steel Maintenance</small>
        </div>
      </aside>

      {/* ── Main Dashboard Workspace ── */}
      <main className="dash-main">
        {/* ── Topbar Breadcrumbs & Quick Search ── */}
        <header className="dash-topbar">
          <nav className="dash-breadcrumb" aria-label="Breadcrumb">
            <span>Workspace</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span className="dash-breadcrumb-active">Dashboard</span>
          </nav>

          <div className="dash-topbar-right">
            <div className="dash-search-box">
              <MaterialIcon style={{ fontSize: "18px" }}>search</MaterialIcon>
              <input
                type="text"
                placeholder="Search equipment, work orders..."
                aria-label="Global quick search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="dash-kbd">⌘ K</span>
            </div>

            <NotificationBell user={user} onNavigate={onNavigate} />

            <div className="dash-profile-pill" onClick={() => onNavigate("user-management")}>
              <div className="dash-avatar">{getInitials(user?.name || "Admin")}</div>
              <div className="dash-profile-text">
                <span className="dash-profile-name">{user?.name || "James Davis"}</span>
                <span className="dash-profile-role">{user?.role || "Maintenance Manager"}</span>
              </div>
              <MaterialIcon style={{ fontSize: "18px", color: "#94a3b8" }}>expand_more</MaterialIcon>
            </div>
          </div>
        </header>

        {/* ── Dashboard Content ── */}
        <div className="dash-content">
          {error && <div className="rq-form-error-banner">{error}</div>}

          {/* ── Page Header ── */}
          <div className="dash-header">
            <div>
              <h1 className="dash-header-title">Dashboard</h1>
              <p className="dash-header-sub">
                Monitor equipment performance and maintenance activities.
              </p>
            </div>

            <div className="dash-header-actions">
              <div className="dash-date-badge">
                <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>calendar_today</MaterialIcon>
                <span>{todayFormatted}</span>
                <MaterialIcon style={{ fontSize: "16px", color: "#94a3b8" }}>expand_more</MaterialIcon>
              </div>

              <button
                type="button"
                className="dash-btn-refresh"
                onClick={() => void loadStats(true)}
                disabled={loading || refreshing}
                title="Refresh dashboard metrics"
                aria-label="Refresh dashboard data"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  borderRadius: "9px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  color: "#475569",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <MaterialIcon style={{ fontSize: "16px" }}>sync</MaterialIcon>
                <span>{refreshing ? "Refreshing…" : "Refresh"}</span>
              </button>

              <button
                type="button"
                className="dash-btn-primary"
                onClick={() => onNavigate("work-orders")}
              >
                <span>New Work Order</span>
                <MaterialIcon style={{ fontSize: "18px" }}>arrow_forward</MaterialIcon>
              </button>
            </div>
          </div>

          {/* ── 6 KPI Cards Row ── */}
          <section className="dash-kpis-grid" aria-label="Key Performance Indicators">
            {/* Card 1: Total Equipment */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("equipment")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Total Equipment <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span className="dash-kpi-icon-wrap dash-kpi-icon-blue">
                  <MaterialIcon style={{ fontSize: "20px" }}>view_in_ar</MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : stats.kpis.totalEquipment}</div>
                <div className="dash-kpi-subtext">Across active lines</div>
              </div>
            </div>

            {/* Card 2: Operational */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("equipment")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Operational <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span className="dash-kpi-icon-wrap dash-kpi-icon-green">
                  <MaterialIcon style={{ fontSize: "20px" }}>check_circle</MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : stats.kpis.operationalEquipment}</div>
                <div className="dash-kpi-subtext is-green">{stats.kpis.operationalPercentage}% of all equipment</div>
              </div>
            </div>

            {/* Card 3: Active Breakdowns */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("requests")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Active Breakdowns <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span className="dash-kpi-icon-wrap dash-kpi-icon-red">
                  <MaterialIcon style={{ fontSize: "20px" }}>warning</MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : stats.kpis.activeBreakdowns}</div>
                <div className="dash-kpi-subtext is-red">
                  {stats.kpis.activeBreakdowns > 0 ? "Requires urgent attention" : "No active breakdowns"}
                </div>
              </div>
            </div>

            {/* Card 4: Open Work Orders */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("work-orders")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Open Work Orders <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span className="dash-kpi-icon-wrap dash-kpi-icon-blue">
                  <MaterialIcon style={{ fontSize: "20px" }}>assignment</MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : stats.kpis.openWorkOrders}</div>
                <div className="dash-kpi-subtext">
                  {stats.kpis.inProgressWorkOrders} currently in progress
                </div>
              </div>
            </div>

            {/* Card 5: Overdue PM */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("preventive-maintenance")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Overdue PM <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span
                  className={`dash-kpi-icon-wrap ${
                    stats.kpis.overduePm > 0 ? "dash-kpi-icon-red" : "dash-kpi-icon-green"
                  }`}
                >
                  <MaterialIcon style={{ fontSize: "20px" }}>
                    {stats.kpis.overduePm > 0 ? "warning" : "check_circle"}
                  </MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : stats.kpis.overduePm}</div>
                <div
                  className={`dash-kpi-subtext ${
                    stats.kpis.overduePm > 0 ? "is-red" : "is-green"
                  }`}
                >
                  {stats.kpis.overduePm > 0
                    ? `${stats.kpis.overduePm} require immediate attention (Red)`
                    : "0 Overdue · All PM on schedule (Green – Okay)"}
                </div>
              </div>
            </div>

            {/* Card 6: Downtime This Month */}
            <div
              className="dash-kpi-card"
              onClick={() => onNavigate("work-orders")}
              role="button"
              tabIndex={0}
            >
              <div className="dash-kpi-header">
                <span className="dash-kpi-title">
                  Downtime This Month <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
                </span>
                <span className="dash-kpi-icon-wrap dash-kpi-icon-blue">
                  <MaterialIcon style={{ fontSize: "20px" }}>timer</MaterialIcon>
                </span>
              </div>
              <div>
                <div className="dash-kpi-value">{loading ? "—" : `${stats.kpis.downtimeThisMonthHours} hrs`}</div>
                <div className="dash-kpi-subtext">Production line impact</div>
              </div>
            </div>
          </section>

          {/* ── Middle Section: Monthly Volume Chart + Upcoming PM ── */}
          <div className="dash-middle-grid">
            {/* Left: Maintenance Requests Overview */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div>
                  <h2 className="dash-card-title">Maintenance Requests Overview</h2>
                  <p className="dash-card-sub">Request volume by type · Last 6 months</p>
                </div>
                <span className="dash-date-badge" style={{ padding: "4px 10px", fontSize: "12px" }}>
                  Last 6 months
                </span>
              </div>

              <div className="dash-chart-container">
                <div className="dash-chart-bars-wrap">
                  {/* Y-axis ticks */}
                  <div className="dash-chart-y-axis">
                    <span>{maxVolume}</span>
                    <span>{Math.round(maxVolume * 0.66)}</span>
                    <span>{Math.round(maxVolume * 0.33)}</span>
                    <span>0</span>
                  </div>

                  {/* Horizontal gridlines */}
                  <div className="dash-chart-gridline" style={{ top: "10%" }}></div>
                  <div className="dash-chart-gridline" style={{ top: "43%" }}></div>
                  <div className="dash-chart-gridline" style={{ top: "76%" }}></div>

                  {/* Month columns */}
                  {(stats.monthlyVolume || []).map((m, idx) => {
                    const hB = Math.max(4, Math.round((m.breakdown / maxVolume) * 140));
                    const hP = Math.max(4, Math.round((m.preventive / maxVolume) * 140));
                    const hK = Math.max(4, Math.round((m.kaizen / maxVolume) * 140));
                    const hR = Math.max(4, Math.round((m.relocation / maxVolume) * 140));

                    return (
                      <div className="dash-chart-group" key={idx}>
                        <div className="dash-chart-group-bars">
                          <div
                            className="dash-chart-bar dash-bar-breakdown"
                            style={{ height: `${hB}px` }}
                            title={`Breakdown: ${m.breakdown}`}
                          ></div>
                          <div
                            className="dash-chart-bar dash-bar-preventive"
                            style={{ height: `${hP}px` }}
                            title={`Preventive: ${m.preventive}`}
                          ></div>
                          <div
                            className="dash-chart-bar dash-bar-kaizen"
                            style={{ height: `${hK}px` }}
                            title={`Kaizen: ${m.kaizen}`}
                          ></div>
                          <div
                            className="dash-chart-bar dash-bar-relocation"
                            style={{ height: `${hR}px` }}
                            title={`Relocation: ${m.relocation}`}
                          ></div>
                        </div>
                        <span className="dash-chart-label">{m.month}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="dash-chart-legend">
                  <div className="dash-legend-item">
                    <span className="dash-legend-dot dash-bar-breakdown"></span>
                    <span>Breakdown</span>
                  </div>
                  <div className="dash-legend-item">
                    <span className="dash-legend-dot dash-bar-preventive"></span>
                    <span>Preventive maintenance</span>
                  </div>
                  <div className="dash-legend-item">
                    <span className="dash-legend-dot dash-bar-kaizen"></span>
                    <span>Kaizen</span>
                  </div>
                  <div className="dash-legend-item">
                    <span className="dash-legend-dot dash-bar-relocation"></span>
                    <span>Relocation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Upcoming Preventive Maintenance */}
            <div className="dash-card">
              <div className="dash-card-header">
                <div>
                  <h2 className="dash-card-title">Upcoming Preventive Maintenance</h2>
                  <p className="dash-card-sub">
                    Overdue &amp; next 7 days
                    {stats.upcomingPm.length > 0
                      ? ` · ${stats.upcomingPm.length} occurrence${stats.upcomingPm.length !== 1 ? "s" : ""}`
                      : ""}
                  </p>
                </div>
                <button
                  type="button"
                  className="dash-card-link"
                  onClick={() => onNavigate("preventive-maintenance")}
                >
                  View All <MaterialIcon style={{ fontSize: "16px" }}>arrow_forward</MaterialIcon>
                </button>
              </div>

              <div className="dash-pm-list">
                {loading ? (
                  <div style={{ color: "#94a3b8", fontSize: "13px", textAlign: "center", padding: "24px 0" }}>
                    Loading upcoming maintenance…
                  </div>
                ) : stats.upcomingPm.length === 0 ? (
                  <div
                    className="dash-pm-empty-green"
                    style={{
                      textAlign: "center",
                      padding: "24px 16px",
                      background: "#f0fdf4",
                      borderRadius: "10px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#dcfce7",
                        color: "#15803d",
                        marginBottom: "6px",
                      }}
                    >
                      <MaterialIcon style={{ fontSize: "24px" }}>check_circle</MaterialIcon>
                    </span>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#166534" }}>
                      All maintenance on schedule
                    </div>
                    <div style={{ color: "#4b5563", fontSize: "11px", marginTop: "3px" }}>
                      No overdue or upcoming PM tasks due in the next 7 days.
                    </div>
                    <div style={{ marginTop: "6px" }}>
                      <span className="dash-status-badge dash-status-completed">
                        Green – Okay (Normal)
                      </span>
                    </div>
                  </div>
                ) : (
                  stats.upcomingPm.map((pm) => {
                    const isOverdue = pm.status === "Overdue";
                    const isDueToday = pm.status === "Due today";
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        className={`dash-pm-item dash-pm-item-btn${isOverdue ? " dash-pm-item-overdue" : ""}`}
                        onClick={() => onNavigate("preventive-maintenance")}
                        aria-label={`${pm.equipmentCode} – ${pm.activity || pm.equipmentName}, status: ${pm.status}`}
                      >
                        <div className="dash-pm-item-left">
                          <span className="dash-pm-code">{pm.equipmentCode}</span>
                          <span className="dash-pm-name">{pm.equipmentName}</span>
                          {pm.activity && (
                            <span className="dash-pm-activity">{pm.activity}</span>
                          )}
                          <span className="dash-pm-tech">
                            <MaterialIcon style={{ fontSize: "11px", verticalAlign: "middle" }}>person</MaterialIcon>
                            {" "}{pm.assignedTechnicianName || "Unassigned"}
                          </span>
                        </div>
                        <div className="dash-pm-item-right">
                          <span className="dash-pm-date">{formatDate(pm.dueDate)}</span>
                          <span
                            className={`dash-status-badge ${
                              isOverdue
                                ? "dash-status-overdue"
                                : isDueToday
                                ? "dash-status-due-today"
                                : "dash-status-scheduled"
                            }`}
                          >
                            {isOverdue && (
                              <MaterialIcon style={{ fontSize: "11px", marginRight: "2px" }}>warning</MaterialIcon>
                            )}
                            {pm.status}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ── Bottom Section: Recent Work Orders ── */}
          <div className="dash-card">
            <div className="dash-card-header" style={{ alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h2 className="dash-card-title" style={{ margin: 0 }}>Recent Work Orders</h2>
                <span
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "10px",
                  }}
                >
                  {stats.recentWorkOrders.length} records
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "13px",
                    color: "#334155",
                    background: "#ffffff",
                    outline: "none",
                  }}
                  aria-label="Filter work orders by status"
                >
                  <option value="ALL">All statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CLOSED">Closed</option>
                </select>

                <button
                  type="button"
                  className="dash-card-link"
                  onClick={() => onNavigate("work-orders")}
                >
                  View All <MaterialIcon style={{ fontSize: "16px" }}>arrow_forward</MaterialIcon>
                </button>
              </div>
            </div>

            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>WO NUMBER</th>
                    <th>EQUIPMENT</th>
                    <th>ASSIGNED TECHNICIAN</th>
                    <th>PRIORITY</th>
                    <th>STATUS</th>
                    <th>DUE DATE</th>
                    <th style={{ textAlign: "right" }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                        No work orders matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredWorkOrders.map((wo) => {
                      const prioClass =
                        wo.priority === "HIGH" || wo.priority === "CRITICAL"
                          ? "dash-prio-critical"
                          : wo.priority === "MEDIUM"
                          ? "dash-prio-medium"
                          : "dash-prio-low";

                      const statusClass =
                        wo.status === "IN_PROGRESS"
                          ? "dash-status-progress"
                          : wo.status === "COMPLETED" || wo.status === "CLOSED"
                          ? "dash-status-completed"
                          : "dash-status-pending";

                      return (
                        <tr key={wo.id}>
                          <td>
                            <a
                              href="#work-orders"
                              className="dash-wo-code"
                              onClick={(e) => {
                                e.preventDefault();
                                onNavigate("work-orders");
                              }}
                            >
                              {wo.workOrderNumber}
                            </a>
                          </td>
                          <td>
                            <strong>{wo.equipmentCode}</strong> · {wo.equipmentName}
                          </td>
                          <td>
                            <div className="dash-tech-cell">
                              <span className="dash-tech-avatar">
                                {getInitials(wo.assignedTechnicianName || "—")}
                              </span>
                              <span>{wo.assignedTechnicianName || "Unassigned"}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`dash-pill-priority ${prioClass}`}>
                              {wo.priority}
                            </span>
                          </td>
                          <td>
                            <span className={`dash-status-pill ${statusClass}`}>
                              <span style={{ fontSize: "10px" }}>•</span>
                              <span>{wo.status.replace("_", " ")}</span>
                            </span>
                          </td>
                          <td>{formatDate(wo.dueDate)}</td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              type="button"
                              onClick={() => onNavigate("work-orders")}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#64748b",
                                padding: "4px",
                              }}
                              aria-label="View work order details"
                            >
                              <MaterialIcon style={{ fontSize: "18px" }}>more_horiz</MaterialIcon>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="dash-table-footer">
              <span>Showing {filteredWorkOrders.length} of {stats.recentWorkOrders.length} open and recent work orders</span>
              <button
                type="button"
                className="dash-refresh-link"
                onClick={() => void loadStats(true)}
                disabled={loading || refreshing}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "transparent",
                  border: 0,
                  color: "#64748b",
                  cursor: "pointer",
                  fontSize: "11px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                }}
                aria-label="Refresh work orders and maintenance data"
              >
                <MaterialIcon style={{ fontSize: "16px" }}>sync</MaterialIcon>
                <span>{refreshing ? "Refreshing data…" : "Updated just now · Click to refresh"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
