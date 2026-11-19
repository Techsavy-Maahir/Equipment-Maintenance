import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import { MaterialIcon } from "../components/MaterialIcon";
import "./EquipmentListPage.css";
import "./EquipmentDetailPage.css";

const WARRANTY_BADGES = {
  VALID: { label: "Warranty Active", className: "valid" },
  EXPIRING_SOON: { label: "Expiring Soon", className: "expiring" },
  EXPIRED: { label: "Warranty Expired", className: "expired" },
  NOT_RECORDED: { label: "No Warranty", className: "not-recorded" },
};

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "—";
}

function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function EquipmentField({ label, children }) {
  return (
    <div className="equipment-detail-item">
      <span className="equipment-detail-label">{label}</span>
      <span className="equipment-detail-value">{children || "—"}</span>
    </div>
  );
}

export function EquipmentDetailPage({ user, equipmentId, onNavigate = () => {} }) {
  const [equipment, setEquipment] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [maintenancePlans, setMaintenancePlans] = useState([]);
  const [planSaving, setPlanSaving] = useState(false);
  const [planError, setPlanError] = useState("");
  const [planSuccess, setPlanSuccess] = useState("");
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [planForm, setPlanForm] = useState({
    activity: "",
    instructions: "",
    frequency: "MONTHLY",
    nextDueDate: "",
    assignedTechnicianId: "",
    isActive: true,
  });
  const [success, setSuccess] = useState("");

  const validId =
    /^[1-9]\d*$/.test(String(equipmentId)) &&
    Number.isSafeInteger(Number(equipmentId));

  useEffect(() => {
    let cancelled = false;

    async function loadEquipment() {
      if (!validId) {
        setNotFound(false);
        setError("Invalid equipment ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setNotFound(false);
      try {
        const [item, locationHistory, plans] = await Promise.all([
          api.getEquipmentById(Number(equipmentId)),
          api.getEquipmentLocationHistory(Number(equipmentId)),
          typeof api.listMaintenancePlansByEquipment === "function"
            ? api.listMaintenancePlansByEquipment(Number(equipmentId))
            : Promise.resolve([]),
        ]);
        if (!cancelled) {
          setEquipment(item);
          setHistory(locationHistory);
          setMaintenancePlans(plans);
        }
      } catch (requestError) {
        if (!cancelled) {
          setNotFound(requestError?.response?.status === 404);
          setError(handleApiError(requestError));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadEquipment();
    return () => {
      cancelled = true;
    };
  }, [equipmentId, validId]);

  function resetPlanForm() {
    setPlanForm({
      activity: "",
      instructions: "",
      frequency: "MONTHLY",
      nextDueDate: "",
      assignedTechnicianId: "",
      isActive: true,
    });
    setEditingPlanId(null);
  }

  function startPlanEdit(plan) {
    setEditingPlanId(plan.id);
    setPlanForm({
      activity: plan.activity || "",
      instructions: plan.instructions || "",
      frequency: plan.frequency || "MONTHLY",
      nextDueDate: toDateInputValue(plan.nextDueDate),
      assignedTechnicianId: plan.assignedTechnicianId ? String(plan.assignedTechnicianId) : "",
      isActive: Boolean(plan.isActive),
    });
    setPlanError("");
    setPlanSuccess("");
  }

  async function handleCreateMaintenancePlan(event) {
    event.preventDefault();
    if (!equipment) return;

    setPlanError("");
    setPlanSuccess("");
    setPlanSaving(true);

    try {
      const payload = {
        equipmentId: equipment.id,
        activity: planForm.activity,
        instructions: planForm.instructions || undefined,
        frequency: planForm.frequency,
        assignedTechnicianId: planForm.assignedTechnicianId ? Number(planForm.assignedTechnicianId) : null,
        nextDueDate: planForm.nextDueDate || new Date().toISOString(),
        isActive: planForm.isActive,
      };

      if (editingPlanId) {
        const updatePayload = {
          activity: payload.activity,
          instructions: payload.instructions ?? null,
          frequency: payload.frequency,
          assignedTechnicianId: payload.assignedTechnicianId,
          nextDueDate: payload.nextDueDate,
          isActive: payload.isActive,
        };
        await api.updateMaintenancePlan(editingPlanId, updatePayload);
        setPlanSuccess("Maintenance plan updated.");
      } else {
        await api.createMaintenancePlan(payload);
        setPlanSuccess("Maintenance plan created.");
      }

      resetPlanForm();
      const plans = typeof api.listMaintenancePlansByEquipment === "function"
        ? await api.listMaintenancePlansByEquipment(equipment.id)
        : [];
      setMaintenancePlans(plans);
    } catch (requestError) {
      setPlanError(handleApiError(requestError));
    } finally {
      setPlanSaving(false);
    }
  }

  async function handleTogglePlanStatus(plan) {
    if (!canManagePlans) return;

    setPlanError("");
    setPlanSuccess("");
    try {
      await api.updateMaintenancePlan(plan.id, { isActive: !plan.isActive });
      const plans = typeof api.listMaintenancePlansByEquipment === "function"
        ? await api.listMaintenancePlansByEquipment(equipment.id)
        : maintenancePlans;
      setMaintenancePlans(plans);
      setPlanSuccess(`Maintenance plan ${!plan.isActive ? "activated" : "deactivated"}.`);
    } catch (requestError) {
      setPlanError(handleApiError(requestError));
    }
  }

  async function handleDeactivate() {
    if (!equipment || !window.confirm(
      `Deactivate ${equipment.name} (${equipment.code})? This will preserve its records and location history.`,
    )) {
      return;
    }

    setDeactivating(true);
    setError("");
    setSuccess("");
    try {
      const updatedEquipment = await api.deactivateEquipment(equipment.id);
      setEquipment({ ...equipment, ...updatedEquipment, isDeactivated: true });
      setSuccess(`${equipment.code} was deactivated.`);
    } catch (requestError) {
      setError(handleApiError(requestError));
    } finally {
      setDeactivating(false);
    }
  }

  const canDeactivate = user?.role === "ADMIN" || user?.role === "MANAGER";
  const canManagePlans = user?.role === "ADMIN" || user?.role === "MANAGER";
  const warranty = WARRANTY_BADGES[equipment?.warrantyStatus] || WARRANTY_BADGES.NOT_RECORDED;

  return (
    <div className="equipment-detail-page">
      <header className="equipment-detail-header">
        <button
          type="button"
          className="equipment-btn-secondary"
          onClick={() => onNavigate("equipment")}
        >
          <MaterialIcon>arrow_back</MaterialIcon>
          Back to Equipment List
        </button>
        <div className="equipment-detail-actions">
          {equipment && (
            <button
              type="button"
              className="equipment-btn-secondary"
              onClick={() => onNavigate(`equipment-edit-${equipment.id}`)}
            >
              <MaterialIcon>edit</MaterialIcon>
              Edit Equipment
            </button>
          )}
          {canDeactivate && equipment && !equipment.isDeactivated && (
            <button
              type="button"
              className="equipment-btn-danger"
              onClick={handleDeactivate}
              disabled={deactivating}
            >
              {deactivating ? "Deactivating..." : "Deactivate"}
            </button>
          )}
        </div>
      </header>

      {loading ? (
        <p className="equipment-detail-state" role="status">Loading equipment details...</p>
      ) : error ? (
        <p className="equipment-alert" role="alert">
          {notFound ? "Equipment not found." : error}
        </p>
      ) : equipment ? (
        <main className="equipment-detail-content">
          <div className="equipment-detail-title">
            <div>
              <p>Equipment / Details</p>
              <h1>{equipment.name}</h1>
              <span className="equipment-code">{equipment.code}</span>
            </div>
            <span className={`equipment-warranty-badge ${warranty.className}`}>
              {warranty.label}
            </span>
          </div>

          {success && <p className="equipment-detail-success" role="status">{success}</p>}
          {error && <p className="equipment-alert" role="alert">{error}</p>}

          <section className="equipment-detail-card" aria-labelledby="equipment-info-heading">
            <h2 id="equipment-info-heading">Equipment Information</h2>
            <div className="equipment-details-grid">
              <EquipmentField label="Equipment Code">{equipment.code}</EquipmentField>
              <EquipmentField label="Equipment Name">{equipment.name}</EquipmentField>
              <EquipmentField label="Serial Number">{equipment.serialNumber}</EquipmentField>
              <EquipmentField label="Category">{equipment.category?.name}</EquipmentField>
              <EquipmentField label="Department">{equipment.department?.name}</EquipmentField>
              <EquipmentField label="Current Location">{equipment.location?.name}</EquipmentField>
              <EquipmentField label="Criticality">{equipment.criticality}</EquipmentField>
              <EquipmentField label="Equipment Status">{equipment.status}</EquipmentField>
              <EquipmentField label="Description and Notes">{equipment.description}</EquipmentField>
            </div>
          </section>

          <section className="equipment-detail-card" aria-labelledby="purchase-heading">
            <h2 id="purchase-heading">Purchase Information</h2>
            <div className="equipment-details-grid">
              <EquipmentField label="Purchase Date">{formatDate(equipment.purchaseDate)}</EquipmentField>
              <EquipmentField label="Purchase Cost">
                {equipment.purchaseCost == null
                  ? "—"
                  : `$${Number(equipment.purchaseCost).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
              </EquipmentField>
            </div>
          </section>

          <section className="equipment-detail-card" aria-labelledby="warranty-heading">
            <h2 id="warranty-heading">Warranty Information</h2>
            <div className="equipment-details-grid">
              <EquipmentField label="Warranty Start Date">{formatDate(equipment.warrantyStartDate)}</EquipmentField>
              <EquipmentField label="Warranty Expiry Date">{formatDate(equipment.warrantyExpiryDate)}</EquipmentField>
              <EquipmentField label="Warranty Status">{warranty.label}</EquipmentField>
            </div>
          </section>

          <section className="equipment-detail-card" aria-labelledby="maintenance-plans-heading">
            <h2 id="maintenance-plans-heading">Preventive Maintenance Plans</h2>
            {canManagePlans && (
              <form onSubmit={handleCreateMaintenancePlan} className="equipment-detail-form" style={{ marginBottom: "1rem" }}>
                <div className="equipment-details-grid">
                  <label className="equipment-detail-item">
                    <span className="equipment-detail-label">Activity</span>
                    <input
                      value={planForm.activity}
                      onChange={(event) => setPlanForm({ ...planForm, activity: event.target.value })}
                      required
                      placeholder="Oil change"
                    />
                  </label>
                  <label className="equipment-detail-item">
                    <span className="equipment-detail-label">Frequency</span>
                    <select value={planForm.frequency} onChange={(event) => setPlanForm({ ...planForm, frequency: event.target.value })}>
                      <option value="DAILY">Daily</option>
                      <option value="WEEKLY">Weekly</option>
                      <option value="MONTHLY">Monthly</option>
                      <option value="QUARTERLY">Quarterly</option>
                      <option value="HALF_YEARLY">Half yearly</option>
                      <option value="YEARLY">Yearly</option>
                    </select>
                  </label>
                  <label className="equipment-detail-item">
                    <span className="equipment-detail-label">Next due</span>
                    <input
                      type="date"
                      value={planForm.nextDueDate}
                      onChange={(event) => setPlanForm({ ...planForm, nextDueDate: event.target.value })}
                    />
                  </label>
                  <label className="equipment-detail-item">
                    <span className="equipment-detail-label">Assigned technician</span>
                    <input
                      type="number"
                      min="1"
                      value={planForm.assignedTechnicianId}
                      onChange={(event) => setPlanForm({ ...planForm, assignedTechnicianId: event.target.value })}
                      placeholder="Optional"
                    />
                  </label>
                  <label className="equipment-detail-item">
                    <span className="equipment-detail-label">Plan status</span>
                    <select
                      value={String(planForm.isActive)}
                      onChange={(event) => setPlanForm({ ...planForm, isActive: event.target.value === "true" })}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </label>
                </div>
                <label className="equipment-detail-item">
                  <span className="equipment-detail-label">Instructions</span>
                  <textarea
                    value={planForm.instructions}
                    onChange={(event) => setPlanForm({ ...planForm, instructions: event.target.value })}
                    rows="3"
                    placeholder="Optional work instructions"
                  />
                </label>
                {planError && <p className="equipment-alert" role="alert">{planError}</p>}
                {planSuccess && <p className="equipment-detail-success" role="status">{planSuccess}</p>}
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <button type="submit" className="equipment-btn-secondary" disabled={planSaving}>
                    {planSaving ? "Saving..." : editingPlanId ? "Update plan" : "Add plan"}
                  </button>
                  {editingPlanId && (
                    <button type="button" className="equipment-btn-secondary" onClick={resetPlanForm}>
                      Cancel edit
                    </button>
                  )}
                </div>
              </form>
            )}
            {maintenancePlans.length === 0 ? (
              <p className="equipment-detail-empty">No preventive maintenance plans have been created for this equipment.</p>
            ) : (
              <div className="equipment-detail-history-scroll">
                <table className="equipment-table equipment-detail-history">
                  <thead>
                    <tr>
                      <th scope="col">Activity</th>
                      <th scope="col">Frequency</th>
                      <th scope="col">Next Due</th>
                      <th scope="col">Status</th>
                      {canManagePlans && <th scope="col">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {maintenancePlans.map((plan) => (
                      <tr key={plan.id}>
                        <td>{plan.activity}</td>
                        <td>{plan.frequency.replaceAll("_", " ")}</td>
                        <td>{formatDate(plan.nextDueDate)}</td>
                        <td>{plan.isActive ? "Active" : "Inactive"}</td>
                        {canManagePlans && (
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                              <button type="button" className="equipment-btn-secondary" onClick={() => startPlanEdit(plan)}>
                                Edit
                              </button>
                              <button type="button" className="equipment-btn-secondary" onClick={() => handleTogglePlanStatus(plan)}>
                                {plan.isActive ? "Deactivate" : "Activate"}
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="equipment-detail-card" aria-labelledby="location-history-heading">
            <h2 id="location-history-heading">Location History</h2>
            {history.length === 0 ? (
              <p className="equipment-detail-empty">No location history has been recorded.</p>
            ) : (
              <div className="equipment-detail-history-scroll">
                <table className="equipment-table equipment-detail-history">
                  <thead>
                    <tr>
                      <th scope="col">Previous Location</th>
                      <th scope="col">New Location</th>
                      <th scope="col">Changed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.fromLocation?.name ?? "—"}</td>
                        <td>{entry.toLocation?.name ?? "—"}</td>
                        <td>{formatDate(entry.changedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="equipment-detail-history-note">Newest changes are listed first.</p>
              </div>
            )}
          </section>
        </main>
      ) : null}
    </div>
  );
}
