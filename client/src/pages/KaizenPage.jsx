import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";

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

function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const emptyForm = {
  equipmentId: "",
  description: "",
  problem: "",
  proposedSolution: "",
  expectedBenefit: "",
  criticality: "MEDIUM",
};

export function KaizenPage({ user, onNavigate = () => {} }) {
  const [items, setItems] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Review / Decision / Closure modals
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approvalComment, setApprovalComment] = useState("");

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closureForm, setClosureForm] = useState({
    outcome: "",
    implementationStatus: "Fully Implemented",
    comment: "",
  });

  const canReview = user?.role === "ADMIN" || user?.role === "MANAGER";
  const canWork = user?.role === "TECHNICIAN" || user?.role === "ADMIN" || user?.role === "MANAGER";

  const loadData = async () => {
    try {
      setLoading(true);
      const [requestResult, equipmentResult] = await Promise.all([
        api.listMaintenanceRequests({ page: 1, pageSize: 100, requestType: "IMPROVEMENT" }),
        api.getEquipment({ page: 1, pageSize: 200 }),
      ]);

      setItems(requestResult.items || []);
      setEquipment(equipmentResult.items || []);
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (id) => {
    try {
      setDetailLoading(true);
      const detail = await api.getMaintenanceRequest(id);
      setSelectedDetail(detail);
      setSelectedId(id);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await api.createMaintenanceRequest({
        requestType: "IMPROVEMENT",
        equipmentId: Number(form.equipmentId),
        description: form.description.trim(),
        criticality: form.criticality,
        problem: form.problem.trim() || undefined,
        proposedSolution: form.proposedSolution.trim() || undefined,
        expectedBenefit: form.expectedBenefit.trim() || undefined,
      });
      setSuccess("Kaizen improvement request submitted.");
      setForm(emptyForm);
      await loadData();
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleTransition = async (nextStatus, payload = {}) => {
    if (!selectedId) return;

    setActionLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.transitionMaintenanceRequest(selectedId, {
        status: nextStatus,
        ...payload,
      });
      setSuccess(`Kaizen request #${selectedId} moved to ${nextStatus}.`);
      setShowRejectModal(false);
      setShowApproveModal(false);
      setShowCloseModal(false);
      await loadDetail(selectedId);
      await loadData();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setActionLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (statusFilter && item.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = item.equipment?.name?.toLowerCase().includes(term);
      const matchDesc = item.description?.toLowerCase().includes(term);
      const matchProb = item.problem?.toLowerCase().includes(term);
      if (!matchName && !matchDesc && !matchProb) return false;
    }
    return true;
  });

  const renderStatusBadge = (status) => {
    switch (status) {
      case "SUBMITTED":
        return <span className="rq-status-badge rq-status--review">Submitted</span>;
      case "UNDER_REVIEW":
        return <span className="rq-status-badge rq-status--review">Under Review</span>;
      case "APPROVED":
        return <span className="rq-status-badge rq-status--approved">Approved</span>;
      case "IN_PROGRESS":
        return <span className="rq-status-badge rq-status--review">In Progress</span>;
      case "COMPLETED":
        return <span className="rq-status-badge rq-status--approved">Completed</span>;
      case "REJECTED":
        return <span className="rq-status-badge rq-status--rejected">Rejected</span>;
      case "CANCELLED":
        return <span className="rq-status-badge rq-status--rejected">Cancelled</span>;
      default:
        return <span className="rq-status-badge">{status}</span>;
    }
  };

  return (
    <div className="equipment-app">
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a
            className="equipment-brand"
            href="#kaizen"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("kaizen");
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
              <small>Kaizen</small>
            </span>
          </a>
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
            <button type="button" className="equipment-nav-item is-active" onClick={() => onNavigate("kaizen")}>
              <MaterialIcon>trending_up</MaterialIcon>
              <span>Kaizen</span>
            </button>
            <button type="button" className="equipment-nav-item" onClick={() => onNavigate("relocation")}>
              <MaterialIcon>swap_horiz</MaterialIcon>
              <span>Relocation</span>
            </button>
            {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
              <>
                <div className="equipment-nav-divider" />
                <button type="button" className="equipment-nav-item" onClick={() => onNavigate("master-data")}>
                  <MaterialIcon>dataset</MaterialIcon>
                  <span>Master Data</span>
                </button>
                <button type="button" className="equipment-nav-item" onClick={() => onNavigate("audit-logs")}>
                  <MaterialIcon>history_edu</MaterialIcon>
                  <span>Audit Log</span>
                </button>
              </>
            )}
            {user?.role === "ADMIN" && (
              <button type="button" className="equipment-nav-item" onClick={() => onNavigate("user-management")}>
                <MaterialIcon>group</MaterialIcon>
                <span>User Management</span>
              </button>
            )}
          </nav>
        </div>
      </aside>

      <div className="equipment-main">
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb">
              <span>Operations</span>
              <MaterialIcon>chevron_right</MaterialIcon>
              <strong>Kaizen Continuous Improvement</strong>
            </div>
          </div>
          <div className="equipment-user-area">
            <NotificationBell />
            <span className="equipment-user-divider" />
            <div className="equipment-user-info">
              <span className="equipment-user-avatar">
                <MaterialIcon>person</MaterialIcon>
              </span>
              <span className="equipment-user-copy">{user?.name || "Operations Team"}</span>
            </div>
          </div>
        </header>

        <div className="equipment-content kaizen-layout">
          {/* Left Column: Submit Kaizen Idea */}
          <div className="rq-detail-section kaizen-submission-panel">
            <h3>Submit Kaizen Improvement</h3>
            {error ? <div className="rq-form-error-banner">{error}</div> : null}
            {success ? <div className="rq-success-banner">{success}</div> : null}

            <form onSubmit={handleSubmit} className="rq-form-grid kaizen-form">
              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="kaizen-equipment">
                  Equipment *
                </label>
                <select
                  id="kaizen-equipment"
                  value={form.equipmentId}
                  onChange={(e) => setForm((current) => ({ ...current, equipmentId: e.target.value }))}
                  required
                >
                  <option value="">Select equipment</option>
                  {equipment.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="kaizen-criticality">
                  Priority
                </label>
                <select
                  id="kaizen-criticality"
                  value={form.criticality}
                  onChange={(e) => setForm((current) => ({ ...current, criticality: e.target.value }))}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="kaizen-description">
                  Idea Summary *
                </label>
                <textarea
                  id="kaizen-description"
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                  placeholder="Short summary of the Kaizen initiative"
                  required
                />
              </div>

              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="problem">
                  Problem Identified
                </label>
                <textarea
                  id="problem"
                  rows={3}
                  value={form.problem}
                  onChange={(e) => setForm((current) => ({ ...current, problem: e.target.value }))}
                  placeholder="What inefficiency, bottleneck or defect are we addressing?"
                />
              </div>

              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="solution">
                  Proposed Solution
                </label>
                <textarea
                  id="solution"
                  rows={3}
                  value={form.proposedSolution}
                  onChange={(e) => setForm((current) => ({ ...current, proposedSolution: e.target.value }))}
                  placeholder="How should the process or equipment be modified?"
                />
              </div>

              <div className="rq-form-field">
                <label className="rq-form-label" htmlFor="benefit">
                  Expected Benefit
                </label>
                <textarea
                  id="benefit"
                  rows={3}
                  value={form.expectedBenefit}
                  onChange={(e) => setForm((current) => ({ ...current, expectedBenefit: e.target.value }))}
                  placeholder="Expected gains (e.g. cycle time reduction, safety, energy saving)..."
                />
              </div>

              <button type="submit" className="rq-btn rq-btn-primary" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit Kaizen idea"}
              </button>
            </form>
          </div>

          {/* Right Column: Kaizen Backlog & Selected Details */}
          <div className="kaizen-backlog-panel" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Filter and Search Bar */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                flexWrap: "wrap",
                background: "#fff",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <input
                type="text"
                placeholder="Search Kaizen ideas or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, minWidth: "200px", padding: "0.375rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: "0.375rem 0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              >
                <option value="">All Statuses</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Backlog List */}
            <div className="rq-detail-section" style={{ gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Kaizen Backlog ({filteredItems.length})</h3>
              </div>

              {loading ? <div className="rq-empty-state">Loading requests…</div> : null}
              {!loading && filteredItems.length === 0 ? (
                <div className="rq-empty-state">No Kaizen requests match the criteria.</div>
              ) : null}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "360px", overflowY: "auto" }}>
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rq-row-card ${selectedId === item.id ? "is-selected" : ""}`}
                    onClick={() => loadDetail(item.id)}
                    style={{
                      cursor: "pointer",
                      display: "grid",
                      gap: "0.4rem",
                      border: selectedId === item.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                      background: selectedId === item.id ? "#f0f7ff" : "#fff",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong>{item.equipment?.name || "Equipment"}</strong>
                        <span style={{ marginLeft: "0.5rem", color: "#64748b", fontSize: "0.85rem" }}>
                          #{item.id}
                        </span>
                      </div>
                      {renderStatusBadge(item.status)}
                    </div>
                    <div style={{ fontSize: "0.9rem", color: "#1e293b" }}>{item.description}</div>
                    <div className="rq-detail-grid">
                      <div>
                        <span className="rq-detail-label">Priority</span>
                        <strong>{item.criticality}</strong>
                      </div>
                      <div>
                        <span className="rq-detail-label">Submitted</span>
                        <strong>{formatDate(item.createdAt)}</strong>
                      </div>
                      <div>
                        <span className="rq-detail-label">Expected Benefit</span>
                        <strong style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                          {item.expectedBenefit || "—"}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Detail & Review/Closure Panel */}
            {selectedDetail ? (
              <div
                className="rq-detail-section"
                style={{
                  gap: "1rem",
                  background: "#fff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: 0 }}>
                      Kaizen #{selectedDetail.id}: {selectedDetail.equipment?.name} ({selectedDetail.equipment?.code})
                    </h3>
                    <small style={{ color: "#64748b" }}>
                      Submitted by {selectedDetail.requester?.name} on {formatDateTime(selectedDetail.createdAt)}
                    </small>
                  </div>
                  <div>{renderStatusBadge(selectedDetail.status)}</div>
                </div>

                {/* Structured Kaizen Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px" }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>PROBLEM IDENTIFIED:</div>
                    <div style={{ marginTop: "4px" }}>{selectedDetail.problem || "None specified"}</div>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px" }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>PROPOSED SOLUTION:</div>
                    <div style={{ marginTop: "4px" }}>{selectedDetail.proposedSolution || "None specified"}</div>
                  </div>
                </div>

                <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "0.75rem", borderRadius: "6px" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e40af" }}>EXPECTED BENEFIT:</div>
                  <div style={{ marginTop: "4px", color: "#1e3a8a" }}>{selectedDetail.expectedBenefit || "None specified"}</div>
                </div>

                {/* Closure Outcome & Status if Completed */}
                {selectedDetail.status === "COMPLETED" ? (
                  <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "0.75rem", borderRadius: "6px" }}>
                    <div style={{ fontWeight: 700, color: "#065f46", marginBottom: "4px" }}>
                      Closure Record & Verified Outcome
                    </div>
                    <div>
                      <strong>Outcome:</strong> {selectedDetail.outcome}
                    </div>
                    <div>
                      <strong>Implementation Status:</strong> {selectedDetail.implementationStatus}
                    </div>
                  </div>
                ) : null}

                {/* Review & Workflow Actions Bar */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#475569" }}>Workflow Actions:</span>

                  {/* SUBMITTED -> UNDER_REVIEW */}
                  {selectedDetail.status === "SUBMITTED" && canReview ? (
                    <button
                      type="button"
                      className="rq-btn rq-btn-secondary"
                      onClick={() => handleTransition("UNDER_REVIEW")}
                      disabled={actionLoading}
                    >
                      Start Review
                    </button>
                  ) : null}

                  {/* UNDER_REVIEW -> APPROVE / REJECT */}
                  {(selectedDetail.status === "SUBMITTED" || selectedDetail.status === "UNDER_REVIEW") && canReview ? (
                    <>
                      <button
                        type="button"
                        className="rq-btn rq-btn-primary"
                        onClick={() => {
                          setApprovalComment("");
                          setShowApproveModal(true);
                        }}
                        disabled={actionLoading}
                      >
                        Approve Kaizen
                      </button>
                      <button
                        type="button"
                        className="rq-btn rq-btn-secondary"
                        style={{ color: "#dc2626" }}
                        onClick={() => {
                          setRejectionReason("");
                          setShowRejectModal(true);
                        }}
                        disabled={actionLoading}
                      >
                        Reject
                      </button>
                    </>
                  ) : null}

                  {/* APPROVED -> IN_PROGRESS */}
                  {selectedDetail.status === "APPROVED" && canWork ? (
                    <button
                      type="button"
                      className="rq-btn rq-btn-primary"
                      onClick={() => handleTransition("IN_PROGRESS")}
                      disabled={actionLoading}
                    >
                      Start Implementation
                    </button>
                  ) : null}

                  {/* IN_PROGRESS -> COMPLETED (Closure with outcome & implementationStatus) */}
                  {selectedDetail.status === "IN_PROGRESS" && canWork ? (
                    <button
                      type="button"
                      className="rq-btn rq-btn-primary"
                      onClick={() => {
                        setClosureForm({
                          outcome: "",
                          implementationStatus: "Fully Implemented",
                          comment: "",
                        });
                        setShowCloseModal(true);
                      }}
                      disabled={actionLoading}
                    >
                      Complete & Close Kaizen
                    </button>
                  ) : null}
                </div>

                {/* Decision History */}
                {selectedDetail.decisionHistory && selectedDetail.decisionHistory.length > 0 ? (
                  <div style={{ marginTop: "0.5rem" }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#475569", marginBottom: "0.5rem" }}>
                      Decision & Review History:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {selectedDetail.decisionHistory.map((history) => (
                        <div
                          key={history.id}
                          style={{
                            background: "#f8fafc",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>
                              {history.actor?.name || "System"} ({history.previousStatus} → {history.newStatus})
                            </strong>
                            <small style={{ color: "#64748b" }}>{formatDateTime(history.createdAt)}</small>
                          </div>
                          {history.comment ? <div style={{ marginTop: "2px", color: "#334155" }}>{history.comment}</div> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Modal: Approve Kaizen */}
          {showApproveModal ? (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: "1rem",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  width: "100%",
                  maxWidth: "480px",
                }}
              >
                <h3 style={{ marginTop: 0 }}>Approve Kaizen Improvement</h3>
                <p style={{ fontSize: "0.9rem", color: "#475569" }}>
                  Approving this request will automatically generate a linked Work Order for tracking implementation.
                </p>

                <div className="rq-form-field" style={{ marginBottom: "1rem" }}>
                  <label className="rq-form-label" htmlFor="approval-comment">
                    Decision Remarks (optional)
                  </label>
                  <textarea
                    id="approval-comment"
                    rows={3}
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    placeholder="Enter implementation guidance or approval notes..."
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button type="button" className="rq-btn rq-btn-secondary" onClick={() => setShowApproveModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rq-btn rq-btn-primary"
                    disabled={actionLoading}
                    onClick={() => handleTransition("APPROVED", { comment: approvalComment.trim() || undefined })}
                  >
                    {actionLoading ? "Approving…" : "Confirm Approval"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Modal: Reject Kaizen */}
          {showRejectModal ? (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: "1rem",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  width: "100%",
                  maxWidth: "480px",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#dc2626" }}>Reject Kaizen Idea</h3>
                <p style={{ fontSize: "0.9rem", color: "#475569" }}>
                  Please state the reason for rejection (required).
                </p>

                <div className="rq-form-field" style={{ marginBottom: "1rem" }}>
                  <label className="rq-form-label" htmlFor="reject-reason">
                    Rejection Reason *
                  </label>
                  <textarea
                    id="reject-reason"
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Why cannot this Kaizen idea be implemented at this time?"
                    required
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button type="button" className="rq-btn rq-btn-secondary" onClick={() => setShowRejectModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rq-btn rq-btn-primary"
                    style={{ background: "#dc2626" }}
                    disabled={actionLoading || !rejectionReason.trim()}
                    onClick={() => handleTransition("REJECTED", { comment: rejectionReason.trim() })}
                  >
                    {actionLoading ? "Rejecting…" : "Confirm Rejection"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Modal: Close / Complete Kaizen with Mandatory Outcome & Status */}
          {showCloseModal ? (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
                padding: "1rem",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  width: "100%",
                  maxWidth: "520px",
                }}
              >
                <h3 style={{ marginTop: 0 }}>Complete & Close Kaizen</h3>
                <p style={{ fontSize: "0.9rem", color: "#475569" }}>
                  Kaizen closure requires verified implementation status and recorded quantitative or qualitative outcome.
                </p>

                <div className="rq-form-field" style={{ marginBottom: "0.75rem" }}>
                  <label className="rq-form-label" htmlFor="implementation-status">
                    Implementation Status *
                  </label>
                  <select
                    id="implementation-status"
                    value={closureForm.implementationStatus}
                    onChange={(e) => setClosureForm((c) => ({ ...c, implementationStatus: e.target.value }))}
                    style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #cbd5e1", width: "100%" }}
                  >
                    <option value="Fully Implemented">Fully Implemented & Standardized</option>
                    <option value="Partially Implemented">Partially Implemented</option>
                    <option value="Trial Validated">Trial Validated</option>
                    <option value="Standardized">SOP / Standard Updated</option>
                  </select>
                </div>

                <div className="rq-form-field" style={{ marginBottom: "0.75rem" }}>
                  <label className="rq-form-label" htmlFor="closure-outcome">
                    Verified Outcome / Results *
                  </label>
                  <textarea
                    id="closure-outcome"
                    rows={3}
                    value={closureForm.outcome}
                    onChange={(e) => setClosureForm((c) => ({ ...c, outcome: e.target.value }))}
                    placeholder="Example: Machine changeover time reduced from 45 mins to 28 mins; scrap reduced by 15%."
                    required
                  />
                </div>

                <div className="rq-form-field" style={{ marginBottom: "1rem" }}>
                  <label className="rq-form-label" htmlFor="closure-comment">
                    Closure Remarks (optional)
                  </label>
                  <textarea
                    id="closure-comment"
                    rows={2}
                    value={closureForm.comment}
                    onChange={(e) => setClosureForm((c) => ({ ...c, comment: e.target.value }))}
                    placeholder="Additional verification comments..."
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button type="button" className="rq-btn rq-btn-secondary" onClick={() => setShowCloseModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rq-btn rq-btn-primary"
                    disabled={actionLoading || !closureForm.outcome.trim() || !closureForm.implementationStatus.trim()}
                    onClick={() =>
                      handleTransition("COMPLETED", {
                        outcome: closureForm.outcome.trim(),
                        implementationStatus: closureForm.implementationStatus.trim(),
                        comment: closureForm.comment.trim() || undefined,
                      })
                    }
                  >
                    {actionLoading ? "Closing…" : "Confirm Closure"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
