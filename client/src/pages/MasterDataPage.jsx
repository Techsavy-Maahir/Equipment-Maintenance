import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import { MaterialIcon } from "../components/MaterialIcon";
import "./EquipmentListPage.css";
import "./MasterDataPage.css";

const PAGE_SIZES = [8, 16, 24];

export function MasterDataPage({
  user,
  authError = "",
  onLogout,
  isLoggingOut = false,
  currentPage = "master-data",
  onNavigate = () => {},
  initialTab = "departments",
}) {
  const isAdmin = user?.role === "ADMIN";

  // Active tab: 'departments' | 'locations' | 'categories'
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filters & Pagination
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [reloadVersion, setReloadVersion] = useState(0);

  // Tab data counts for badges
  const [tabCounts, setTabCounts] = useState({
    departments: 0,
    locations: 0,
    categories: 0,
  });

  // Current tab items & state
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Modal dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formName, setFormName] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load counts for all three tabs (for tab navigation badges)
  useEffect(() => {
    let cancelled = false;

    async function fetchCounts() {
      try {
        const [deptRes, locRes, catRes] = await Promise.all([
          api.getDepartments({ pageSize: 1 }),
          api.getLocations({ pageSize: 1 }),
          api.getCategories({ pageSize: 1 }),
        ]);
        if (!cancelled) {
          setTabCounts({
            departments: deptRes.total,
            locations: locRes.total,
            categories: catRes.total,
          });
        }
      } catch {
        // Ignore count fetch errors
      }
    }

    fetchCounts();
    return () => {
      cancelled = true;
    };
  }, [reloadVersion]);

  // Load data for active tab
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const params = {
          search,
          status: statusFilter,
          page,
          pageSize,
        };

        let response;
        if (activeTab === "departments") {
          response = await api.getDepartments(params);
        } else if (activeTab === "locations") {
          response = await api.getLocations(params);
        } else {
          response = await api.getCategories(params);
        }

        if (!cancelled) {
          setItems(response.items);
          setTotal(response.total);
          setTabCounts((prev) => ({
            ...prev,
            [activeTab]: response.total,
          }));
        }
      } catch (err) {
        if (!cancelled) {
          setError(handleApiError(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [activeTab, search, statusFilter, page, pageSize, reloadVersion]);

  // Switch tab
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchInput("");
    setSearch("");
    setStatusFilter("all");
    setPage(1);
    setError(null);
    setSuccessMessage(null);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setStatusFilter("all");
    setPage(1);
  };

  // Open Create Dialog
  const handleOpenCreate = () => {
    setFormName("");
    setFormError("");
    setIsCreateOpen(true);
  };

  // Open Edit Dialog
  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormName(item.name);
    setFormError("");
    setIsEditOpen(true);
  };

  // Open Deactivate Dialog
  const handleOpenDeactivate = (item) => {
    setSelectedItem(item);
    setIsDeactivateOpen(true);
  };

  // Submit Create
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const trimmed = formName.trim();
    if (!trimmed) {
      setFormError("Name is required");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      if (activeTab === "departments") {
        await api.createDepartment({ name: trimmed });
      } else if (activeTab === "locations") {
        await api.createLocation({ name: trimmed });
      } else {
        await api.createCategory({ name: trimmed });
      }

      setIsCreateOpen(false);
      setSuccessMessage(`Successfully created ${getSingularLabel(activeTab)}: "${trimmed}"`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setFormError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const trimmed = formName.trim();
    if (!trimmed) {
      setFormError("Name cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      if (activeTab === "departments") {
        await api.updateDepartment(selectedItem.id, { name: trimmed });
      } else if (activeTab === "locations") {
        await api.updateLocation(selectedItem.id, { name: trimmed });
      } else {
        await api.updateCategory(selectedItem.id, { name: trimmed });
      }

      setIsEditOpen(false);
      setSuccessMessage(`Successfully updated ${getSingularLabel(activeTab)}: "${trimmed}"`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setFormError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Deactivate
  const handleDeactivateSubmit = async () => {
    if (!selectedItem) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (activeTab === "departments") {
        await api.deactivateDepartment(selectedItem.id);
      } else if (activeTab === "locations") {
        await api.deactivateLocation(selectedItem.id);
      } else {
        await api.deactivateCategory(selectedItem.id);
      }

      setIsDeactivateOpen(false);
      setSuccessMessage(`Successfully deactivated ${getSingularLabel(activeTab)}: "${selectedItem.name}"`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      // Clear modal and show actionable error banner prominently
      setIsDeactivateOpen(false);
      setError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reactivate
  const handleReactivate = async (item) => {
    try {
      if (activeTab === "departments") {
        await api.reactivateDepartment(item.id);
      } else if (activeTab === "locations") {
        await api.reactivateLocation(item.id);
      } else {
        await api.reactivateCategory(item.id);
      }

      setSuccessMessage(`Successfully reactivated ${getSingularLabel(activeTab)}: "${item.name}"`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  function getSingularLabel(tab) {
    if (tab === "departments") return "Department";
    if (tab === "locations") return "Location";
    return "Category";
  }

  function getCodePrefix(tab, id) {
    const padded = String(id).padStart(2, "0");
    if (tab === "departments") return `DEP-${padded}`;
    if (tab === "locations") return `LOC-${padded}`;
    return `CAT-${padded}`;
  }

  const activeCount = items.filter((i) => i.isActive).length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const firstRow = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRow = Math.min(page * pageSize, total);

  const userName = user?.name || "Maintenance User";
  const userRole = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
    : "Maintenance Team";

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
            <button type="button" className="equipment-nav-item" disabled>
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
            {isAdmin && (
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

      {/* Main Area */}
      <div className="equipment-main">
        {/* Topbar */}
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb">
              <span>Administration</span>
              <MaterialIcon>chevron_right</MaterialIcon>
              <strong>Master Data</strong>
            </div>
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

        {/* Workspace Content */}
        <main className="equipment-workspace">
          <div className="master-data-page">
            <div className="master-data-container">
              {/* Header */}
              <div className="master-data-header">
                <div className="master-data-header-text">
                  <h1>Master Data</h1>
                  <p>Configure and manage system departments, locations, and categories</p>
                </div>
                {isAdmin && (
                  <button
                    className="master-data-add-btn"
                    type="button"
                    onClick={handleOpenCreate}
                  >
                    <MaterialIcon>add</MaterialIcon>
                    <span>Add {getSingularLabel(activeTab)}</span>
                  </button>
                )}
              </div>

              {/* Success / Error Alerts */}
              {authError && <div className="master-data-alert error" role="alert">{authError}</div>}
              {error && <div className="master-data-alert error" role="alert">{error}</div>}
              {successMessage && <div className="master-data-alert success" role="status">{successMessage}</div>}

              {/* Tabs */}
              <div className="master-data-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "departments"}
                  className={`master-data-tab-btn ${activeTab === "departments" ? "is-active" : ""}`}
                  onClick={() => handleTabChange("departments")}
                >
                  <span className="master-data-tab-label">Departments</span>
                  <span className="master-data-tab-badge">{tabCounts.departments}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "locations"}
                  className={`master-data-tab-btn ${activeTab === "locations" ? "is-active" : ""}`}
                  onClick={() => handleTabChange("locations")}
                >
                  <span className="master-data-tab-label">Locations</span>
                  <span className="master-data-tab-badge">{tabCounts.locations}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "categories"}
                  className={`master-data-tab-btn ${activeTab === "categories" ? "is-active" : ""}`}
                  onClick={() => handleTabChange("categories")}
                >
                  <span className="master-data-tab-label">Categories</span>
                  <span className="master-data-tab-badge">{tabCounts.categories}</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="master-data-filter-bar">
                <div className="master-data-filter-left">
                  <div className="master-data-search-wrap">
                    <MaterialIcon className="master-data-search-icon">search</MaterialIcon>
                    <input
                      type="search"
                      className="master-data-search-input"
                      placeholder="Search by name or code..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      aria-label="Search master data"
                    />
                  </div>

                  <select
                    className="master-data-select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    aria-label="Filter by status"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {(searchInput || statusFilter !== "all") && (
                    <button
                      type="button"
                      className="master-data-reset-btn"
                      onClick={handleResetFilters}
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

                <div className="master-data-filter-right">
                  <div className="master-data-active-pill">
                    <span className="master-data-pill-dot" />
                    <span>Active: {activeCount}</span>
                  </div>
                  <div className="master-data-total-pill">
                    <span>TOTAL: {total}</span>
                  </div>
                </div>
              </div>

              {/* Card & Table */}
              <div className="master-data-card">
                <div className="master-data-card-header">
                  <div className="master-data-card-title-wrap">
                    <h2 className="master-data-card-title">All {getSingularLabel(activeTab)}s</h2>
                    <span className="master-data-count-tag">{total} RECORDS</span>
                  </div>
                  <span className="master-data-card-caption">Showing active and inactive master records</span>
                </div>

                <div className="master-data-table-wrap">
                  {loading ? (
                    <div className="master-data-empty">Loading master data...</div>
                  ) : items.length === 0 ? (
                    <div className="master-data-empty">
                      No {activeTab} found. {search || statusFilter !== "all" ? "Try clearing filters." : "Create one to get started."}
                    </div>
                  ) : (
                    <table className="master-data-table">
                      <thead>
                        <tr>
                          <th>CODE</th>
                          <th>NAME</th>
                          <th className="col-right">ASSIGNED EQUIPMENT</th>
                          <th>STATUS</th>
                          {isAdmin && <th className="col-right">ACTIONS</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span className="master-data-code">{getCodePrefix(activeTab, item.id)}</span>
                            </td>
                            <td>
                              <span className="master-data-name">{item.name}</span>
                            </td>
                            <td className="col-right">
                              <span className="master-data-equipment-count">
                                {item._count?.equipment ?? 0}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`master-data-status-badge ${
                                  item.isActive ? "is-active" : "is-inactive"
                                }`}
                              >
                                <span className="badge-dot" />
                                <span>{item.isActive ? "Active" : "Inactive"}</span>
                              </span>
                            </td>
                            {isAdmin && (
                              <td className="col-right">
                                <div className="master-data-actions">
                                  <button
                                    type="button"
                                    className="master-data-action-btn"
                                    title={`Edit ${getSingularLabel(activeTab)}`}
                                    aria-label={`Edit ${item.name}`}
                                    onClick={() => handleOpenEdit(item)}
                                  >
                                    <MaterialIcon>edit</MaterialIcon>
                                  </button>

                                  {item.isActive ? (
                                    <button
                                      type="button"
                                      className="master-data-action-btn btn-deactivate"
                                      title={`Deactivate ${getSingularLabel(activeTab)}`}
                                      aria-label={`Deactivate ${item.name}`}
                                      onClick={() => handleOpenDeactivate(item)}
                                    >
                                      <MaterialIcon>block</MaterialIcon>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="master-data-action-btn btn-reactivate"
                                      title={`Reactivate ${getSingularLabel(activeTab)}`}
                                      aria-label={`Reactivate ${item.name}`}
                                      onClick={() => handleReactivate(item)}
                                    >
                                      <MaterialIcon>check_circle</MaterialIcon>
                                    </button>
                                  )}
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* Pagination */}
              <div className="master-data-pagination">
                <div className="master-data-pagination-left">
                  <span>
                    Showing {firstRow} to {lastRow} of {total} entries
                  </span>
                  <div className="master-data-per-page">
                    <span>Rows per page:</span>
                    <select
                      className="master-data-select"
                      style={{ height: "30px", padding: "0 20px 0 8px" }}
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                    >
                      {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="master-data-page-controls">
                  <button
                    type="button"
                    className="master-data-page-btn"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <MaterialIcon>chevron_left</MaterialIcon>
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .map((p, i, arr) => {
                      const prevPage = arr[i - 1];
                      const showEllipsis = prevPage && p - prevPage > 1;
                      return (
                        <span key={p} style={{ display: "inline-flex", gap: "4px" }}>
                          {showEllipsis && <span style={{ padding: "0 4px", alignSelf: "center" }}>…</span>}
                          <button
                            type="button"
                            className={`master-data-page-btn ${page === p ? "is-active" : ""}`}
                            onClick={() => setPage(p)}
                          >
                            {p}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    type="button"
                    className="master-data-page-btn"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                  >
                    <MaterialIcon>chevron_right</MaterialIcon>
                  </button>
                </div>
              </div>

              {/* Footnote */}
              <div className="master-data-footnote">
                IMMS Plant Engine • Master Data Configuration
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal: Create Item */}
      {isCreateOpen && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsCreateOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add New {getSingularLabel(activeTab)}</h3>
            <p>Enter the name for the new {getSingularLabel(activeTab).toLowerCase()} record.</p>

            {formError && <div className="master-data-alert error">{formError}</div>}

            <form onSubmit={handleCreateSubmit}>
              <div className="master-data-form-group">
                <label htmlFor="master-data-create-name">Name *</label>
                <input
                  id="master-data-create-name"
                  type="text"
                  required
                  placeholder={`e.g. ${
                    activeTab === "departments"
                      ? "Electrical Maintenance"
                      : activeTab === "locations"
                      ? "Assembly Bay 4"
                      : "Robotics"
                  }`}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="master-data-modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={isSubmitting}
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="master-data-add-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : `Create ${getSingularLabel(activeTab)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Item */}
      {isEditOpen && selectedItem && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsEditOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit {getSingularLabel(activeTab)}</h3>
            <p>Update the name for {selectedItem.name}.</p>

            {formError && <div className="master-data-alert error">{formError}</div>}

            <form onSubmit={handleEditSubmit}>
              <div className="master-data-form-group">
                <label htmlFor="master-data-edit-name">Name *</label>
                <input
                  id="master-data-edit-name"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="master-data-modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={isSubmitting}
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="master-data-add-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Deactivate Confirmation */}
      {isDeactivateOpen && selectedItem && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsDeactivateOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Deactivation</h3>
            <p>
              Are you sure you want to deactivate the {getSingularLabel(activeTab).toLowerCase()} <strong>"{selectedItem.name}"</strong>?
            </p>

            {activeTab === "locations" && (
              <p style={{ fontSize: "13px", color: "#b45309", background: "#fef3c7", padding: "8px 12px", borderRadius: "4px" }}>
                <strong>Strict Business Rule:</strong> If this location currently has equipment assigned or is referenced as a relocation destination in history, deactivation will be rejected with 409 Conflict.
              </p>
            )}

            <div className="master-data-modal-actions">
              <button
                type="button"
                className="btn-secondary"
                disabled={isSubmitting}
                onClick={() => setIsDeactivateOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                disabled={isSubmitting}
                onClick={handleDeactivateSubmit}
              >
                {isSubmitting ? "Deactivating..." : "Deactivate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
