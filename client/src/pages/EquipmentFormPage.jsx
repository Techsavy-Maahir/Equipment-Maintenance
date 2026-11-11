import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import { MaterialIcon } from "../components/MaterialIcon";
import "./EquipmentListPage.css";
import "./EquipmentFormPage.css";

function formatDateForInput(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}

const EQUIPMENT_FIELDS = new Set([
  "code",
  "serialNumber",
  "name",
  "description",
  "criticality",
  "status",
  "departmentId",
  "locationId",
  "categoryId",
  "purchaseDate",
  "purchaseCost",
  "warrantyStartDate",
  "warrantyExpiryDate",
]);

function getServerValidationErrors(error) {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const fieldErrors = {};
  let hasUnmappedDetails = false;

  if (data?.details && typeof data.details === "object") {
    for (const [field, message] of Object.entries(data.details)) {
      if (EQUIPMENT_FIELDS.has(field) && typeof message === "string") {
        fieldErrors[field] = message;
      } else {
        hasUnmappedDetails = true;
      }
    }
  }

  if (status === 409 && /\bcode\b/i.test(data?.message || "")) {
    fieldErrors.code = "This equipment code is already in use.";
  }

  return {
    fieldErrors,
    generalError:
      hasUnmappedDetails || Object.keys(fieldErrors).length === 0
        ? handleApiError(error)
        : "",
  };
}

export function EquipmentFormPage({
  user,
  equipmentId = null,
  onNavigate = () => {},
  onSuccess = () => {},
}) {
  const isEditMode = Boolean(equipmentId);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Master data options
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    serialNumber: "",
    description: "",
    criticality: "MEDIUM",
    status: "ACTIVE",
    departmentId: "",
    locationId: "",
    categoryId: "",
    purchaseDate: "",
    purchaseCost: "",
    warrantyStartDate: "",
    warrantyExpiryDate: "",
  });

  const [warrantyStatus, setWarrantyStatus] = useState("NOT_RECORDED");

  // Load master data dropdown options
  useEffect(() => {
    let cancelled = false;

    async function loadMasterData() {
      try {
        const [deptRes, locRes, catRes] = await Promise.all([
          api.getDepartments({ pageSize: 100, status: "active" }),
          api.getLocations({ pageSize: 100, status: "active" }),
          api.getCategories({ pageSize: 100, status: "active" }),
        ]);

        if (!cancelled) {
          setDepartments(deptRes.items);
          setLocations(locRes.items);
          setCategories(catRes.items);

          if (!isEditMode) {
            setFormData((prev) => ({
              ...prev,
              departmentId: prev.departmentId || (deptRes.items[0]?.id ? String(deptRes.items[0].id) : ""),
              locationId: prev.locationId || (locRes.items[0]?.id ? String(locRes.items[0].id) : ""),
              categoryId: prev.categoryId || (catRes.items[0]?.id ? String(catRes.items[0].id) : ""),
            }));
          }
        }
      } catch (err) {
        if (!cancelled) {
          setGeneralError(handleApiError(err));
        }
      }
    }

    loadMasterData();
    return () => {
      cancelled = true;
    };
  }, [isEditMode]);

  // Load existing equipment if in edit mode
  useEffect(() => {
    if (!isEditMode || !equipmentId) return;
    let cancelled = false;

    async function fetchEquipment() {
      setLoading(true);
      setGeneralError("");
      try {
        const item = await api.getEquipmentById(Number(equipmentId));
        if (!cancelled && item) {
          setFormData({
            code: item.code || "",
            name: item.name || "",
            serialNumber: item.serialNumber || "",
            description: item.description || "",
            criticality: item.criticality || "MEDIUM",
            status: item.status || "ACTIVE",
            departmentId: item.departmentId ? String(item.departmentId) : "",
            locationId: item.locationId ? String(item.locationId) : "",
            categoryId: item.categoryId ? String(item.categoryId) : "",
            purchaseDate: formatDateForInput(item.purchaseDate),
            purchaseCost: item.purchaseCost != null ? String(item.purchaseCost) : "",
            warrantyStartDate: formatDateForInput(item.warrantyStartDate),
            warrantyExpiryDate: formatDateForInput(item.warrantyExpiryDate),
          });
          setWarrantyStatus(item.warrantyStatus || "NOT_RECORDED");
        }
      } catch (err) {
        if (!cancelled) {
          setGeneralError(handleApiError(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchEquipment();
    return () => {
      cancelled = true;
    };
  }, [isEditMode, equipmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.code.trim()) errors.code = "Equipment ID / Code is required";
    if (!formData.name.trim()) errors.name = "Equipment name is required";
    if (!formData.departmentId) errors.departmentId = "Department is required";
    if (!formData.locationId) errors.locationId = "Location is required";
    if (!formData.categoryId) errors.categoryId = "Category is required";

    if (formData.purchaseCost !== "") {
      const costNum = Number(formData.purchaseCost);
      if (isNaN(costNum) || costNum < 0) {
        errors.purchaseCost = "Purchase cost must be a positive number";
      }
    }

    if (formData.warrantyStartDate && formData.warrantyExpiryDate) {
      const start = new Date(formData.warrantyStartDate);
      const expiry = new Date(formData.warrantyExpiryDate);
      if (expiry <= start) {
        errors.warrantyExpiryDate = "Warranty expiry must be after warranty start date";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMsg("");
    setFieldErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    const payload = {
      code: formData.code.trim(),
      name: formData.name.trim(),
      description: formData.description.trim() ? formData.description.trim() : null,
      serialNumber: formData.serialNumber.trim() ? formData.serialNumber.trim() : null,
      criticality: formData.criticality,
      status: formData.status,
      departmentId: Number(formData.departmentId),
      locationId: Number(formData.locationId),
      categoryId: Number(formData.categoryId),
      purchaseDate: formData.purchaseDate ? new Date(formData.purchaseDate).toISOString() : null,
      purchaseCost: formData.purchaseCost !== "" ? Number(formData.purchaseCost) : null,
      warrantyStartDate: formData.warrantyStartDate ? new Date(formData.warrantyStartDate).toISOString() : null,
      warrantyExpiryDate: formData.warrantyExpiryDate ? new Date(formData.warrantyExpiryDate).toISOString() : null,
    };

    try {
      if (isEditMode) {
        await api.updateEquipment(Number(equipmentId), payload);
        setSuccessMsg("Equipment updated successfully!");
      } else {
        await api.createEquipment(payload);
        setSuccessMsg("Equipment created successfully!");
      }

      setTimeout(() => {
        onSuccess();
        onNavigate("equipment");
      }, 800);
    } catch (err) {
      const { fieldErrors: serverFieldErrors, generalError: serverGeneralError } =
        getServerValidationErrors(err);
      setFieldErrors(serverFieldErrors);
      setGeneralError(serverGeneralError);
    } finally {
      setSubmitting(false);
    }
  };

  const userName = user?.name || "Alex Morgan";
  const userRole = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
    : "Maintenance Manager";

  return (
    <div className="equipment-app">
      {/* Sidebar */}
      <aside className="equipment-sidebar">
        <div className="equipment-sidebar-top">
          <a
            className="equipment-brand"
            href="#equipment"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("equipment");
            }}
            aria-label="IMMS Plant Engine"
          >
            <span className="equipment-brand-mark">
              <MaterialIcon>precision_manufacturing</MaterialIcon>
            </span>
            <span className="equipment-brand-copy">
              <strong>IMMS</strong>
              <small>Plant Engine</small>
            </span>
          </a>

          <nav className="equipment-nav" aria-label="Main navigation">
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("dashboard")}
            >
              <MaterialIcon>dashboard</MaterialIcon><span>Dashboard</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item is-active"
              onClick={() => onNavigate("equipment")}
            >
              <MaterialIcon>precision_manufacturing</MaterialIcon><span>Equipment</span>
            </button>
            <button
              type="button"
              className="equipment-nav-item"
              onClick={() => onNavigate("requests")}
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
              className="equipment-nav-item"
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
                className="equipment-nav-item"
                onClick={() => onNavigate("user-management")}
              >
                <MaterialIcon>group</MaterialIcon><span>User Management</span>
              </button>
            )}
          </nav>
        </div>

        <div className="equipment-release">
          <span>SYS::RELEASE</span>
          <span className="equipment-release-version">v4.8.2 LTS</span>
        </div>
      </aside>

      {/* Main Container */}
      <div className="equipment-main">
        {/* Topbar */}
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb">
              <span>Workspace</span>
              <MaterialIcon>chevron_right</MaterialIcon>
              <button
                type="button"
                className="equipment-nav-breadcrumb-btn"
                style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0 }}
                onClick={() => onNavigate("equipment")}
              >
                Equipment
              </button>
              <MaterialIcon>chevron_right</MaterialIcon>
              <strong>{isEditMode ? "Edit Equipment" : "Add Equipment"}</strong>
            </div>
          </div>

          <div className="equipment-user-area">
            <div className="equipment-user-info">
              <span className="equipment-user-avatar">
                <MaterialIcon>person</MaterialIcon>
              </span>
              <span className="equipment-user-copy">
                <strong>{userName}</strong>
                <small>{userRole}</small>
              </span>
            </div>
          </div>
        </header>

        {/* Content Workspace */}
        <main className="equipment-workspace">
          <div className="equipment-form-container">
            {/* Header */}
            <div className="equipment-form-header">
              <div className="equipment-form-title-group">
                <h1>{isEditMode ? `Edit Equipment: ${formData.code || ""}` : "Add New Equipment"}</h1>
                <p>
                  {isEditMode
                    ? "Update equipment specifications, location, warranty, and lifecycle details."
                    : "Register a new asset with operational, assignment, and warranty tracking."}
                </p>
              </div>
              <div className="equipment-form-actions-top">
                <button
                  type="button"
                  className="equipment-btn-secondary"
                  onClick={() => onNavigate("equipment")}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="equipment-btn-primary"
                  aria-label={isEditMode ? "Save Changes (Top)" : "Create Asset (Top)"}
                  onClick={handleSubmit}
                  disabled={submitting || loading}
                >
                  <MaterialIcon>{isEditMode ? "save" : "add"}</MaterialIcon>
                  <span>{submitting ? "Saving..." : isEditMode ? "Save Changes" : "Create Asset"}</span>
                </button>
              </div>
            </div>

            {generalError && (
              <div className="equipment-form-banner-error" role="alert">
                <MaterialIcon>error</MaterialIcon>
                <span>{generalError}</span>
              </div>
            )}

            {successMsg && (
              <div className="equipment-form-banner-success" role="status">
                <MaterialIcon>check_circle</MaterialIcon>
                <span>{successMsg}</span>
              </div>
            )}

            {loading ? (
              <div className="equipment-form-card" style={{ textAlign: "center", padding: "48px" }}>
                <span>Loading asset specifications...</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Basic Identification */}
                <div className="equipment-form-card">
                  <div>
                    <h2 className="equipment-form-section-title">
                      <MaterialIcon>info</MaterialIcon>
                      Asset Identification
                    </h2>
                    <p className="equipment-form-section-desc">
                      Essential asset codes, name, and manufacturer serial numbers.
                    </p>
                  </div>

                  <div className="equipment-form-grid">
                    <div className="equipment-form-field">
                      <label htmlFor="eq-code">
                        Equipment ID / Code <span className="required">*</span>
                      </label>
                      <input
                        id="eq-code"
                        name="code"
                        type="text"
                        placeholder="e.g. EQ-10421"
                        className="equipment-form-input"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(fieldErrors.code)}
                      />
                      {fieldErrors.code && (
                        <span className="equipment-form-field-error">{fieldErrors.code}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-serial">Serial Number</label>
                      <input
                        id="eq-serial"
                        name="serialNumber"
                        type="text"
                        placeholder="e.g. SN-8829-XJ"
                        className="equipment-form-input"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.serialNumber)}
                      />
                      {fieldErrors.serialNumber && (
                        <span className="equipment-form-field-error">{fieldErrors.serialNumber}</span>
                      )}
                    </div>

                    <div className="equipment-form-field equipment-form-field-full">
                      <label htmlFor="eq-name">
                        Equipment Name <span className="required">*</span>
                      </label>
                      <input
                        id="eq-name"
                        name="name"
                        type="text"
                        placeholder="e.g. CNC Milling Center #04"
                        className="equipment-form-input"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(fieldErrors.name)}
                      />
                      {fieldErrors.name && (
                        <span className="equipment-form-field-error">{fieldErrors.name}</span>
                      )}
                    </div>

                    <div className="equipment-form-field equipment-form-field-full">
                      <label htmlFor="eq-desc">Description & Notes</label>
                      <textarea
                        id="eq-desc"
                        name="description"
                        placeholder="Technical details, operating capacity, or maintenance notes..."
                        className="equipment-form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.description)}
                      />
                      {fieldErrors.description && (
                        <span className="equipment-form-field-error">{fieldErrors.description}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Classification & Plant Assignment */}
                <div className="equipment-form-card" style={{ marginTop: "20px" }}>
                  <div>
                    <h2 className="equipment-form-section-title">
                      <MaterialIcon>domain</MaterialIcon>
                      Plant Assignment & Classification
                    </h2>
                    <p className="equipment-form-section-desc">
                      Department ownership, physical plant location, and operational criticality.
                    </p>
                  </div>

                  <div className="equipment-form-grid-3">
                    <div className="equipment-form-field">
                      <label htmlFor="eq-dept">
                        Department <span className="required">*</span>
                      </label>
                      <select
                        id="eq-dept"
                        name="departmentId"
                        className="equipment-form-select"
                        value={formData.departmentId}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(fieldErrors.departmentId)}
                      >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.departmentId && (
                        <span className="equipment-form-field-error">{fieldErrors.departmentId}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-loc">
                        Location <span className="required">*</span>
                      </label>
                      <select
                        id="eq-loc"
                        name="locationId"
                        className="equipment-form-select"
                        value={formData.locationId}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(fieldErrors.locationId)}
                      >
                        <option value="">Select Location</option>
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.locationId && (
                        <span className="equipment-form-field-error">{fieldErrors.locationId}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-cat">
                        Category <span className="required">*</span>
                      </label>
                      <select
                        id="eq-cat"
                        name="categoryId"
                        className="equipment-form-select"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        aria-invalid={Boolean(fieldErrors.categoryId)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.categoryId && (
                        <span className="equipment-form-field-error">{fieldErrors.categoryId}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-criticality">Criticality Level</label>
                      <select
                        id="eq-criticality"
                        name="criticality"
                        className="equipment-form-select"
                        value={formData.criticality}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.criticality)}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                      {fieldErrors.criticality && (
                        <span className="equipment-form-field-error">{fieldErrors.criticality}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-status">Operational Status</label>
                      <select
                        id="eq-status"
                        name="status"
                        className="equipment-form-select"
                        value={formData.status}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.status)}
                      >
                        <option value="ACTIVE">Operational (Active)</option>
                        <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      {fieldErrors.status && (
                        <span className="equipment-form-field-error">{fieldErrors.status}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Procurement & Warranty (M3) */}
                <div className="equipment-form-card" style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h2 className="equipment-form-section-title">
                        <MaterialIcon>verified_user</MaterialIcon>
                        Procurement & Warranty Management
                      </h2>
                      <p className="equipment-form-section-desc">
                        Asset purchase details and active manufacturer warranty validity.
                      </p>
                    </div>

                    {isEditMode && (
                      <span
                        className={`equipment-form-status-indicator ${
                          warrantyStatus === "VALID"
                            ? "valid"
                            : warrantyStatus === "EXPIRING_SOON"
                            ? "expiring"
                            : warrantyStatus === "EXPIRED"
                            ? "expired"
                            : "not-recorded"
                        }`}
                      >
                        {warrantyStatus.replace("_", " ")}
                      </span>
                    )}
                  </div>

                  <div className="equipment-form-grid">
                    <div className="equipment-form-field">
                      <label htmlFor="eq-purchase-date">Purchase Date</label>
                      <input
                        id="eq-purchase-date"
                        name="purchaseDate"
                        type="date"
                        className="equipment-form-input"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.purchaseDate)}
                      />
                      {fieldErrors.purchaseDate && (
                        <span className="equipment-form-field-error">{fieldErrors.purchaseDate}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-purchase-cost">Purchase Cost ($)</label>
                      <input
                        id="eq-purchase-cost"
                        name="purchaseCost"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="equipment-form-input"
                        value={formData.purchaseCost}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.purchaseCost)}
                      />
                      {fieldErrors.purchaseCost && (
                        <span className="equipment-form-field-error">{fieldErrors.purchaseCost}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-warranty-start">Warranty Start Date</label>
                      <input
                        id="eq-warranty-start"
                        name="warrantyStartDate"
                        type="date"
                        className="equipment-form-input"
                        value={formData.warrantyStartDate}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.warrantyStartDate)}
                      />
                      {fieldErrors.warrantyStartDate && (
                        <span className="equipment-form-field-error">{fieldErrors.warrantyStartDate}</span>
                      )}
                    </div>

                    <div className="equipment-form-field">
                      <label htmlFor="eq-warranty-expiry">Warranty Expiry Date</label>
                      <input
                        id="eq-warranty-expiry"
                        name="warrantyExpiryDate"
                        type="date"
                        className="equipment-form-input"
                        value={formData.warrantyExpiryDate}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.warrantyExpiryDate)}
                      />
                      {fieldErrors.warrantyExpiryDate && (
                        <span className="equipment-form-field-error">{fieldErrors.warrantyExpiryDate}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="equipment-form-footer">
                  <button
                    type="button"
                    className="equipment-btn-secondary"
                    onClick={() => onNavigate("equipment")}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="equipment-btn-primary"
                    disabled={submitting || loading}
                  >
                    <MaterialIcon>{isEditMode ? "save" : "add"}</MaterialIcon>
                    <span>{submitting ? "Saving..." : isEditMode ? "Save Changes" : "Create Asset"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
