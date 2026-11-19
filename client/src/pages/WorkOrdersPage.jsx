import { useCallback, useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./RequestsPage.css";
import "./WorkOrdersPage.css";

const PAGE_SIZE = 10;

function MaterialIcon({ children, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{children}</span>;
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function initials(name) {
  return (name || "?").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function statusDetails(status) {
  const values = {
    OPEN: ["Open", "wo-status--open"],
    ASSIGNED: ["Assigned", "wo-status--assigned"],
    IN_PROGRESS: ["In Progress", "wo-status--progress"],
    COMPLETED: ["Completed", "wo-status--completed"],
    CLOSED: ["Closed", "wo-status--closed"],
  };
  return values[status] || [status || "Unknown", ""];
}

function priorityDetails(priority) {
  const values = {
    HIGH: ["High", "rq-crit--high"],
    MEDIUM: ["Medium", "rq-crit--medium"],
    LOW: ["Low", "rq-crit--low"],
  };
  return values[priority] || ["—", ""];
}

function WorkOrderDetails({ order, onClose, canExecute, canClose }) {
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState(false);

  async function performAction(action) {
    if (busy) return;
    setBusy(true);
    setActionError("");
    try {
      if (action === "start") await api.startWorkOrder(order.id);
      if (action === "complete") await api.completeWorkOrder(order.id);
      if (action === "close") await api.closeWorkOrder(order.id);
      onClose(true);
    } catch (error) {
      setActionError(handleApiError(error));
    } finally {
      setBusy(false);
    }
  }

  const [statusLabel, statusClass] = statusDetails(order.status);
  const [priorityLabel, priorityClass] = priorityDetails(order.maintenanceRequest?.criticality);

  return (
    <div className="rq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="wo-detail-title">
      <div className="rq-modal rq-detail-modal wo-detail-modal">
        <header className="rq-modal-header">
          <div className="rq-modal-header-left">
            <span className="rq-modal-icon wo-modal-icon"><MaterialIcon>assignment</MaterialIcon></span>
            <div>
              <h2 id="wo-detail-title">{order.workOrderNumber}</h2>
              <p>Work order details and execution</p>
            </div>
          </div>
          <button type="button" className="rq-modal-close" onClick={() => onClose(false)} aria-label="Close">
            <MaterialIcon>close</MaterialIcon>
          </button>
        </header>

        <div className="rq-modal-body">
          {actionError && <p className="rq-form-error-banner" role="alert">{actionError}</p>}

          <section className="rq-detail-section">
            <h3>Work order information</h3>
            <div className="rq-detail-grid">
              <div><span className="rq-detail-label">Status</span><span className={`rq-status-badge ${statusClass}`}>{statusLabel}</span></div>
              <div><span className="rq-detail-label">Priority</span><strong className={priorityClass}>{priorityLabel}</strong></div>
              <div><span className="rq-detail-label">Equipment</span><strong>{order.equipment?.name || "—"}</strong><small>{order.equipment?.code || ""}</small></div>
              <div><span className="rq-detail-label">Equipment status</span><strong>{(order.equipment?.status || "—").replaceAll("_", " ")}</strong></div>
              <div><span className="rq-detail-label">Request</span><strong>REQ-{String(order.maintenanceRequestId).padStart(4, "0")}</strong><small>{order.maintenanceRequest?.requestType || ""}</small></div>
              <div><span className="rq-detail-label">Assigned technician</span><strong>{order.assignedTechnician?.name || "Not assigned"}</strong><small>{order.assignedTechnician?.email || ""}</small></div>
              <div><span className="rq-detail-label">Assigned by</span><strong>{order.assignedBy?.name || "—"}</strong></div>
              <div><span className="rq-detail-label">Created</span><strong>{formatDate(order.createdAt)}</strong></div>
            </div>
            <div className="rq-detail-description">
              <span className="rq-detail-label">Maintenance request description</span>
              <p>{order.maintenanceRequest?.description || "No description available."}</p>
            </div>
          </section>

          <section className="rq-detail-section">
            <h3>Execution timeline</h3>
            <div className="wo-timeline">
              <div><span className="wo-timeline-dot" /><span>Created</span><strong>{formatDate(order.createdAt)}</strong></div>
              <div><span className="wo-timeline-dot" /><span>Assigned</span><strong>{formatDate(order.assignedAt)}</strong></div>
              <div><span className="wo-timeline-dot" /><span>Started</span><strong>{formatDate(order.startedAt)}</strong></div>
              <div><span className="wo-timeline-dot" /><span>Completed</span><strong>{formatDate(order.completedAt)}</strong></div>
              <div><span className="wo-timeline-dot" /><span>Closed</span><strong>{formatDate(order.closedAt)}</strong></div>
            </div>
          </section>
        </div>

        <footer className="rq-modal-footer">
          {canExecute && order.status === "ASSIGNED" && (
            <button type="button" className="rq-btn rq-btn-primary" disabled={busy} onClick={() => performAction("start")}>
              <MaterialIcon>play_arrow</MaterialIcon>{busy ? "Processing…" : "Start Work"}
            </button>
          )}
          {canExecute && order.status === "IN_PROGRESS" && (
            <button type="button" className="rq-btn rq-btn-primary wo-complete-button" disabled={busy} onClick={() => performAction("complete")}>
              <MaterialIcon>check_circle</MaterialIcon>{busy ? "Processing…" : "Complete Work"}
            </button>
          )}
          {canClose && order.status === "COMPLETED" && (
            <button type="button" className="rq-btn rq-btn-primary" disabled={busy} onClick={() => performAction("close")}>
              <MaterialIcon>lock</MaterialIcon>{busy ? "Processing…" : "Close Work Order"}
            </button>
          )}
          <button type="button" className="rq-btn rq-btn-secondary" onClick={() => onClose(false)} disabled={busy}>Close</button>
        </footer>
      </div>
    </div>
  );
}

function AssignmentModal({ order, technicians, onClose, onAssigned }) {
  const [technicianId, setTechnicianId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!technicianId) {
      setError("Select a technician before assigning this work order.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.assignWorkOrder(order.id, Number(technicianId));
      onAssigned();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="wo-assign-title">
      <div className="rq-modal wo-assign-modal">
        <header className="rq-modal-header">
          <div className="rq-modal-header-left">
            <span className="rq-modal-icon wo-modal-icon"><MaterialIcon>person_add</MaterialIcon></span>
            <div><h2 id="wo-assign-title">Assign Work Order</h2><p>{order.workOrderNumber} · {order.equipment?.code}</p></div>
          </div>
          <button type="button" className="rq-modal-close" onClick={onClose} aria-label="Close" disabled={saving}><MaterialIcon>close</MaterialIcon></button>
        </header>
        <form onSubmit={submit}>
          <div className="rq-modal-body">
            {error && <p className="rq-form-error-banner" role="alert">{error}</p>}
            <div className="rq-form-field">
              <label htmlFor="wo-technician" className="rq-form-label">Technician <span className="rq-required">*</span></label>
              <div className="rq-select-wrap">
                <select id="wo-technician" value={technicianId} onChange={(event) => { setTechnicianId(event.target.value); setError(""); }} required>
                  <option value="">Select an active technician</option>
                  {technicians.map((tech) => <option key={tech.id} value={tech.id}>{tech.name} · {tech.email}</option>)}
                </select>
                <MaterialIcon>expand_more</MaterialIcon>
              </div>
              {technicians.length === 0 && <span className="rq-field-error">No active technicians are available.</span>}
            </div>
            <div className="wo-assignment-note"><MaterialIcon>info</MaterialIcon><span>Assigning this work order changes its status from Open to Assigned.</span></div>
          </div>
          <footer className="rq-modal-footer">
            <button type="button" className="rq-btn rq-btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className="rq-btn rq-btn-primary" disabled={saving || technicians.length === 0}>{saving ? "Assigning…" : "Confirm Assignment"}</button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export function WorkOrdersPage({
  user,
  authError = "",
  onLogout,
  isLoggingOut = false,
  currentPage = "work-orders",
  onNavigate = () => {},
}) {
  const isManager = ["ADMIN", "MANAGER"].includes(user?.role);
  const isTechnician = user?.role === "TECHNICIAN";
  const [filters, setFilters] = useState({ status: "", page: 1, pageSize: PAGE_SIZE });
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({ items: [], total: 0, page: 1, pageSize: PAGE_SIZE });
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [techniciansLoading, setTechniciansLoading] = useState(false);
  const [error, setError] = useState("");
  const [technicianError, setTechnicianError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignmentOrder, setAssignmentOrder] = useState(null);
  const [success, setSuccess] = useState("");

  const refresh = useCallback(() => setRefreshKey((value) => value + 1), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setFilters((current) => ({ ...current, page: 1 })), 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await api.listWorkOrders({
          status: filters.status || undefined,
          search: search.trim() || undefined,
          page: filters.page,
          pageSize: filters.pageSize,
        });
        if (!cancelled) setResult(data);
      } catch (err) {
        if (!cancelled) setError(handleApiError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [filters, search, refreshKey]);

  useEffect(() => {
    if (!isManager) return undefined;
    let cancelled = false;
    async function loadTechnicians() {
      setTechniciansLoading(true);
      setTechnicianError("");
      try {
        const data = await api.getWorkOrderTechnicians();
        if (!cancelled) setTechnicians(data);
      } catch (err) {
        if (!cancelled) setTechnicianError(handleApiError(err));
      } finally {
        if (!cancelled) setTechniciansLoading(false);
      }
    }
    loadTechnicians();
    return () => { cancelled = true; };
  }, [isManager]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 4000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const items = result.items || [];
  const counts = useMemo(() => ({
    OPEN: items.filter((item) => item.status === "OPEN").length,
    ASSIGNED: items.filter((item) => item.status === "ASSIGNED").length,
    IN_PROGRESS: items.filter((item) => item.status === "IN_PROGRESS").length,
    COMPLETED: items.filter((item) => item.status === "COMPLETED").length,
    CLOSED: items.filter((item) => item.status === "CLOSED").length,
  }), [items]);

  const totalPages = Math.max(1, Math.ceil(result.total / filters.pageSize));
  const firstRow = result.total ? (result.page - 1) * filters.pageSize + 1 : 0;
  const lastRow = Math.min(result.page * filters.pageSize, result.total);
  const userName = user?.name || "Maintenance User";
  const userRole = user?.role ? user.role.charAt(0) + user.role.slice(1).toLowerCase() : "Maintenance Team";

  function changeFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  }

  function handleAssigned() {
    setAssignmentOrder(null);
    setSuccess("Work order assigned successfully.");
    refresh();
  }

  function handleDetailsClosed(changed) {
    setSelectedOrder(null);
    if (changed) {
      setSuccess("Work order updated successfully.");
      refresh();
    }
  }

  return (
    <div className="equipment-app rq-app wo-app">
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a className="equipment-brand" href="#equipment" aria-label="IMMS Plant Engine">
            <span className="equipment-brand-mark"><MaterialIcon>precision_manufacturing</MaterialIcon></span>
            <span className="equipment-brand-copy"><strong>IMMS</strong><small>Plant Engine</small></span>
          </a>
          <nav className="equipment-nav" aria-label="Main navigation">
            <button type="button" className={`equipment-nav-item ${currentPage === "dashboard" ? "is-active" : ""}`} onClick={() => onNavigate("dashboard")}><MaterialIcon>dashboard</MaterialIcon><span>Dashboard</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "equipment" ? "is-active" : ""}`} onClick={() => onNavigate("equipment")}><MaterialIcon>precision_manufacturing</MaterialIcon><span>Equipment</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "requests" ? "is-active" : ""}`} onClick={() => onNavigate("requests")}><MaterialIcon>build_circle</MaterialIcon><span>Maintenance Requests</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "approvals" ? "is-active" : ""}`} onClick={() => onNavigate("approvals")}><MaterialIcon>verified</MaterialIcon><span>Approvals</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "work-orders" ? "is-active" : ""}`} onClick={() => onNavigate("work-orders")} aria-current={currentPage === "work-orders" ? "page" : undefined}><MaterialIcon>assignment</MaterialIcon><span>Work Orders</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "preventive-maintenance" ? "is-active" : ""}`} onClick={() => onNavigate("preventive-maintenance")}><MaterialIcon>event_repeat</MaterialIcon><span>Preventive Maintenance</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "kaizen" ? "is-active" : ""}`} onClick={() => onNavigate("kaizen")}><MaterialIcon>trending_up</MaterialIcon><span>Kaizen</span></button>
            <button type="button" className={`equipment-nav-item ${currentPage === "relocation" ? "is-active" : ""}`} onClick={() => onNavigate("relocation")}><MaterialIcon>swap_horiz</MaterialIcon><span>Relocation</span></button>
          </nav>
          {["ADMIN", "MANAGER"].includes(user?.role) && (
            <>
              <div className="equipment-nav-divider" />
              <div className="equipment-admin-label">Administration</div>
              <nav className="equipment-nav equipment-admin-nav" aria-label="Administration">
                <button type="button" className={`equipment-nav-item ${currentPage === "master-data" ? "is-active" : ""}`} onClick={() => onNavigate("master-data")}><MaterialIcon>dataset</MaterialIcon><span>Master Data</span></button>
                <button type="button" className={`equipment-nav-item ${currentPage === "audit-logs" ? "is-active" : ""}`} onClick={() => onNavigate("audit-logs")}><MaterialIcon>history_edu</MaterialIcon><span>Audit Log</span></button>
                {user?.role === "ADMIN" && <button type="button" className={`equipment-nav-item ${currentPage === "user-management" ? "is-active" : ""}`} onClick={() => onNavigate("user-management")}><MaterialIcon>group</MaterialIcon><span>User Management</span></button>}
                <button type="button" className="equipment-nav-item" disabled><MaterialIcon>settings</MaterialIcon><span>Settings</span></button>
              </nav>
            </>
          )}
        </div>
        <div className="equipment-release"><span>SYS::RELEASE</span><span className="equipment-release-version">v4.8.2 LTS</span></div>
      </aside>

      <div className="equipment-main">
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb"><span>Facilities</span><MaterialIcon>chevron_right</MaterialIcon><strong>Work Orders</strong></div>
            <label className="equipment-header-search"><MaterialIcon>search</MaterialIcon><span className="sr-only">Search work orders</span><input type="search" placeholder="Search work orders…" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          </div>
          <div className="equipment-user-area">
            <NotificationBell />
            <span className="equipment-user-divider" />
            <div className="equipment-user-info"><span className="equipment-user-avatar"><MaterialIcon>person</MaterialIcon></span><span className="equipment-user-copy"><strong>{userName}</strong><small>{userRole}</small></span></div>
            {onLogout && <button className="equipment-logout" type="button" onClick={onLogout} disabled={isLoggingOut} aria-label="Sign out"><MaterialIcon>logout</MaterialIcon></button>}
          </div>
        </header>

        <main className="equipment-workspace" id="work-orders">
          <div className="equipment-content wo-content">
            <div className="equipment-page-heading">
              <div><h1>{isTechnician ? "My Work Orders" : "Work Orders"}</h1><p>{isTechnician ? "View and execute maintenance work assigned to you." : "Assign technicians and track maintenance execution across your equipment."}</p></div>
            </div>

            {authError && <p className="equipment-alert" role="alert">{authError}</p>}
            {error && <p className="equipment-alert" role="alert">Unable to load work orders: {error}</p>}
            {technicianError && <p className="equipment-alert" role="alert">Unable to load technicians: {technicianError}</p>}
            {success && <div className="rq-success-banner" role="status"><MaterialIcon>check_circle</MaterialIcon>{success}</div>}

            <section className="wo-summary-grid" aria-label="Work order status summary">
              {[
                ["OPEN", "Open", "inbox", "wo-summary-open"],
                ["ASSIGNED", "Assigned", "person_check", "wo-summary-assigned"],
                ["IN_PROGRESS", "In Progress", "engineering", "wo-summary-progress"],
                ["COMPLETED", "Completed", "task_alt", "wo-summary-completed"],
                ["CLOSED", "Closed", "lock", "wo-summary-closed"],
              ].map(([key, label, icon, className]) => (
                <button type="button" key={key} className={`wo-summary-card ${className} ${filters.status === key ? "is-selected" : ""}`} onClick={() => changeFilter("status", filters.status === key ? "" : key)} aria-pressed={filters.status === key}>
                  <span className="wo-summary-icon"><MaterialIcon>{icon}</MaterialIcon></span>
                  <span className="wo-summary-copy"><small>{label}</small><strong>{counts[key]}</strong></span>
                </button>
              ))}
            </section>
            <p className="wo-summary-caption">Status counts reflect the currently loaded page of results.</p>

            <section className="equipment-filter-card wo-filter-card" aria-label="Work order filters">
              <div className="equipment-filter-controls">
                <label className="equipment-filter-search"><MaterialIcon>search</MaterialIcon><span className="sr-only">Search work orders</span><input type="search" placeholder="Search work order, equipment or description" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                <label className="equipment-select-wrap"><span className="sr-only">Filter by status</span><select aria-label="Filter by status" value={filters.status} onChange={(event) => changeFilter("status", event.target.value)}><option value="">All statuses</option><option value="OPEN">Open</option><option value="ASSIGNED">Assigned</option><option value="IN_PROGRESS">In Progress</option><option value="COMPLETED">Completed</option><option value="CLOSED">Closed</option></select><MaterialIcon>expand_more</MaterialIcon></label>
              </div>
              <button className="equipment-clear-filters" type="button" onClick={() => { setSearch(""); setFilters({ status: "", page: 1, pageSize: PAGE_SIZE }); }}>Clear filters</button>
            </section>

            <section className="equipment-table-card wo-table-card" aria-label="Work orders list">
              <div className="rq-table-header"><span>{isTechnician ? "Assigned to me" : "All Work Orders"} <span className="rq-record-count">{result.total} Records</span></span><span className="wo-live-indicator"><span /> Live records</span></div>
              <div className="equipment-table-scroll">
                {loading ? <div className="equipment-state" role="status"><MaterialIcon className="rq-spin">progress_activity</MaterialIcon>&nbsp;Loading work orders…</div>
                  : items.length === 0 ? <div className="equipment-state equipment-empty"><MaterialIcon className="rq-empty-icon">assignment</MaterialIcon><strong>No work orders found</strong><span>{search || filters.status ? "Try changing your search or filters." : "Approved maintenance requests will appear here as work orders."}</span></div>
                    : <table className="equipment-table wo-table">
                      <thead><tr><th scope="col">Work Order</th><th scope="col">Equipment</th><th scope="col">Request / Priority</th><th scope="col">Technician</th><th scope="col">Status</th><th scope="col">Created</th><th scope="col">Actions</th></tr></thead>
                      <tbody>{items.map((order) => {
                        const [label, statusClass] = statusDetails(order.status);
                        const [priority, priorityClass] = priorityDetails(order.maintenanceRequest?.criticality);
                        return <tr key={order.id}>
                          <td><button type="button" className="rq-id equipment-code rq-detail-trigger" onClick={() => setSelectedOrder(order)}>{order.workOrderNumber}</button></td>
                          <td><div className="equipment-name-cell"><strong>{order.equipment?.name || "—"}</strong><small>{order.equipment?.code || ""}</small></div></td>
                          <td><div className="wo-request-cell"><strong>REQ-{String(order.maintenanceRequestId).padStart(4, "0")}</strong><span className={`rq-crit-badge ${priorityClass}`}><span className="rq-crit-dot" />{priority}</span></div></td>
                          <td>{order.assignedTechnician ? <div className="rq-requester-cell"><span className="rq-avatar">{initials(order.assignedTechnician.name)}</span><div><div className="rq-requester-name">{order.assignedTechnician.name}</div><div className="rq-requester-role">Technician</div></div></div> : <span className="wo-unassigned">Unassigned</span>}</td>
                          <td><span className={`rq-status-badge ${statusClass}`}>{label}</span></td>
                          <td className="rq-date-cell">{formatDate(order.createdAt)}</td>
                          <td><div className="wo-row-actions">
                            <button type="button" className="wo-icon-button" onClick={() => setSelectedOrder(order)} aria-label={`View ${order.workOrderNumber}`} title="View details"><MaterialIcon>visibility</MaterialIcon></button>
                            {isManager && order.status === "OPEN" && <button type="button" className="wo-action-button" onClick={() => setAssignmentOrder(order)} disabled={techniciansLoading || technicians.length === 0} title={techniciansLoading ? "Loading technicians" : "Assign technician"}><MaterialIcon>person_add</MaterialIcon><span>Assign</span></button>}
                            {isManager && order.status === "COMPLETED" && <button type="button" className="wo-action-button" onClick={() => setSelectedOrder(order)}><MaterialIcon>lock</MaterialIcon><span>Close</span></button>}
                            {isTechnician && order.status === "ASSIGNED" && <button type="button" className="wo-action-button" onClick={() => setSelectedOrder(order)}><MaterialIcon>play_arrow</MaterialIcon><span>Start</span></button>}
                            {isTechnician && order.status === "IN_PROGRESS" && <button type="button" className="wo-action-button" onClick={() => setSelectedOrder(order)}><MaterialIcon>check</MaterialIcon><span>Complete</span></button>}
                          </div></td>
                        </tr>;
                      })}</tbody>
                    </table>}
              </div>
              <footer className="equipment-pagination">
                <div className="equipment-pagination-count">{result.total === 0 ? "No records" : <>Showing <strong>{firstRow}–{lastRow}</strong> of <strong>{result.total}</strong></>}</div>
                <label className="equipment-page-size"><span>Rows per page:</span><span className="equipment-page-size-select"><select aria-label="Rows per page" value={filters.pageSize} onChange={(event) => setFilters((current) => ({ ...current, pageSize: Number(event.target.value), page: 1 }))}><option value={10}>10</option><option value={20}>20</option><option value={50}>50</option></select><MaterialIcon>expand_more</MaterialIcon></span></label>
                <nav className="equipment-pages" aria-label="Work order pages">
                  <button className="equipment-pagination-text" type="button" disabled={result.page <= 1 || loading} onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}>Previous</button>
                  <span className="wo-page-indicator">Page {result.page} of {totalPages}</span>
                  <button className="equipment-pagination-text equipment-next" type="button" disabled={result.page >= totalPages || loading} onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}>Next</button>
                </nav>
              </footer>
            </section>
            <div className="equipment-sample-note">Work order records · IMMS Maintenance Management</div>
          </div>
        </main>
      </div>

      {selectedOrder && <WorkOrderDetails order={selectedOrder} onClose={handleDetailsClosed} canExecute={isTechnician} canClose={isManager && selectedOrder.status === "COMPLETED"} />}
      {assignmentOrder && <AssignmentModal order={assignmentOrder} technicians={technicians} onClose={() => setAssignmentOrder(null)} onAssigned={handleAssigned} />}
    </div>
  );
}
