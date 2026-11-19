import { useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./PreventiveMaintenancePage.css";

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

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const emptyForm = {
  id: null,
  equipmentId: "",
  activity: "",
  instructions: "",
  frequency: "MONTHLY",
  assignedTechnicianId: "",
  nextDueDate: "",
  isActive: true,
};

const emptyCompletion = {
  completedAt: new Date().toISOString().slice(0, 10),
  workPerformed: "",
  remarks: "",
};

export function PreventiveMaintenancePage({ user, onNavigate = () => {} }) {
  const [activeTab, setActiveTab] = useState("occurrences"); // "occurrences" | "plans"
  const [plans, setPlans] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [occurrenceTotal, setOccurrenceTotal] = useState(0);
  const [occurrencePage, setOccurrencePage] = useState(1);
  const [occurrenceStatusFilter, setOccurrenceStatusFilter] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [completionForm, setCompletionForm] = useState(emptyCompletion);
  const [completingOccurrence, setCompletingOccurrence] = useState(null);
  const [selectedOccurrence, setSelectedOccurrence] = useState(null);

  const [loading, setLoading] = useState(true);
  const [occurrencesLoading, setOccurrencesLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);

  const canManage = user?.role === "ADMIN" || user?.role === "MANAGER";
  const isTechnician = user?.role === "TECHNICIAN" || canManage;

  const loadData = async () => {
    try {
      setLoading(true);
      const [plansResult, equipmentResult, usersResult] = await Promise.all([
        api.listMaintenancePlans(),
        api.getEquipment({ page: 1, pageSize: 100 }),
        api.getUsers({ page: 1, pageSize: 100 }),
      ]);

      setPlans(plansResult || []);
      setEquipment(equipmentResult.items || []);
      setTechnicians(
        (usersResult.items || []).filter(
          (item) => item.role === "TECHNICIAN" || item.role === "MANAGER" || item.role === "ADMIN",
        ),
      );
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  const loadOccurrences = async () => {
    try {
      setOccurrencesLoading(true);
      const res = await api.listMaintenanceOccurrences({
        page: occurrencePage,
        pageSize: 10,
        status: occurrenceStatusFilter || undefined,
        planId: selectedPlanFilter ? Number(selectedPlanFilter) : undefined,
      });
      setOccurrences(res.items || []);
      setOccurrenceTotal(res.total || 0);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setOccurrencesLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    void loadOccurrences();
  }, [occurrencePage, occurrenceStatusFilter, selectedPlanFilter]);
const handleGenerateDue = async () => {
  try {
    setGenerating(true);
    setError("");
    setSuccess("");
    const res = await api.generateDueOccurrences();
    setSuccess(`Generated ${res.generated || 0} due occurrences successfully. Skipped: ${res.skipped || 0}.`);
    await loadOccurrences();
  } catch (err) {
    setError(handleApiError(err));
  } finally {
    setGenerating(false);
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canManage) {
      setError("Only ADMIN and MANAGER users can manage preventive maintenance plans.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await api.updateMaintenancePlan(editingId, {
          activity: form.activity,
          instructions: form.instructions || undefined,
          frequency: form.frequency,
          assignedTechnicianId: form.assignedTechnicianId ? Number(form.assignedTechnicianId) : null,
          nextDueDate: form.nextDueDate ? new Date(form.nextDueDate).toISOString() : undefined,
          isActive: form.isActive,
        });
        setSuccess("Maintenance plan updated successfully.");
      } else {
        await api.createMaintenancePlan({
          equipmentId: Number(form.equipmentId),
          activity: form.activity,
          instructions: form.instructions || undefined,
          frequency: form.frequency,
          assignedTechnicianId: form.assignedTechnicianId ? Number(form.assignedTechnicianId) : undefined,
          nextDueDate: form.nextDueDate ? new Date(form.nextDueDate).toISOString() : undefined,
        });
        setSuccess("Maintenance plan created successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (submitError) {
      setError(handleApiError(submitError));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setForm({
      id: plan.id,
      equipmentId: String(plan.equipmentId),
      activity: plan.activity,
      instructions: plan.instructions || "",
      frequency: plan.frequency,
      assignedTechnicianId: plan.assignedTechnicianId ? String(plan.assignedTechnicianId) : "",
      nextDueDate: plan.nextDueDate ? new Date(plan.nextDueDate).toISOString().slice(0, 10) : "",
      isActive: plan.isActive,
    });
    setActiveTab("plans");
  };

  const handleToggleActive = async (plan) => {
    try {
      setSaving(true);
      await api.updateMaintenancePlan(plan.id, { isActive: !plan.isActive });
      setSuccess(`Maintenance plan ${plan.isActive ? "deactivated" : "activated"} successfully.`);
      await loadData();
    } catch (toggleError) {
      setError(handleApiError(toggleError));
    } finally {
      setSaving(false);
    }
  };

  const handleCompleteSubmit = async (e) => {
    e.preventDefault();
    if (!completingOccurrence) return;

    if (!completionForm.workPerformed.trim()) {
      setError("Work performed description is required.");
      return;
    }

    setCompleting(true);
    setError("");
    setSuccess("");

    try {
      await api.completeMaintenanceOccurrence(completingOccurrence.id, {
        workPerformed: completionForm.workPerformed,
        remarks: completionForm.remarks || undefined,
        completedAt: new Date(completionForm.completedAt).toISOString(),
      });

      setSuccess("Maintenance occurrence completed successfully. Next occurrence scheduled.");
      setCompletingOccurrence(null);
      setCompletionForm(emptyCompletion);
      await loadOccurrences();
      await loadData();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setCompleting(false);
    }
  };

  // Filter occurrences client-side by search
  const filteredOccurrences = useMemo(() => {
    return (occurrences || []).filter((occ) => {
      const code = `PM-${String(occ.maintenancePlan?.equipmentId || 0).padStart(4, "0")}-OC${String(occ.id).padStart(2, "0")}`;
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        code.toLowerCase().includes(q) ||
        (occ.maintenancePlan?.activity || "").toLowerCase().includes(q) ||
        (occ.maintenancePlan?.equipment?.name || "").toLowerCase().includes(q) ||
        (occ.maintenancePlan?.equipment?.code || "").toLowerCase().includes(q);
      return matchSearch;
    });
  }, [occurrences, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(occurrenceTotal / 10));

  return (
    <div className="equipment-app">
      {/* ── Sidebar Navigation ── */}
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a
            className="equipment-brand"
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("dashboard");
            }}
            aria-label="IMMS dashboard"
          >
            <span className="equipment-brand-mark">
              <MaterialIcon>precision_manufacturing</MaterialIcon>
            </span>
            <span className="equipment-brand-copy">
              <strong>IMMS</strong>
              <small>OPS CORE</small>
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
            <button
              type="button"
              className="equipment-nav-item"
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
              className="equipment-nav-item is-active"
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
                <div
                  className="equipment-nav-divider"
                  style={{
                    margin: "16px 16px 8px 16px",
                    fontSize: "10px",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
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

        <div
          className="equipment-sidebar-bottom"
          style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              color: "#10b981",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }}
            ></span>
            <span>All systems operational</span>
          </div>
          <small style={{ color: "#64748b", fontSize: "10px", display: "block", marginTop: "4px" }}>
            v2.4.0 © 2026 IMMS Engine
          </small>
        </div>
      </aside>

      {/* ── Main PM Workspace ── */}
      <main className="pm-main">
        {/* ── Topbar Breadcrumbs & Telemetry Search ── */}
        <header className="pm-topbar">
          <nav className="pm-breadcrumb" aria-label="Breadcrumb">
            <span>Plant Ops</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span>Preventive Maintenance</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span className="pm-breadcrumb-active">Active Workspace</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div className="pm-search-telemetry">
              <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>search</MaterialIcon>
              <input
                type="text"
                placeholder="Search telemetry, tags, assets ( / )..."
                aria-label="Search telemetry"
              />
            </div>

            <NotificationBell user={user} onNavigate={onNavigate} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "4px 8px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#e0f2fe",
                  color: "#0284c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                {getInitials(user?.name || "Admin")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
                  {user?.name || "Alex Morgan"}
                </span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>
                  {user?.role || "Maintenance Manager"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ── PM Content ── */}
        <div className="pm-content">
          {error && <div className="rq-form-error-banner">{error}</div>}
          {success && <div className="rq-success-banner">{success}</div>}

          {/* ── Header with Generate Button ── */}
          <div className="pm-header">
            <div>
              <h1 className="pm-header-title">PM Management</h1>
              <p className="pm-header-sub">
                Track each due occurrence from request to closure.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {canManage && (
                <button
                  type="button"
                  className="pm-btn-generate"
                  onClick={handleGenerateDue}
                  disabled={generating}
                >
                  <MaterialIcon style={{ fontSize: "18px" }}>
                    {generating ? "hourglass_empty" : "calendar_month"}
                  </MaterialIcon>
                  <span>{generating ? "Generating..." : "Generate Due Occurrences"}</span>
                </button>
              )}
            </div>
          </div>

          {/* ── Sub Navigation Tabs ── */}
          <div className="rq-tabs-bar" style={{ marginBottom: "8px" }}>
            <div className="rq-tabs">
              <button
                type="button"
                className={`rq-tab ${activeTab === "occurrences" ? "is-active" : ""}`}
                onClick={() => setActiveTab("occurrences")}
              >
                <span>Occurrences</span>
                <span className="rq-tab-count">{occurrenceTotal}</span>
              </button>
              <button
                type="button"
                className={`rq-tab ${activeTab === "plans" ? "is-active" : ""}`}
                onClick={() => setActiveTab("plans")}
              >
                <span>PM Plans ({plans.length})</span>
              </button>
            </div>
          </div>

          {activeTab === "occurrences" ? (
            <>
              {/* ── Filter Card ── */}
              <div className="pm-filter-card">
                <div className="pm-search-box">
                  <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>search</MaterialIcon>
                  <input
                    type="text"
                    placeholder="Search by occurrence ID or equipment"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search occurrences"
                  />
                </div>

                <select
                  className="pm-select"
                  value={occurrenceStatusFilter}
                  onChange={(e) => {
                    setOccurrenceStatusFilter(e.target.value);
                    setOccurrencePage(1);
                  }}
                  aria-label="Workflow Stage"
                >
                  <option value="">Workflow Stage: All</option>
                  <option value="PENDING">Due / Upcoming</option>
                  <option value="SCHEDULED">Work Order Open</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="MISSED">Overdue / Missed</option>
                </select>

                <select
                  className="pm-select"
                  value={selectedPlanFilter}
                  onChange={(e) => {
                    setSelectedPlanFilter(e.target.value);
                    setOccurrencePage(1);
                  }}
                  aria-label="Filter by Plan"
                >
                  <option value="">Plan: All</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.activity}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="pm-btn-clear"
                  onClick={() => {
                    setOccurrenceStatusFilter("");
                    setSelectedPlanFilter("");
                    setSearchTerm("");
                    setOccurrencePage(1);
                  }}
                >
                  Clear filters
                </button>
              </div>

              {/* ── Occurrences Table ── */}
              <div className="pm-table-card">
                <table className="pm-table">
                  <thead>
                    <tr>
                      <th>OCCURRENCE ID</th>
                      <th>PLAN</th>
                      <th>EQUIPMENT</th>
                      <th>DUE DATE</th>
                      <th>WORKFLOW STAGE</th>
                      <th>LINKED RECORD</th>
                      <th>NEXT DUE</th>
                      <th style={{ textAlign: "right" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {occurrencesLoading ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                          Loading maintenance occurrences...
                        </td>
                      </tr>
                    ) : filteredOccurrences.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                          No maintenance occurrences found.
                        </td>
                      </tr>
                    ) : (
                      filteredOccurrences.map((occ) => {
                        const now = new Date();
                        const isOverdue =
                          occ.status !== "COMPLETED" &&
                          occ.status !== "CANCELLED" &&
                          new Date(occ.dueDate) < now;
                        const hasLinkedWo = occ.linkedWorkOrder && occ.linkedWorkOrder.length > 0;

                        let stageBadge = "pm-stage-scheduled";
                        let stageText = "Scheduled";

                        if (occ.status === "COMPLETED") {
                          stageBadge = "pm-stage-completed";
                          stageText = "Completed";
                        } else if (hasLinkedWo && occ.linkedWorkOrder[0].status !== "CLOSED") {
                          stageBadge = "pm-stage-wo-open";
                          stageText = "Work Order Open";
                        } else if (isOverdue) {
                          stageBadge = "pm-stage-overdue";
                          stageText = "Overdue";
                        } else if (new Date(occ.dueDate).toDateString() === now.toDateString()) {
                          stageBadge = "pm-stage-due";
                          stageText = "Due";
                        }

                        const occCode = `PM-${String(occ.maintenancePlan?.equipmentId || 0).padStart(4, "0")}-OC${String(occ.id).padStart(2, "0")}`;
                        const linkedWoNumber = hasLinkedWo ? occ.linkedWorkOrder[0].workOrderNumber : null;

                        return (
                          <tr key={occ.id}>
                            <td>
                              <span className="pm-id-link">{occCode}</span>
                            </td>
                            <td>
                              <span className="pm-plan-name">{occ.maintenancePlan?.activity}</span>
                            </td>
                            <td>
                              <span className="pm-eq-name">
                                {occ.maintenancePlan?.equipment?.name || "Equipment"}
                              </span>
                            </td>
                            <td>
                              <span className="pm-date-cell">{formatDate(occ.dueDate)}</span>
                            </td>
                            <td>
                              <span className={`pm-stage-badge ${stageBadge}`}>{stageText}</span>
                            </td>
                            <td>
                              {linkedWoNumber ? (
                                <a
                                  href="#work-orders"
                                  className="pm-linked-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate("work-orders");
                                  }}
                                >
                                  {linkedWoNumber}
                                </a>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>—</span>
                              )}
                            </td>
                            <td>
                              <span className="pm-date-cell">
                                {formatDate(occ.maintenancePlan?.nextDueDate)}
                              </span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                {occ.status !== "COMPLETED" && isTechnician && (
                                  <button
                                    type="button"
                                    className="rq-btn rq-btn-secondary"
                                    style={{ padding: "4px 10px", fontSize: "12px" }}
                                    onClick={() => {
                                      setCompletingOccurrence(occ);
                                      setCompletionForm(emptyCompletion);
                                    }}
                                  >
                                    Complete Work
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="pm-action-btn"
                                  onClick={() => setSelectedOccurrence(occ)}
                                  aria-label="View occurrence details"
                                >
                                  <MaterialIcon style={{ fontSize: "20px" }}>visibility</MaterialIcon>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>

                {/* ── Table Pagination ── */}
                <div className="pm-pagination">
                  <span>
                    Showing {filteredOccurrences.length > 0 ? (occurrencePage - 1) * 10 + 1 : 0}–
                    {Math.min(occurrencePage * 10, occurrenceTotal)} of {occurrenceTotal}
                  </span>

                  <div className="pm-page-btns">
                    <button
                      type="button"
                      className="pm-page-btn"
                      disabled={occurrencePage <= 1}
                      onClick={() => setOccurrencePage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pageNo) => (
                      <button
                        key={pageNo}
                        type="button"
                        className={`pm-page-btn ${pageNo === occurrencePage ? "is-active" : ""}`}
                        onClick={() => setOccurrencePage(pageNo)}
                      >
                        {pageNo}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="pm-page-btn"
                      disabled={occurrencePage >= totalPages}
                      onClick={() => setOccurrencePage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ── PM Plans Tab ── */
            <div style={{ display: "grid", gridTemplateColumns: canManage ? "1fr 2fr" : "1fr", gap: "24px" }}>
              {canManage && (
                <div className="rq-detail-card" style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 700 }}>
                    {editingId ? "Edit PM Plan" : "Create PM plan"}
                  </h3>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Equipment *
                      </label>
                      <select
                        value={form.equipmentId}
                        onChange={(e) => setForm({ ...form, equipmentId: e.target.value })}
                        required
                        disabled={Boolean(editingId)}
                        className="pm-select"
                        style={{ width: "100%" }}
                      >
                        <option value="">Select equipment</option>
                        {equipment.map((eq) => (
                          <option key={eq.id} value={eq.id}>
                            {eq.name} ({eq.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Activity Name *
                      </label>
                      <input
                        type="text"
                        value={form.activity}
                        onChange={(e) => setForm({ ...form, activity: e.target.value })}
                        required
                        placeholder="e.g. Hydraulic Oil Filter Replacement"
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Frequency *
                      </label>
                      <select
                        value={form.frequency}
                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                        className="pm-select"
                        style={{ width: "100%" }}
                      >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="HALF_YEARLY">Half Yearly</option>
                        <option value="YEARLY">Yearly</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Assigned Technician
                      </label>
                      <select
                        value={form.assignedTechnicianId}
                        onChange={(e) => setForm({ ...form, assignedTechnicianId: e.target.value })}
                        className="pm-select"
                        style={{ width: "100%" }}
                      >
                        <option value="">Select technician (optional)</option>
                        {technicians.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name} ({tech.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Next Due Date
                      </label>
                      <input
                        type="date"
                        value={form.nextDueDate}
                        onChange={(e) => setForm({ ...form, nextDueDate: e.target.value })}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                        Instructions
                      </label>
                      <textarea
                        value={form.instructions}
                        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                        rows={3}
                        placeholder="Detailed maintenance steps..."
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                      <button type="submit" className="dash-btn-primary" disabled={saving}>
                        {saving ? "Saving..." : editingId ? "Update Plan" : "Create Plan"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          className="rq-btn rq-btn-secondary"
                          onClick={() => {
                            setEditingId(null);
                            setForm(emptyForm);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Plan List */}
              <div className="pm-table-card">
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>Plan list</h3>
                </div>
                <table className="pm-table">
                  <thead>
                    <tr>
                      <th>ACTIVITY</th>
                      <th>EQUIPMENT</th>
                      <th>FREQUENCY</th>
                      <th>NEXT DUE</th>
                      <th>TECHNICIAN</th>
                      <th>STATUS</th>
                      {canManage && <th style={{ textAlign: "right" }}>ACTIONS</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {plans.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                          No maintenance plans configured yet.
                        </td>
                      </tr>
                    ) : (
                      plans.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong>{p.activity}</strong>
                          </td>
                          <td>{p.equipment?.name} ({p.equipment?.code})</td>
                          <td>{p.frequency}</td>
                          <td>{formatDate(p.nextDueDate)}</td>
                          <td>{p.assignedTechnician?.name || "Unassigned"}</td>
                          <td>
                            <span
                              className={`pm-stage-badge ${
                                p.isActive ? "pm-stage-completed" : "pm-stage-scheduled"
                              }`}
                            >
                              {p.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          {canManage && (
                            <td style={{ textAlign: "right" }}>
                              <button
                                type="button"
                                className="rq-btn rq-btn-secondary"
                                style={{ padding: "4px 8px", fontSize: "12px", marginRight: "6px" }}
                                onClick={() => handleEdit(p)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="rq-btn rq-btn-secondary"
                                style={{ padding: "4px 8px", fontSize: "12px" }}
                                onClick={() => handleToggleActive(p)}
                              >
                                {p.isActive ? "Deactivate" : "Activate"}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Technician Completion Modal ── */}
      {completingOccurrence && (
        <div className="rq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="completion-modal-title">
          <div className="rq-modal">
            <header className="rq-modal-header">
              <div className="rq-modal-header-left">
                <span className="rq-modal-icon">
                  <MaterialIcon>task_alt</MaterialIcon>
                </span>
                <div>
                  <h2 id="completion-modal-title">Record Maintenance Completion</h2>
                  <p>Document work done for this occurrence</p>
                </div>
              </div>
              <button
                type="button"
                className="rq-modal-close"
                onClick={() => setCompletingOccurrence(null)}
                aria-label="Close modal"
              >
                <MaterialIcon>close</MaterialIcon>
              </button>
            </header>

            <form onSubmit={handleCompleteSubmit} className="rq-modal-body">
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Equipment & Plan:</span>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>
                  {completingOccurrence.maintenancePlan?.equipment?.name} — {completingOccurrence.maintenancePlan?.activity}
                </div>
              </div>

              <div className="rq-field-group">
                <label htmlFor="completion-work-performed" className="rq-field-label">
                  Work Performed *
                </label>
                <textarea
                  id="completion-work-performed"
                  className="rq-textarea"
                  rows={4}
                  required
                  placeholder="Detail the maintenance procedures, replaced parts, and checks completed..."
                  value={completionForm.workPerformed}
                  onChange={(e) => setCompletionForm({ ...completionForm, workPerformed: e.target.value })}
                />
              </div>

              <div className="rq-field-group">
                <label htmlFor="completion-remarks" className="rq-field-label">
                  Remarks / Observations
                </label>
                <input
                  id="completion-remarks"
                  type="text"
                  className="rq-input"
                  placeholder="e.g. Belt tension within limits, next replacement in 6 months"
                  value={completionForm.remarks}
                  onChange={(e) => setCompletionForm({ ...completionForm, remarks: e.target.value })}
                />
              </div>

              <div className="rq-field-group">
                <label htmlFor="completion-date" className="rq-field-label">
                  Completion Date *
                </label>
                <input
                  id="completion-date"
                  type="date"
                  className="rq-input"
                  required
                  value={completionForm.completedAt}
                  onChange={(e) => setCompletionForm({ ...completionForm, completedAt: e.target.value })}
                />
              </div>

              <footer className="rq-modal-footer">
                <button
                  type="button"
                  className="rq-btn rq-btn-secondary"
                  onClick={() => setCompletingOccurrence(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="dash-btn-primary" disabled={completing}>
                  {completing ? "Saving..." : "Confirm Completion"}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      {/* ── View Occurrence Detail Modal ── */}
      {selectedOccurrence && (
        <div className="rq-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="view-occ-title">
          <div className="rq-modal">
            <header className="rq-modal-header">
              <div className="rq-modal-header-left">
                <span className="rq-modal-icon">
                  <MaterialIcon>visibility</MaterialIcon>
                </span>
                <div>
                  <h2 id="view-occ-title">Occurrence Details</h2>
                  <p>{selectedOccurrence.maintenancePlan?.activity}</p>
                </div>
              </div>
              <button
                type="button"
                className="rq-modal-close"
                onClick={() => setSelectedOccurrence(null)}
                aria-label="Close modal"
              >
                <MaterialIcon>close</MaterialIcon>
              </button>
            </header>

            <div className="rq-modal-body" style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
              <div>
                <span style={{ color: "#64748b" }}>Equipment:</span>{" "}
                <strong>
                  {selectedOccurrence.maintenancePlan?.equipment?.name} (
                  {selectedOccurrence.maintenancePlan?.equipment?.code})
                </strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Due Date:</span>{" "}
                <strong>{formatDate(selectedOccurrence.dueDate)}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Status:</span>{" "}
                <strong>{selectedOccurrence.status}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b" }}>Instructions:</span>{" "}
                <p style={{ margin: "4px 0", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  {selectedOccurrence.maintenancePlan?.instructions || "No specific instructions provided."}
                </p>
              </div>

              {selectedOccurrence.completedAt && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                  <h4 style={{ margin: "0 0 6px 0", color: "#15803d" }}>Completion Record</h4>
                  <div><span style={{ color: "#64748b" }}>Completed At:</span> {formatDateTime(selectedOccurrence.completedAt)}</div>
                  <div><span style={{ color: "#64748b" }}>Work Performed:</span> {selectedOccurrence.workPerformed}</div>
                  {selectedOccurrence.remarks && (
                    <div><span style={{ color: "#64748b" }}>Remarks:</span> {selectedOccurrence.remarks}</div>
                  )}
                </div>
              )}

              <footer className="rq-modal-footer">
                <button
                  type="button"
                  className="dash-btn-primary"
                  onClick={() => setSelectedOccurrence(null)}
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
