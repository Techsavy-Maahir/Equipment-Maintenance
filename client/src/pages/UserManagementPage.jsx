import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import { MaterialIcon } from "../components/MaterialIcon";
import "./EquipmentListPage.css";
import "./UserManagementPage.css";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";
}

function getAvatarTheme(index) {
  const themes = [
    "avatar-theme-blue",
    "avatar-theme-slate",
    "avatar-theme-indigo",
    "avatar-theme-amber",
  ];
  return themes[index % themes.length];
}

function getRoleBadgeClass(role) {
  switch (role) {
    case "ADMIN":
      return "role-admin";
    case "MANAGER":
      return "role-manager";
    case "TECHNICIAN":
      return "role-technician";
    case "VIEWER":
      return "role-viewer";
    default:
      return "role-viewer";
  }
}

export function UserManagementPage({
  user,
  authError = "",
  onLogout,
  isLoggingOut = false,
  currentPage = "user-management",
  onNavigate = () => {},
}) {
  const isAdmin = user?.role === "ADMIN";

  // Search & Filters
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [reloadVersion, setReloadVersion] = useState(0);

  // Users data state
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Create form state
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "TECHNICIAN",
  });
  const [newRole, setNewRole] = useState("TECHNICIAN");
  const [modalError, setModalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load users from backend
  useEffect(() => {
    if (!isAdmin) return;
    let cancelled = false;

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await api.getUsers({
          search,
          role: roleFilter,
          status: statusFilter,
          page,
          pageSize,
        });

        if (!cancelled) {
          setUsers(response.items);
          setTotal(response.total);
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

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, search, roleFilter, statusFilter, page, pageSize, reloadVersion]);

  const handleResetFilters = () => {
    setSearchInput("");
    setSearch("");
    setRoleFilter("ALL");
    setStatusFilter("all");
    setPage(1);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setCreateForm({
      name: "",
      email: "",
      password: "",
      role: "TECHNICIAN",
    });
    setModalError("");
    setIsCreateOpen(true);
  };

  // Submit Create User
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.password) {
      setModalError("All fields are required");
      return;
    }
    if (createForm.password.length < 8) {
      setModalError("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    setModalError("");

    try {
      const created = await api.createUser({
        name: createForm.name.trim(),
        email: createForm.email.trim(),
        password: createForm.password,
        role: createForm.role,
      });

      setIsCreateOpen(false);
      setSuccessMessage(`User "${created.name}" created successfully!`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setModalError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Role Change Modal
  const handleOpenRoleModal = (u) => {
    setSelectedUser(u);
    setNewRole(u.role);
    setModalError("");
    setIsRoleModalOpen(true);
  };

  // Submit Role Change
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsSubmitting(true);
    setModalError("");

    try {
      await api.updateUserRole(selectedUser.id, newRole);
      setIsRoleModalOpen(false);
      setSuccessMessage(`Role for "${selectedUser.name}" changed to ${newRole}`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setModalError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Deactivate Modal
  const handleOpenDeactivateModal = (u) => {
    setSelectedUser(u);
    setModalError("");
    setIsDeactivateModalOpen(true);
  };

  // Submit Deactivation
  const handleDeactivateSubmit = async () => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    setModalError("");

    try {
      await api.deactivateUser(selectedUser.id);
      setIsDeactivateModalOpen(false);
      setSuccessMessage(`User "${selectedUser.name}" deactivated`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setModalError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reactivate User
  const handleReactivate = async (u) => {
    try {
      await api.reactivateUser(u.id);
      setSuccessMessage(`User "${u.name}" reactivated`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setReloadVersion((v) => v + 1);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const firstRow = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRow = Math.min(page * pageSize, total);

  const userName = user?.name || "Maintenance User";
  const userRole = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
    : "Maintenance Team";

  // Access check: Non-admins cannot view User Management
  if (!isAdmin) {
    return (
      <div className="equipment-app">
        <aside className="equipment-sidebar">
          <div className="equipment-sidebar-top">
            <a className="equipment-brand" href="#equipment" onClick={() => onNavigate("equipment")}>
              <span className="equipment-brand-mark">
                <MaterialIcon>precision_manufacturing</MaterialIcon>
              </span>
              <span className="equipment-brand-copy">
                <strong>IMMS</strong>
                <small>Plant Engine</small>
              </span>
            </a>
            <nav className="equipment-nav">
              <button
                type="button"
                className="equipment-nav-item"
                onClick={() => onNavigate("equipment")}
              >
                <MaterialIcon>precision_manufacturing</MaterialIcon><span>Equipment</span>
              </button>
              <button
                type="button"
                className="equipment-nav-item"
                onClick={() => onNavigate("master-data")}
              >
                <MaterialIcon>dataset</MaterialIcon><span>Master Data</span>
              </button>
            </nav>
          </div>
        </aside>

        <div className="equipment-main">
          <main className="equipment-workspace">
            <div className="user-mgmt-container">
              <div className="user-mgmt-alert error" role="alert" style={{ marginTop: "32px" }}>
                <strong>Access Denied:</strong> Only system administrators can access User Management.
              </div>
              <button
                type="button"
                className="master-data-add-btn"
                style={{ width: "fit-content" }}
                onClick={() => onNavigate("equipment")}
              >
                Return to Equipment
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
            <button
              type="button"
              className={`equipment-nav-item ${currentPage === "user-management" ? "is-active" : ""}`}
              onClick={() => onNavigate("user-management")}
            >
              <MaterialIcon>group</MaterialIcon><span>User Management</span>
            </button>
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
              <strong>User Management</strong>
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

        {/* Workspace */}
        <main className="equipment-workspace">
          <div className="user-mgmt-page">
            <div className="user-mgmt-container">
              {/* Header */}
              <div className="user-mgmt-header">
                <div className="user-mgmt-header-text">
                  <h1>User Management</h1>
                  <p>Manage system users, roles, and access permissions</p>
                </div>
                <button
                  type="button"
                  className="user-mgmt-add-btn"
                  onClick={handleOpenCreate}
                >
                  <MaterialIcon>add</MaterialIcon>
                  <span>Add User</span>
                </button>
              </div>

              {/* Success / Error Alerts */}
              {authError && <div className="user-mgmt-alert error" role="alert">{authError}</div>}
              {error && <div className="user-mgmt-alert error" role="alert">{error}</div>}
              {successMessage && <div className="user-mgmt-alert success" role="status">{successMessage}</div>}

              {/* Tabs */}
              <div className="user-mgmt-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected="true"
                  className="user-mgmt-tab-btn is-active"
                >
                  <span>Users</span>
                </button>
              </div>

              {/* Filter Bar Card */}
              <div className="user-mgmt-filter-card">
                <div className="user-mgmt-filter-left">
                  <div className="user-mgmt-search-wrap">
                    <MaterialIcon className="user-mgmt-search-icon">search</MaterialIcon>
                    <input
                      type="search"
                      className="user-mgmt-search-input"
                      placeholder="Search by name or email"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      aria-label="Search users"
                    />
                  </div>

                  <div className="user-mgmt-filter-control">
                    <span className="user-mgmt-filter-label">Role</span>
                    <select
                      className="user-mgmt-select"
                      value={roleFilter}
                      onChange={(e) => {
                        setRoleFilter(e.target.value);
                        setPage(1);
                      }}
                      aria-label="Filter by role"
                    >
                      <option value="ALL">All</option>
                      <option value="ADMIN">Admin</option>
                      <option value="MANAGER">Manager</option>
                      <option value="TECHNICIAN">Technician</option>
                      <option value="VIEWER">Viewer</option>
                    </select>
                  </div>

                  <div className="user-mgmt-filter-control">
                    <span className="user-mgmt-filter-label">Status</span>
                    <select
                      className="user-mgmt-select"
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                      }}
                      aria-label="Filter by status"
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {(searchInput || roleFilter !== "ALL" || statusFilter !== "all") && (
                  <button
                    type="button"
                    className="user-mgmt-reset-btn"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Users Table Card */}
              <div className="user-mgmt-table-card">
                <div className="user-mgmt-table-wrap">
                  {loading ? (
                    <div className="user-mgmt-empty">Loading users directory...</div>
                  ) : users.length === 0 ? (
                    <div className="user-mgmt-empty">No users found matching your criteria.</div>
                  ) : (
                    <table className="user-mgmt-table">
                      <thead>
                        <tr>
                          <th>USER</th>
                          <th>EMAIL</th>
                          <th>ROLE</th>
                          <th>STATUS</th>
                          <th>CREATED</th>
                          <th className="col-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, index) => (
                          <tr key={u.id}>
                            <td>
                              <div className="user-mgmt-user-cell">
                                <div className={`user-mgmt-avatar ${getAvatarTheme(index)}`}>
                                  {getInitials(u.name)}
                                </div>
                                <span className="user-mgmt-name">{u.name}</span>
                              </div>
                            </td>
                            <td>
                              <span className="user-mgmt-email">{u.email}</span>
                            </td>
                            <td>
                              <span className={`user-mgmt-role-badge ${getRoleBadgeClass(u.role)}`}>
                                {u.role}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`user-mgmt-status-badge ${
                                  u.isActive ? "is-active" : "is-inactive"
                                }`}
                              >
                                <span className="badge-dot" />
                                <span>{u.isActive ? "Active" : "Inactive"}</span>
                              </span>
                            </td>
                            <td>
                              <span className="user-mgmt-date">
                                {u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "—"}
                              </span>
                            </td>
                            <td className="col-right">
                              <div className="user-mgmt-actions">
                                <button
                                  type="button"
                                  className="user-mgmt-action-btn"
                                  title="Change User Role"
                                  aria-label={`Change role for ${u.name}`}
                                  onClick={() => handleOpenRoleModal(u)}
                                >
                                  <MaterialIcon>edit</MaterialIcon>
                                </button>

                                {u.isActive ? (
                                  <button
                                    type="button"
                                    className="user-mgmt-action-btn btn-deactivate"
                                    title="Deactivate User"
                                    aria-label={`Deactivate ${u.name}`}
                                    onClick={() => handleOpenDeactivateModal(u)}
                                  >
                                    <MaterialIcon>person_off</MaterialIcon>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="user-mgmt-action-btn btn-reactivate"
                                    title="Reactivate User"
                                    aria-label={`Reactivate ${u.name}`}
                                    onClick={() => handleReactivate(u)}
                                  >
                                    <MaterialIcon>check_circle</MaterialIcon>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Table Footer / Pagination */}
                <div className="user-mgmt-pagination">
                  <span className="user-mgmt-pagination-info">
                    Showing {firstRow}–{lastRow} of {total} users
                  </span>

                  <div className="user-mgmt-pagination-controls">
                    <button
                      type="button"
                      className="user-mgmt-page-btn"
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
                            {showEllipsis && <span style={{ padding: "0 4px", alignSelf: "center", color: "#565e74" }}>…</span>}
                            <button
                              type="button"
                              className={`user-mgmt-page-btn ${page === p ? "is-active" : ""}`}
                              onClick={() => setPage(p)}
                            >
                              {p}
                            </button>
                          </span>
                        );
                      })}

                    <button
                      type="button"
                      className="user-mgmt-page-btn"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      aria-label="Next page"
                    >
                      <MaterialIcon>chevron_right</MaterialIcon>
                    </button>
                  </div>
                </div>
              </div>

              {/* Disclaimer Footnote */}
              <div className="user-mgmt-footnote">
                IMMS Plant Engine • Security & User Access Control
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal: Create User */}
      {isCreateOpen && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsCreateOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add New User</h3>
            <p>Enter user details and assign initial role and credentials.</p>

            {modalError && <div className="user-mgmt-alert error">{modalError}</div>}

            <form onSubmit={handleCreateSubmit}>
              <div className="master-data-form-group">
                <label htmlFor="user-create-name">Full Name *</label>
                <input
                  id="user-create-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="master-data-form-group">
                <label htmlFor="user-create-email">Email Address *</label>
                <input
                  id="user-create-email"
                  type="email"
                  required
                  placeholder="e.g. alex.morgan@plant.imms"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                />
              </div>

              <div className="master-data-form-group">
                <label htmlFor="user-create-role">Role *</label>
                <select
                  id="user-create-role"
                  className="master-data-select"
                  style={{ width: "100%", height: "38px" }}
                  value={createForm.role}
                  onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="TECHNICIAN">TECHNICIAN</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>

              <div className="master-data-form-group">
                <label htmlFor="user-create-password">Password (min. 8 characters) *</label>
                <input
                  id="user-create-password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
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
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Role */}
      {isRoleModalOpen && selectedUser && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsRoleModalOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Change User Role</h3>
            <p>
              Updating role for <strong>{selectedUser.name}</strong> ({selectedUser.email}).
            </p>

            {modalError && <div className="user-mgmt-alert error">{modalError}</div>}

            <form onSubmit={handleRoleSubmit}>
              <div className="master-data-form-group">
                <label htmlFor="user-role-select">Select Role *</label>
                <select
                  id="user-role-select"
                  className="master-data-select"
                  style={{ width: "100%", height: "38px" }}
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="TECHNICIAN">TECHNICIAN</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>

              <div className="master-data-modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={isSubmitting}
                  onClick={() => setIsRoleModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="master-data-add-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Deactivate Confirmation */}
      {isDeactivateModalOpen && selectedUser && (
        <div className="master-data-modal-backdrop" onClick={() => !isSubmitting && setIsDeactivateModalOpen(false)}>
          <div className="master-data-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm User Deactivation</h3>
            <p>
              Are you sure you want to deactivate user <strong>"{selectedUser.name}"</strong>?
            </p>
            <p style={{ fontSize: "13px", color: "#b91c1c", background: "#fef2f2", padding: "8px 12px", borderRadius: "4px" }}>
              <strong>Notice:</strong> This user will immediately lose access to the system and their active sessions will be terminated.
            </p>

            {modalError && <div className="user-mgmt-alert error">{modalError}</div>}

            <div className="master-data-modal-actions">
              <button
                type="button"
                className="btn-secondary"
                disabled={isSubmitting}
                onClick={() => setIsDeactivateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                disabled={isSubmitting}
                onClick={handleDeactivateSubmit}
              >
                {isSubmitting ? "Deactivating..." : "Deactivate User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
