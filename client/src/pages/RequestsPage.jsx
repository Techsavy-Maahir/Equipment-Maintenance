import { useEffect, useRef, useState } from "react";
import { api, handleApiError } from "../api";
import "./RequestsPage.css";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZES = [10, 20, 50];

const REQUEST_TYPES = [
  { key: "", label: "All" },
  { key: "BREAKDOWN", label: "Breakdown" },
  { key: "PREVENTIVE", label: "Preventive" },
  { key: "IMPROVEMENT", label: "Improvement" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const CRITICALITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function getVisiblePages(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
  if (page >= totalPages - 2)
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages];
}

function requestTypeDetails(type) {
  switch (type) {
    case "BREAKDOWN":
      return { label: "Breakdown", className: "rq-type--breakdown" };
    case "PREVENTIVE":
      return { label: "Preventive", className: "rq-type--preventive" };
    case "IMPROVEMENT":
      return { label: "Improvement", className: "rq-type--improvement" };
    default:
      return { label: type || "Unknown", className: "" };
  }
}

function requestStatusDetails(status) {
  switch (status) {
    case "SUBMITTED":
      return { label: "Submitted", className: "rq-status--submitted" };
    case "UNDER_REVIEW":
      return { label: "Under Review", className: "rq-status--review" };
    case "APPROVED":
      return { label: "Approved", className: "rq-status--approved" };
    case "REJECTED":
      return { label: "Rejected", className: "rq-status--rejected" };
    case "IN_PROGRESS":
      return { label: "In Progress", className: "rq-status--inprogress" };
    case "COMPLETED":
      return { label: "Completed", className: "rq-status--completed" };
    case "CANCELLED":
      return { label: "Cancelled", className: "rq-status--cancelled" };
    default:
      return { label: status || "Unknown", className: "" };
  }
}

function criticalityDetails(c) {
  switch (c) {
    case "HIGH":
      return { label: "High", className: "rq-crit--high" };
    case "MEDIUM":
      return { label: "Medium", className: "rq-crit--medium" };
    case "LOW":
      return { label: "Low", className: "rq-crit--low" };
    default:
      return { label: c || "—", className: "" };
  }
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) {
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `Today, ${hours}:${minutes}`;
  }

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRequestId(id, createdAt) {
  const year = createdAt ? new Date(createdAt).getFullYear() : 2026;
  return `REQ-${year}-${String(id).padStart(4, "0")}`;
}

function userInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Breakdown Submission Modal ───────────────────────────────────────────────

function BreakdownModal({ onClose, onSuccess }) {
  const [equipmentList, setEquipmentList] = useState([]);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
  const [equipmentError, setEquipmentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [form, setForm] = useState({
    equipmentId: "",
    description: "",
    criticality: "HIGH",
    problem: "",
  });

  // Load active equipment for picker
  useEffect(() => {
    let cancelled = false;

    async function loadEquipment() {
      try {
        const res = await api.getEquipment({ status: "ACTIVE", pageSize: 100, page: 1 });
        if (cancelled) return;
        const activeOnly = (res.items || []).filter(
          (eq) => !eq.isDeactivated && eq.status === "ACTIVE",
        );
        setEquipmentList(activeOnly);
      } catch (err) {
        if (!cancelled) setEquipmentError(handleApiError(err));
      } finally {
        if (!cancelled) setEquipmentLoading(false);
      }
    }

    loadEquipment();
    return () => {
      cancelled = true;
    };
  }, []);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const errors = {};
    if (!form.equipmentId) errors.equipmentId = "Please select equipment.";
    if (!form.description.trim()) errors.description = "Description is required.";
    else if (form.description.trim().length < 10)
      errors.description = "Please provide at least 10 characters.";
    if (!form.criticality) errors.criticality = "Please select a priority.";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      await api.createMaintenanceRequest({
        requestType: "BREAKDOWN",
        equipmentId: Number(form.equipmentId),
        description: form.description.trim(),
        criticality: form.criticality,
        problem: form.problem.trim() || undefined,
      });
      onSuccess();
    } catch (err) {
      if (err?.response?.data?.details && typeof err.response.data.details === "object") {
        setFieldErrors(err.response.data.details);
        setSubmitError(err.response.data.message || "Please correct the errors below.");
      } else {
        setSubmitError(handleApiError(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Close on Escape
  const overlayRef = useRef(null);
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="rq-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bd-modal-title"
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="rq-modal">
        <header className="rq-modal-header">
          <div className="rq-modal-header-left">
            <span className="rq-modal-icon">
              <MaterialIcon>warning</MaterialIcon>
            </span>
            <div>
              <h2 id="bd-modal-title">New Breakdown Request</h2>
              <p>Report a breakdown and submit for review.</p>
            </div>
          </div>
          <button
            type="button"
            className="rq-modal-close"
            onClick={onClose}
            aria-label="Close"
            disabled={submitting}
          >
            <MaterialIcon>close</MaterialIcon>
          </button>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rq-modal-body">
            {submitError && (
              <p className="rq-form-error-banner" role="alert">
                {submitError}
              </p>
            )}

            {/* Equipment picker */}
            <div className={`rq-form-field${fieldErrors.equipmentId ? " has-error" : ""}`}>
              <label htmlFor="bd-equipment" className="rq-form-label">
                Equipment <span className="rq-required" aria-hidden="true">*</span>
              </label>
              {equipmentLoading ? (
                <div className="rq-form-loading">Loading equipment…</div>
              ) : equipmentError ? (
                <div className="rq-form-load-error">
                  Failed to load equipment: {equipmentError}
                </div>
              ) : (
                <div className="rq-select-wrap">
                  <select
                    id="bd-equipment"
                    value={form.equipmentId}
                    onChange={(e) => setField("equipmentId", e.target.value)}
                    aria-describedby={fieldErrors.equipmentId ? "bd-equipment-err" : undefined}
                    aria-invalid={!!fieldErrors.equipmentId}
                  >
                    <option value="">— Select equipment —</option>
                    {equipmentList.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.code} · {eq.name}
                      </option>
                    ))}
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </div>
              )}
              {fieldErrors.equipmentId && (
                <span id="bd-equipment-err" className="rq-field-error">
                  {fieldErrors.equipmentId}
                </span>
              )}
            </div>

            {/* Priority / Criticality */}
            <div className={`rq-form-field${fieldErrors.criticality ? " has-error" : ""}`}>
              <label htmlFor="bd-criticality" className="rq-form-label">
                Priority <span className="rq-required" aria-hidden="true">*</span>
              </label>
              <div className="rq-select-wrap">
                <select
                  id="bd-criticality"
                  value={form.criticality}
                  onChange={(e) => setField("criticality", e.target.value)}
                  aria-invalid={!!fieldErrors.criticality}
                >
                  {CRITICALITY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <MaterialIcon>expand_more</MaterialIcon>
              </div>
              {fieldErrors.criticality && (
                <span className="rq-field-error">{fieldErrors.criticality}</span>
              )}
            </div>

            {/* Problem (optional) */}
            <div className="rq-form-field">
              <label htmlFor="bd-problem" className="rq-form-label">
                Problem Title <span className="rq-form-hint">(optional)</span>
              </label>
              <input
                id="bd-problem"
                type="text"
                className="rq-form-input"
                placeholder="e.g., Excessive vibration in motor shaft"
                value={form.problem}
                onChange={(e) => setField("problem", e.target.value)}
                maxLength={500}
              />
            </div>

            {/* Description */}
            <div className={`rq-form-field${fieldErrors.description ? " has-error" : ""}`}>
              <label htmlFor="bd-description" className="rq-form-label">
                Description <span className="rq-required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="bd-description"
                className="rq-form-textarea"
                placeholder="Describe the breakdown in detail — when it started, observed symptoms, any immediate actions taken…"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={5}
                maxLength={5000}
                aria-describedby={fieldErrors.description ? "bd-description-err" : undefined}
                aria-invalid={!!fieldErrors.description}
              />
              <div className="rq-char-count">{form.description.length}/5000</div>
              {fieldErrors.description && (
                <span id="bd-description-err" className="rq-field-error">
                  {fieldErrors.description}
                </span>
              )}
            </div>
          </div>

          <footer className="rq-modal-footer">
            <button
              type="button"
              className="rq-btn rq-btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rq-btn rq-btn-primary rq-btn-danger"
              disabled={submitting || equipmentLoading}
            >
              {submitting ? (
                <>
                  <MaterialIcon className="rq-spin">progress_activity</MaterialIcon>
                  Submitting…
                </>
              ) : (
                <>
                  <MaterialIcon>report</MaterialIcon>
                  Submit Breakdown
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function RequestsPage({
  user,
  authError = "",
  onLogout,
  isLoggingOut = false,
  currentPage = "requests",
  onNavigate = () => {},
}) {
  const [activeType, setActiveType] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [result, setResult] = useState({ items: [], total: 0, page: 1, pageSize: DEFAULT_PAGE_SIZE });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [successBanner, setSuccessBanner] = useState("");

  const userName = user?.name || "Maintenance User";
  const userRole = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
    : "Maintenance Team";

  // Debounce search
  useEffect(() => {
    const id = window.setTimeout(() => {
      setFilters((f) => ({ ...f, page: 1 }));
    }, 300);
    return () => window.clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;

    async function loadRequests() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listMaintenanceRequests({
          requestType: activeType || undefined,
          status: filters.status || undefined,
          page: filters.page,
          pageSize: filters.pageSize,
        });
        if (cancelled) return;
        setResult(data);
      } catch (err) {
        if (!cancelled) setError(handleApiError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRequests();
    return () => {
      cancelled = true;
    };
  }, [activeType, filters, refreshKey]);

  // Dismiss success banner after 4 s
  useEffect(() => {
    if (!successBanner) return;
    const id = window.setTimeout(() => setSuccessBanner(""), 4000);
    return () => window.clearTimeout(id);
  }, [successBanner]);

  const totalPages = Math.max(1, Math.ceil(result.total / filters.pageSize));
  const firstRow = result.total === 0 ? 0 : (result.page - 1) * filters.pageSize + 1;
  const lastRow = Math.min(result.page * filters.pageSize, result.total);
  const visiblePages = getVisiblePages(result.page, totalPages);

  function handleTabChange(key) {
    setActiveType(key);
    setFilters((f) => ({ ...f, page: 1 }));
  }

  function handleFilterChange(key, value) {
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));
  }

  function handleClearFilters() {
    setActiveType("");
    setSearchInput("");
    setPriorityFilter("");
    setFilters({ status: "", page: 1, pageSize: DEFAULT_PAGE_SIZE });
  }

  function handleModalSuccess() {
    setShowModal(false);
    setSuccessBanner("Breakdown request submitted successfully. It is now under review.");
    setRefreshKey((k) => k + 1);
  }

  const canCreateRequest = user?.role && ["ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"].includes(user.role);

  const filteredItems = result.items.filter((item) => {
    if (priorityFilter && item.criticality !== priorityFilter) return false;
    if (searchInput.trim()) {
      const q = searchInput.toLowerCase();
      const formattedId = formatRequestId(item.id, item.createdAt).toLowerCase();
      const rawId = String(item.id);
      const eqName = (item.equipment?.name || "").toLowerCase();
      const eqCode = (item.equipment?.code || "").toLowerCase();
      const desc = (item.description || "").toLowerCase();
      const reqName = (item.requester?.name || "").toLowerCase();
      if (
        !formattedId.includes(q) &&
        !rawId.includes(q) &&
        !eqName.includes(q) &&
        !eqCode.includes(q) &&
        !desc.includes(q) &&
        !reqName.includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="equipment-app rq-app">
      {/* ── Sidebar (reuses existing design) ── */}
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a className="equipment-brand" href="#equipment" aria-label="IMMS Plant Engine">
            <span className="equipment-brand-mark">
              <MaterialIcon>precision_manufacturing</MaterialIcon>
            </span>
            <span className="equipment-brand-copy">
              <strong>IMMS</strong>
              <small>Plant Engine</small>
            </span>
          </a>

          <nav className="equipment-nav" aria-label="Main navigation">
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>dashboard</MaterialIcon><span>Dashboard</span>
            </button>
            <button
              type="button"
              className={`equipment-nav-item ${currentPage === "equipment" ? "is-active" : ""}`}
              onClick={() => onNavigate("equipment")}
            >
              <MaterialIcon>precision_manufacturing</MaterialIcon><span>Equipment</span>
            </button>
            <button
              type="button"
              className={`equipment-nav-item ${currentPage === "requests" ? "is-active" : ""}`}
              onClick={() => onNavigate("requests")}
              aria-current={currentPage === "requests" ? "page" : undefined}
            >
              <MaterialIcon>build_circle</MaterialIcon><span>Maintenance Requests</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>verified</MaterialIcon><span>Approvals</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>assignment</MaterialIcon><span>Work Orders</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>event_repeat</MaterialIcon><span>Preventive Maintenance</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>trending_up</MaterialIcon><span>Kaizen</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>swap_horiz</MaterialIcon><span>Relocation</span>
            </button>
          </nav>

          <div className="equipment-nav-divider" />
          <div className="equipment-admin-label">Administration</div>
          <nav className="equipment-nav equipment-admin-nav" aria-label="Administration">
            <button
              type="button"
              className={`equipment-nav-item ${currentPage === "master-data" ? "is-active" : ""}`}
              onClick={() => onNavigate("master-data")}
            >
              <MaterialIcon>dataset</MaterialIcon><span>Master Data</span>
            </button>
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>history_edu</MaterialIcon><span>Audit Log</span>
            </button>
            {user?.role === "ADMIN" && (
              <button
                type="button"
                className={`equipment-nav-item ${currentPage === "user-management" ? "is-active" : ""}`}
                onClick={() => onNavigate("user-management")}
              >
                <MaterialIcon>group</MaterialIcon><span>User Management</span>
              </button>
            )}
            <button type="button" className="equipment-nav-item" disabled>
              <MaterialIcon>settings</MaterialIcon><span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="equipment-release">
          <span>SYS::RELEASE</span>
          <span className="equipment-release-version">v4.8.2 LTS</span>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="equipment-main">
        {/* Topbar */}
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb">
              <span>Facilities</span>
              <MaterialIcon>chevron_right</MaterialIcon>
              <strong>Maintenance Requests</strong>
            </div>
            <label className="equipment-header-search">
              <MaterialIcon>search</MaterialIcon>
              <span className="sr-only">Search requests</span>
              <input
                type="search"
                aria-label="Search requests"
                placeholder="Search requests…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>

          <div className="equipment-user-area">
            <button type="button" className="equipment-notifications" aria-label="Notifications" disabled>
              <MaterialIcon>notifications</MaterialIcon>
              <span className="equipment-notification-dot" />
            </button>
            <span className="equipment-user-divider" />
            <div className="equipment-user-info">
              <span className="equipment-user-avatar">
                <MaterialIcon>person</MaterialIcon>
              </span>
              <span className="equipment-user-copy">
                <strong>{userName}</strong>
                <small>{userRole}</small>
              </span>
            </div>
            {onLogout && (
              <button
                className="equipment-logout"
                type="button"
                onClick={onLogout}
                disabled={isLoggingOut}
                aria-label={isLoggingOut ? "Signing out" : "Sign out"}
                title={isLoggingOut ? "Signing out" : "Sign out"}
              >
                <MaterialIcon>logout</MaterialIcon>
              </button>
            )}
          </div>
        </header>

        {/* Workspace */}
        <main className="equipment-workspace" id="requests">
          <div className="equipment-content">
            {/* Page heading */}
            <div className="equipment-page-heading">
              <div>
                <h1>Maintenance Requests</h1>
                <p>Review and track submitted requests across industrial plant lines.</p>
              </div>
              {canCreateRequest && (
                <button
                  className="equipment-add-button"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <MaterialIcon>add</MaterialIcon>
                  <span>New Breakdown Request</span>
                </button>
              )}
            </div>

            {/* Auth / general error */}
            {authError && <p className="equipment-alert" role="alert">{authError}</p>}
            {error && (
              <p className="equipment-alert" role="alert">
                Unable to load requests: {error}
              </p>
            )}

            {/* Success banner */}
            {successBanner && (
              <div className="rq-success-banner" role="status">
                <MaterialIcon>check_circle</MaterialIcon>
                {successBanner}
              </div>
            )}

            {/* Type tabs */}
            <section className="rq-tabs-bar" aria-label="Filter by request type">
              <div className="rq-tabs" role="tablist">
                {REQUEST_TYPES.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={activeType === t.key}
                    className={`rq-tab${activeType === t.key ? " is-active" : ""}`}
                    onClick={() => handleTabChange(t.key)}
                  >
                    {t.label}
                    {t.key === "" && (
                      <span className="rq-tab-count">{result.total}</span>
                    )}
                  </button>
                ))}
              </div>

              <span className="rq-last-updated">
                <MaterialIcon>schedule</MaterialIcon>
                {loading ? "Refreshing…" : `${result.total.toLocaleString()} record${result.total !== 1 ? "s" : ""}`}
              </span>
            </section>

            {/* Filters */}
            <section className="equipment-filter-card" aria-label="Request filters">
              <div className="equipment-filter-controls">
                <label className="equipment-filter-search">
                  <MaterialIcon>search</MaterialIcon>
                  <span className="sr-only">Search requests by ID or equipment</span>
                  <input
                    type="search"
                    aria-label="Search requests by ID or equipment"
                    placeholder="Search by request ID or equipment"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </label>

                <label className="equipment-select-wrap">
                  <span className="sr-only">Filter by priority</span>
                  <select
                    aria-label="Filter by priority"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <option value="">All Priorities</option>
                    {CRITICALITY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </label>

                <label className="equipment-select-wrap">
                  <span className="sr-only">Filter by status</span>
                  <select
                    aria-label="Filter by status"
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </label>
              </div>
              <button className="equipment-clear-filters" type="button" onClick={handleClearFilters}>
                Clear filters
              </button>
            </section>

            {/* Table */}
            <section className="equipment-table-card" aria-label="Maintenance requests list">
              <div className="rq-table-header">
                <span>
                  All Requests <span className="rq-record-count">{result.total} Records</span>
                </span>
              </div>

              <div className="equipment-table-scroll">
                {loading ? (
                  <div className="equipment-state" role="status">
                    <MaterialIcon className="rq-spin">progress_activity</MaterialIcon>
                    &nbsp;Loading requests…
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="equipment-state equipment-empty">
                    <MaterialIcon className="rq-empty-icon">inbox</MaterialIcon>
                    <strong>No requests found</strong>
                    <span>Try adjusting your filters or submit a new request.</span>
                  </div>
                ) : (
                  <table className="equipment-table rq-table">
                    <thead>
                      <tr>
                        <th scope="col">Request ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Equipment</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Requested By</th>
                        <th scope="col">Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((req) => {
                        const type = requestTypeDetails(req.requestType);
                        const status = requestStatusDetails(req.status);
                        const crit = criticalityDetails(req.criticality);
                        const initials = userInitials(req.requester?.name);
                        return (
                          <tr key={req.id} className="rq-row">
                            <td>
                              <span className="rq-id equipment-code">
                                {formatRequestId(req.id, req.createdAt)}
                              </span>
                            </td>
                            <td>
                              <span className={`rq-type-badge ${type.className}`}>
                                <span className="rq-type-dot" />
                                {type.label}
                              </span>
                            </td>
                            <td>
                              <div className="equipment-name-cell">
                                <strong>{req.equipment?.name ?? "—"}</strong>
                                <small>{req.equipment?.code ?? ""}</small>
                              </div>
                            </td>
                            <td>
                              <span className={`rq-crit-badge ${crit.className}`}>
                                <span className="rq-crit-dot" />
                                {crit.label}
                              </span>
                            </td>
                            <td>
                              <span className={`rq-status-badge ${status.className}`}>
                                {status.label}
                              </span>
                            </td>
                            <td>
                              <div className="rq-requester-cell">
                                <span className="rq-avatar" aria-hidden="true">{initials}</span>
                                <div>
                                  <div className="rq-requester-name">{req.requester?.name ?? "—"}</div>
                                  <div className="rq-requester-role">{req.requester?.role ?? ""}</div>
                                </div>
                              </div>
                            </td>
                            <td className="rq-date-cell">{formatDate(req.createdAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <footer className="equipment-pagination">
                <div className="equipment-pagination-count">
                  {result.total === 0
                    ? "No records"
                    : <>Showing <strong>{firstRow}–{lastRow}</strong> of <strong>{result.total.toLocaleString()}</strong></>}
                </div>

                <label className="equipment-page-size">
                  <span>Rows per page:</span>
                  <span className="equipment-page-size-select">
                    <select
                      aria-label="Rows per page"
                      value={filters.pageSize}
                      onChange={(e) =>
                        setFilters((f) => ({
                          ...f,
                          pageSize: Math.min(Number(e.target.value), 100),
                          page: 1,
                        }))
                      }
                    >
                      {PAGE_SIZES.includes(filters.pageSize) ? null : (
                        <option value={filters.pageSize}>{filters.pageSize}</option>
                      )}
                      {PAGE_SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <MaterialIcon>expand_more</MaterialIcon>
                  </span>
                </label>

                <nav className="equipment-pages" aria-label="Request pages">
                  <button
                    className="equipment-pagination-text"
                    type="button"
                    disabled={result.page <= 1 || loading}
                    onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                  >
                    Previous
                  </button>
                  {visiblePages.map((p, i) =>
                    typeof p === "string" ? (
                      <span className="equipment-ellipsis" key={`${p}-${i}`} aria-hidden="true">…</span>
                    ) : (
                      <button
                        className={`equipment-page-number${result.page === p ? " is-current" : ""}`}
                        key={p}
                        type="button"
                        aria-current={result.page === p ? "page" : undefined}
                        disabled={loading || result.page === p}
                        onClick={() => setFilters((f) => ({ ...f, page: p }))}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    className="equipment-pagination-text equipment-next"
                    type="button"
                    disabled={result.page >= totalPages || loading}
                    onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                  >
                    Next
                  </button>
                </nav>
              </footer>
            </section>

            <div className="equipment-sample-note">Live maintenance request records.</div>
          </div>
        </main>
      </div>

      {/* Breakdown submission modal */}
      {showModal && (
        <BreakdownModal
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}

