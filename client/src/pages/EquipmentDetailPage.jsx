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
        const [item, locationHistory] = await Promise.all([
          api.getEquipmentById(Number(equipmentId)),
          api.getEquipmentLocationHistory(Number(equipmentId)),
        ]);
        if (!cancelled) {
          setEquipment(item);
          setHistory(locationHistory);
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
