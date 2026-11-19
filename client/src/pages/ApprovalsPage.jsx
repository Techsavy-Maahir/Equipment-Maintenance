import { useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./ApprovalsPage.css";

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

function formatType(type) {
  if (type === "BREAKDOWN") return "Breakdown";
  if (type === "PREVENTIVE") return "Preventive";
  if (type === "IMPROVEMENT") return "Kaizen";
  if (type === "RELOCATION") return "Relocation";
  return type || "General";
}

function getItemCode(req) {
  if (req.requestType === "IMPROVEMENT") {
    return `KZ-2026-${String(req.id).padStart(4, "0")}`;
  }
  if (req.requestType === "RELOCATION") {
    return `REL-2026-${String(req.id).padStart(4, "0")}`;
  }
  return `REQ-2026-${String(req.id).padStart(4, "0")}`;
}

export function ApprovalsPage({ user, onNavigate = () => {} }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionBusy, setActionBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "changes"
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [decisionReason, setDecisionReason] = useState("");

  const canReview = user?.role === "ADMIN" || user?.role === "MANAGER";

  const loadApprovals = async () => {
    if (!canReview) return;
    try {
      setLoading(true);
      setError("");
      const result = await api.listMaintenanceRequests({
        page: 1,
        pageSize: 150,
      });

      setItems(result.items || []);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApprovals();
  }, [canReview]);

  // Split into Pending (SUBMITTED, UNDER_REVIEW) and Changes Requested (Decision comments noting changes)
  const pendingItems = useMemo(() => {
    return items.filter(
      (item) => item.status === "SUBMITTED" || item.status === "UNDER_REVIEW",
    );
  }, [items]);

  const changesRequestedItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.status === "REJECTED" &&
        item.decisionReason &&
        item.decisionReason.toLowerCase().includes("change"),
    );
  }, [items]);

  const currentTabItems = activeTab === "pending" ? pendingItems : changesRequestedItems;

  const filteredItems = useMemo(() => {
    return currentTabItems.filter((item) => {
      const code = getItemCode(item);
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        code.toLowerCase().includes(q) ||
        (item.equipment?.name || "").toLowerCase().includes(q) ||
        (item.equipment?.code || "").toLowerCase().includes(q) ||
        (item.requester?.name || "").toLowerCase().includes(q) ||
        (item.description || "").toLowerCase().includes(q);

      const matchType =
        typeFilter === "ALL" || item.requestType === typeFilter;

      const matchPrio =
        priorityFilter === "ALL" || item.criticality === priorityFilter;

      return matchSearch && matchType && matchPrio;
    });
  }, [currentTabItems, searchTerm, typeFilter, priorityFilter]);

  const handleDecision = async (status) => {
    if (!selected) return;
    if (status === "REJECTED" && !decisionReason.trim()) {
      setError("Please provide a decision reason for rejection.");
      return;
    }

    setActionBusy(true);
    setError("");
    setSuccess("");

    try {
      await api.transitionMaintenanceRequest(selected.id, {
        status,
        comment: decisionReason.trim() || undefined,
      });

      setSuccess(`Request ${getItemCode(selected)} ${status === "APPROVED" ? "approved" : "rejected"} successfully.`);
      setSelected(null);
      setDecisionReason("");
      await loadApprovals();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setActionBusy(false);
    }
  };

  if (!canReview) {
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
        <main className="appv-main">
          <div className="appv-content">
            <div className="rq-empty-state">
              Approval Queue access is restricted to Administrator and Manager accounts.
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
            <button type="button" className="equipment-nav-item is-active" onClick={() => onNavigate("approvals")}>
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
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("audit-logs")}>
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

      {/* ── Main Approval Queue Area ── */}
      <main className="appv-main">
        {/* ── Topbar Breadcrumbs ── */}
        <header className="dash-topbar">
          <nav className="dash-breadcrumb" aria-label="Breadcrumb">
            <span>Plant Ops</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span className="dash-breadcrumb-active">Approval Queue</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <NotificationBell user={user} onNavigate={onNavigate} />
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
              {user?.name}
            </div>
          </div>
        </header>

        <div className="appv-content">
          {error && <div className="rq-form-error-banner">{error}</div>}
          {success && <div className="rq-success-banner">{success}</div>}

          {/* ── Header ── */}
          <div className="appv-header">
            <h1 className="appv-title">Approval Queue</h1>
            <p className="appv-sub">Requests and proposals waiting for your decision.</p>
          </div>

          {/* ── Queue Tabs ── */}
          <div className="appv-tabs">
            <button
              type="button"
              className={`appv-tab ${activeTab === "pending" ? "is-active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              <span>Pending</span>
              <span className="appv-tab-count">{pendingItems.length}</span>
            </button>
            <button
              type="button"
              className={`appv-tab ${activeTab === "changes" ? "is-active" : ""}`}
              onClick={() => setActiveTab("changes")}
            >
              <span>Changes Requested</span>
              <span className="appv-tab-count">{changesRequestedItems.length}</span>
            </button>
          </div>

          {/* ── Filters Card ── */}
          <div className="appv-filter-card">
            <div className="appv-search-box">
              <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>search</MaterialIcon>
              <input
                type="text"
                placeholder="Search by ID or equipment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search approvals"
              />
            </div>

            <select
              className="appv-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by Type"
            >
              <option value="ALL">Type: All</option>
              <option value="BREAKDOWN">Breakdown</option>
              <option value="IMPROVEMENT">Kaizen</option>
              <option value="PREVENTIVE">Preventive</option>
              <option value="RELOCATION">Relocation</option>
            </select>

            <select
              className="appv-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by Priority"
            >
              <option value="ALL">Priority: All</option>
              <option value="HIGH">Critical / High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <button
              type="button"
              className="appv-btn-clear"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("ALL");
                setPriorityFilter("ALL");
              }}
            >
              Clear filters
            </button>
          </div>

          {/* ── Queue Table Card ── */}
          <div className="appv-table-card">
            <table className="appv-table">
              <thead>
                <tr>
                  <th>ITEM ID</th>
                  <th>TYPE</th>
                  <th>EQUIPMENT</th>
                  <th>PRIORITY</th>
                  <th>SUBMITTED BY</th>
                  <th>SUBMITTED</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>
                      Loading approval queue...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>
                      No items waiting for review in this queue.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const prioClass =
                      item.criticality === "HIGH"
                        ? "appv-prio-critical"
                        : item.criticality === "MEDIUM"
                        ? "appv-prio-medium"
                        : "appv-prio-low";

                    const prioLabel =
                      item.criticality === "HIGH"
                        ? "Critical"
                        : item.criticality === "MEDIUM"
                        ? "Medium"
                        : "Low";

                    const itemCode = getItemCode(item);

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="appv-id-col">
                            <span className="appv-id-link">{itemCode}</span>
                            {item.criticality === "HIGH" && (
                              <span className="appv-id-sub">Emergency authorization</span>
                            )}
                          </div>
                        </td>
                        <td>{formatType(item.requestType)}</td>
                        <td>
                          <strong>{item.equipment?.name || "Equipment"}</strong>
                          <small style={{ display: "block", color: "#64748b" }}>{item.equipment?.code}</small>
                        </td>
                        <td>
                          <span className={`appv-prio-badge ${prioClass}`}>{prioLabel}</span>
                        </td>
                        <td>{item.requester?.name || "Requester"}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td>
                          <span className="appv-status-badge">Pending Review</span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            className="appv-btn-review"
                            onClick={() => {
                              setSelected(item);
                              setDecisionReason("");
                            }}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ── Review Decision Modal ── */}
      {selected && (
        <div className="rq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
          <div className="rq-modal">
            <header className="rq-modal-header">
              <div className="rq-modal-header-left">
                <span className="rq-modal-icon">
                  <MaterialIcon>rate_review</MaterialIcon>
                </span>
                <div>
                  <h2 id="review-modal-title">Review Request — {getItemCode(selected)}</h2>
                  <p>{formatType(selected.requestType)} authorization</p>
                </div>
              </div>
              <button
                type="button"
                className="rq-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
              >
                <MaterialIcon>close</MaterialIcon>
              </button>
            </header>

            <div className="rq-modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px" }}>
              <div>
                <span style={{ color: "#64748b" }}>Equipment:</span>{" "}
                <strong>{selected.equipment?.name} ({selected.equipment?.code})</strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Requested By:</span>{" "}
                <strong>{selected.requester?.name} ({selected.requester?.email})</strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Priority / Criticality:</span>{" "}
                <strong>{selected.criticality}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Problem / Reason:</span>
                <p style={{ margin: "4px 0", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  {selected.problem || selected.description || "No specific details provided."}
                </p>
              </div>

              {selected.proposedSolution && (
                <div>
                  <span style={{ color: "#64748b" }}>Proposed Solution:</span>
                  <p style={{ margin: "4px 0", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                    {selected.proposedSolution}
                  </p>
                </div>
              )}

              <div className="rq-field-group">
                <label htmlFor="review-comment" className="rq-field-label">
                  Decision Comment / Reason (Required for rejection)
                </label>
                <textarea
                  id="review-comment"
                  className="rq-textarea"
                  rows={3}
                  placeholder="Enter remarks or approval notes..."
                  value={decisionReason}
                  onChange={(e) => setDecisionReason(e.target.value)}
                />
              </div>

              <footer className="rq-modal-footer">
                <button
                  type="button"
                  className="rq-btn rq-btn-secondary"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rq-btn rq-btn-danger"
                  style={{ background: "#dc2626", color: "#ffffff", border: "none" }}
                  disabled={actionBusy}
                  onClick={() => handleDecision("REJECTED")}
                >
                  Reject Request
                </button>
                <button
                  type="button"
                  className="dash-btn-primary"
                  style={{ background: "#16a34a" }}
                  disabled={actionBusy}
                  onClick={() => handleDecision("APPROVED")}
                >
                  Approve Request
                </button>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
