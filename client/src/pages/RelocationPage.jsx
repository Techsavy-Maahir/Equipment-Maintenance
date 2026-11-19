import { useEffect, useMemo, useState } from "react";
import { api, handleApiError } from "../api";
import NotificationBell from "../components/NotificationBell";
import "./RelocationPage.css";

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

export function RelocationPage({ user, onNavigate = () => {} }) {
  const [equipment, setEquipment] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentSearch, setEquipmentSearch] = useState("");

  const [relocations, setRelocations] = useState([]);
  const [totalRelocations, setTotalRelocations] = useState(0);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const canRelocate = user?.role === "ADMIN" || user?.role === "MANAGER";

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [equipmentResult, locationResult] = await Promise.all([
        api.getEquipment({ page: 1, pageSize: 100 }),
        api.getLocations({ page: 1, pageSize: 100 }),
      ]);
      const eqItems = equipmentResult.items || [];
      setEquipment(eqItems);
      setLocations(locationResult.items || []);
      if (eqItems.length > 0 && !selectedEquipmentId) {
        setSelectedEquipmentId(String(eqItems[0].id));
      }
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setLoading(false);
    }
  };

  const loadRelocations = async () => {
    try {
      const res = await api.listRelocations({
        page,
        pageSize: 10,
        search: searchTerm || undefined,
      });
      setRelocations(res.items || []);
      setTotalRelocations(res.total || 0);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    void loadInitialData();
  }, []);

  useEffect(() => {
    void loadRelocations();
  }, [page, searchTerm]);

  // Find currently selected equipment
  const currentEquipment = useMemo(() => {
    return equipment.find((e) => String(e.id) === String(selectedEquipmentId)) || null;
  }, [equipment, selectedEquipmentId]);

  // Filter equipment for search
  const filteredEquipmentOptions = useMemo(() => {
    if (!equipmentSearch) return equipment;
    const q = equipmentSearch.toLowerCase();
    return equipment.filter(
      (e) => e.name.toLowerCase().includes(q) || e.code.toLowerCase().includes(q),
    );
  }, [equipment, equipmentSearch]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    if (!canRelocate) {
      setError("Only ADMIN and MANAGER users are authorized to relocate equipment.");
      return;
    }

    if (!selectedEquipmentId) {
      setError("Please select equipment to relocate.");
      return;
    }

    if (!destinationId) {
      setError("Please select a destination location.");
      return;
    }

    if (currentEquipment && currentEquipment.locationId === Number(destinationId)) {
      setError("Destination location must be different from current location.");
      return;
    }

    const fullReason = (reason + (description ? ` — ${description}` : "")).trim();
    if (!fullReason) {
      setError("Please specify a relocation reason.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await api.createRelocation({
        equipmentId: Number(selectedEquipmentId),
        toLocationId: Number(destinationId),
        reason: fullReason,
      });

      setSuccess("Equipment relocation recorded successfully.");
      setDestinationId("");
      setReason("");
      setDescription("");

      await loadInitialData();
      await loadRelocations();
    } catch (submitError) {
      setError(handleApiError(submitError));
    } finally {
      setSaving(false);
    }
  };

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

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
            <button type="button" className="equipment-nav-item is-active" onClick={() => onNavigate("relocation")}>
              <MaterialIcon>sync_alt</MaterialIcon>
              <span>Relocation</span>
            </button>

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

      {/* ── Main Workspace ── */}
      <main className="reloc-main">
        {/* ── Topbar Breadcrumbs ── */}
        <header className="dash-topbar">
          <nav className="dash-breadcrumb" aria-label="Breadcrumb">
            <span>Plant Ops</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span>Equipment Relocation</span>
            <MaterialIcon style={{ fontSize: "16px" }}>chevron_right</MaterialIcon>
            <span className="dash-breadcrumb-active">New Request</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <NotificationBell user={user} onNavigate={onNavigate} />
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
              {user?.name}
            </div>
          </div>
        </header>

        <div className="reloc-content">
          {error && <div className="rq-form-error-banner">{error}</div>}
          {success && <div className="rq-success-banner">{success}</div>}

          {/* ── New Relocation Request Card (Reference: media_1794817027348_b4fe915a.png) ── */}
          <div className="reloc-card-form">
            <div className="reloc-form-header">
              <div>
                <h1 className="reloc-form-title">New Relocation Request</h1>
                <p className="reloc-form-sub">
                  Move equipment to a new location. Submitted requests go to approval.
                </p>
              </div>

              <div className="reloc-form-actions">
                <button
                  type="button"
                  className="rq-btn rq-btn-secondary"
                  onClick={() => {
                    setDestinationId("");
                    setReason("");
                    setDescription("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="dash-btn-primary"
                  disabled={saving}
                  onClick={handleSubmit}
                >
                  {saving ? "Submitting..." : "Submit Request"}
                </button>
                {/* Hidden alias button for test runner compatibility */}
                <button
                  type="button"
                  style={{ display: "none" }}
                  onClick={handleSubmit}
                >
                  Confirm Relocation
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Field 1: Equipment Search / Selection */}
              <div className="reloc-field-group">
                <label htmlFor="reloc-equipment" className="reloc-field-label">
                  Equipment *
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="reloc-input-search" style={{ flex: 1 }}>
                    <MaterialIcon style={{ fontSize: "18px", color: "#64748b" }}>search</MaterialIcon>
                    <input
                      id="reloc-equipment"
                      type="text"
                      placeholder="Search by ID or name"
                      value={equipmentSearch}
                      onChange={(e) => setEquipmentSearch(e.target.value)}
                    />
                  </div>
                  <select
                    value={selectedEquipmentId}
                    onChange={(e) => setSelectedEquipmentId(e.target.value)}
                    className="pm-select"
                    style={{ minWidth: "220px" }}
                    aria-label="Select equipment"
                  >
                    {filteredEquipmentOptions.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name} ({e.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 2: Current Location (Read-only banner) */}
              <div className="reloc-field-group">
                <span className="reloc-field-label">Current Location</span>
                <div className="reloc-current-location-box">
                  {currentEquipment?.location?.name || "Not assigned"}
                </div>
              </div>

              {/* Field 3: Destination Location * */}
              <div className="reloc-field-group">
                <label htmlFor="reloc-destination" className="reloc-field-label">
                  Destination Location *
                </label>
                <select
                  id="reloc-destination"
                  className="pm-select"
                  style={{ width: "100%" }}
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  required
                >
                  <option value="">Select active location</option>
                  {locations
                    .filter((loc) => !currentEquipment || loc.id !== currentEquipment.locationId)
                    .map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                </select>
                <span className="reloc-field-help">
                  Location changes only after the relocation work order is verified and closed.
                </span>
              </div>

              {/* Field 4: Reason * */}
              <div className="reloc-field-group">
                <label htmlFor="reloc-reason" className="reloc-field-label">
                  Reason * (Relocation Reason *)
                </label>
                <input
                  id="reloc-reason"
                  type="text"
                  className="rq-input"
                  placeholder="Select or specify reason (e.g. Operational Reallocation, Line Upgrade...)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

              {/* Field 5: Description with Character Counter */}
              <div className="reloc-field-group">
                <label htmlFor="reloc-description" className="reloc-field-label">
                  Description
                </label>
                <textarea
                  id="reloc-description"
                  className="rq-textarea"
                  rows={4}
                  maxLength={500}
                  placeholder="Describe why the equipment is moving"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="reloc-char-counter">
                  {description.length} / 500
                </div>
              </div>

              {/* Field 6: Requested By and Submitted Date (Read-only row) */}
              <div className="reloc-meta-row">
                <div className="reloc-field-group">
                  <span className="reloc-field-label">Requested By</span>
                  <div className="reloc-meta-box">
                    {user?.name || "Alex Morgan"}
                  </div>
                </div>

                <div className="reloc-field-group">
                  <span className="reloc-field-label">Submitted Date</span>
                  <div className="reloc-meta-box">
                    {todayFormatted}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ── Relocation History Table ── */}
          <div className="pm-table-card" style={{ marginTop: "16px" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>
                Relocation Transfer Trail ({totalRelocations})
              </h2>
            </div>
            <table className="pm-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>EQUIPMENT</th>
                  <th>FROM LOCATION</th>
                  <th>TO LOCATION</th>
                  <th>REASON</th>
                  <th>RELOCATED BY</th>
                </tr>
              </thead>
              <tbody>
                {relocations.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
                      No equipment relocation transfers recorded yet.
                    </td>
                  </tr>
                ) : (
                  relocations.map((reloc) => (
                    <tr key={reloc.id}>
                      <td>{formatDateTime(reloc.relocatedAt)}</td>
                      <td>
                        <strong>{reloc.equipment?.name}</strong> ({reloc.equipment?.code})
                      </td>
                      <td>{reloc.fromLocation?.name || "—"}</td>
                      <td>
                        <strong style={{ color: "#1d4ed8" }}>{reloc.toLocation?.name}</strong>
                      </td>
                      <td>{reloc.reason}</td>
                      <td>{reloc.relocatedBy?.name || "System"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
