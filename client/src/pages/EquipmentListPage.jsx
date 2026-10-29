import { useEffect, useState } from "react";
import { api, handleApiError } from "../api";
import "./EquipmentListPage.css";

const DEFAULT_PAGE_SIZE = 8;
const PAGE_SIZES = [8, 16, 32, 64];
const STATUSES = ["ACTIVE", "INACTIVE", "UNDER_MAINTENANCE"];

function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get("page"));
  const pageSize = Number(params.get("pageSize"));
  const status = params.get("status") || "";
  const location = params.get("location") || "";
  const category = params.get("category") || "";

  return {
    search: params.get("search") || "",
    status: STATUSES.includes(status) ? status : "",
    location: /^\d+$/.test(location) && Number(location) > 0 ? location : "",
    category: /^\d+$/.test(category) && Number(category) > 0 ? category : "",
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    pageSize:
      Number.isSafeInteger(pageSize) && pageSize > 0
        ? Math.min(pageSize, 100)
        : DEFAULT_PAGE_SIZE,
  };
}

function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function getVisiblePages(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
  if (page >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis-left", page - 1, page, page + 1, "ellipsis-right", totalPages];
}

function statusDetails(status) {
  switch (status) {
    case "ACTIVE":
      return { label: "Operational", className: "equipment-status--active" };
    case "INACTIVE":
      return { label: "Inactive", className: "equipment-status--inactive" };
    case "UNDER_MAINTENANCE":
      return {
        label: "Under Maintenance",
        className: "equipment-status--maintenance",
      };
    default:
      return { label: status || "Unknown", className: "equipment-status--inactive" };
  }
}

function AssetActions() {
  return (
    <div className="equipment-actions">
      <button type="button" aria-label="View Details" title="View Details" disabled>
        <MaterialIcon>visibility</MaterialIcon>
      </button>
      <button type="button" aria-label="Edit" title="Edit" disabled>
        <MaterialIcon>edit</MaterialIcon>
      </button>
      <button type="button" aria-label="More actions" title="More actions" disabled>
        <MaterialIcon>more_vert</MaterialIcon>
      </button>
    </div>
  );
}

export function EquipmentListPage({
  user,
  authError = "",
  onLogout,
  isLoggingOut = false,
  currentPage = "equipment",
  onNavigate = () => {},
}) {
  const [filters, setFilters] = useState(readFiltersFromUrl);
  const [searchInput, setSearchInput] = useState(() => readFiltersFromUrl().search);
  const [result, setResult] = useState({
    items: [],
    total: 0,
    locations: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      const nextFilters = readFiltersFromUrl();
      setFilters(nextFilters);
      setSearchInput(nextFilters.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFilters((current) => {
        const search = searchInput.trim();
        if (current.search === search) return current;
        return { ...current, search, page: 1 };
      });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.location) params.set("location", filters.location);
    if (filters.status) params.set("status", filters.status);
    params.set("page", String(filters.page));
    params.set("pageSize", String(filters.pageSize));

    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [filters]);

  useEffect(() => {
    let cancelled = false;

    async function fetchEquipment() {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getEquipment(filters);
        if (cancelled) return;

        setFilters((current) =>
          current.page === filters.page && response.page !== filters.page
            ? { ...current, page: response.page }
            : current,
        );
        setResult({
          items: response.items,
          total: response.total,
          locations: response.locations,
          categories: response.categories,
        });
      } catch (requestError) {
        if (!cancelled) setError(handleApiError(requestError));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEquipment();
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(result.total / filters.pageSize));
  const firstRow =
    result.total === 0 ? 0 : (filters.page - 1) * filters.pageSize + 1;
  const lastRow = Math.min(filters.page * filters.pageSize, result.total);
  const visiblePages = getVisiblePages(filters.page, totalPages);
  const locationsCount = result.locations.length;
  const userName = user?.name || "Maintenance User";
  const userRole = user?.role
    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
    : "Maintenance Team";

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value, page: 1 }));
  }

  function updateSearch(value) {
    setSearchInput(value);
  }

  function clearFilters() {
    setSearchInput("");
    setFilters((current) => ({
      ...current,
      search: "",
      status: "",
      location: "",
      category: "",
      page: 1,
    }));
  }

  return (
    <div className="equipment-app">
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
              aria-current={currentPage === "equipment" ? "page" : undefined}
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

      <div className="equipment-main">
        <header className="equipment-topbar">
          <div className="equipment-topbar-left">
            <div className="equipment-breadcrumb">
              <span>Facilities</span>
              <MaterialIcon>chevron_right</MaterialIcon>
              <strong>Equipment</strong>
            </div>
            <label className="equipment-header-search">
              <MaterialIcon>search</MaterialIcon>
              <span className="sr-only">Search equipment from header</span>
              <input
                type="search"
                aria-label="Search equipment from header"
                placeholder="Search equipment..."
                value={searchInput}
                onChange={(event) => updateSearch(event.target.value)}
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

        <main className="equipment-workspace" id="equipment">
          <div className="equipment-content">
            <div className="equipment-page-heading">
              <div>
                <h1>Equipment</h1>
                <p>
                  {result.total.toLocaleString()} assets across {locationsCount} locations
                  <span className="sr-only">{result.total.toLocaleString()} matching assets</span>
                </p>
              </div>
              <button className="equipment-add-button" type="button" disabled>
                <MaterialIcon>add</MaterialIcon>
                <span>Add Equipment</span>
              </button>
            </div>

            {authError && <p className="equipment-alert" role="alert">{authError}</p>}
            {error && <p className="equipment-alert" role="alert">Unable to load equipment: {error}</p>}

            <section className="equipment-filter-card" aria-label="Equipment filters">
              <div className="equipment-filter-controls">
                <label className="equipment-filter-search">
                  <MaterialIcon>search</MaterialIcon>
                  <span className="sr-only">Search equipment</span>
                  <input
                    type="search"
                    aria-label="Search equipment"
                    placeholder="Search by ID, name, or serial number"
                    value={searchInput}
                    onChange={(event) => updateSearch(event.target.value)}
                  />
                </label>

                <label className="equipment-select-wrap">
                  <span className="sr-only">Filter by category</span>
                  <select
                    aria-label="Filter by category"
                    value={filters.category}
                    onChange={(event) => updateFilter("category", event.target.value)}
                  >
                    <option value="">All Categories</option>
                    {result.categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </label>

                <label className="equipment-select-wrap">
                  <span className="sr-only">Filter by location</span>
                  <select
                    aria-label="Filter by location"
                    value={filters.location}
                    onChange={(event) => updateFilter("location", event.target.value)}
                  >
                    <option value="">All Locations</option>
                    {result.locations.map((location) => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </label>

                <label className="equipment-select-wrap">
                  <span className="sr-only">Filter by status</span>
                  <select
                    aria-label="Filter by status"
                    value={filters.status}
                    onChange={(event) => updateFilter("status", event.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="ACTIVE">Operational</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  </select>
                  <MaterialIcon>expand_more</MaterialIcon>
                </label>
              </div>
              <button className="equipment-clear-filters" type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </section>

            <section className="equipment-table-card" aria-label="Equipment list">
              <div className="equipment-table-scroll">
                {loading ? (
                  <div className="equipment-state" role="status">Loading equipment...</div>
                ) : result.items.length === 0 ? (
                  <div className="equipment-state equipment-empty">
                    <strong>No equipment found</strong>
                    <span>Try adjusting your search or filters.</span>
                  </div>
                ) : (
                  <table className="equipment-table">
                    <thead>
                      <tr>
                        <th scope="col">Equipment ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        <th className="equipment-actions-heading" scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.items.map((item) => {
                        const status = statusDetails(item.status);
                        return (
                          <tr key={item.id}>
                            <td>
                              <span className="equipment-code">{item.code}</span>
                            </td>
                            <td>
                              <div className="equipment-name-cell">
                                <strong>{item.name}</strong>
                                {(item.description || item.serialNumber) && (
                                  <small>
                                    {item.description || ""}
                                    {item.description && item.serialNumber ? " · " : ""}
                                    {item.serialNumber ? `SN: ${item.serialNumber}` : ""}
                                  </small>
                                )}
                              </div>
                            </td>
                            <td>{item.category?.name ?? "—"}</td>
                            <td>{item.location?.name ?? "—"}</td>
                            <td>
                              <span className={`equipment-status ${status.className}`}>
                                <span className="equipment-status-dot" />
                                {status.label}
                              </span>
                            </td>
                            <td className="equipment-actions-cell"><AssetActions /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              <footer className="equipment-pagination">
                <div className="equipment-pagination-count">
                  Showing <strong>{firstRow}–{lastRow}</strong> of{" "}
                  <strong>{result.total.toLocaleString()}</strong>
                </div>

                <label className="equipment-page-size">
                  <span>Rows per page:</span>
                  <span className="equipment-page-size-select">
                    <select
                      aria-label="Rows per page"
                      value={filters.pageSize}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          pageSize: Math.min(Number(event.target.value), 100),
                          page: 1,
                        }))
                      }
                    >
                      {PAGE_SIZES.includes(filters.pageSize) ? null : (
                        <option value={filters.pageSize}>{filters.pageSize}</option>
                      )}
                      {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <MaterialIcon>expand_more</MaterialIcon>
                  </span>
                </label>

                <nav className="equipment-pages" aria-label="Equipment pages">
                  <button
                    className="equipment-pagination-text"
                    type="button"
                    disabled={filters.page <= 1 || loading}
                    onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
                  >
                    Previous
                  </button>
                  {visiblePages.map((page, index) =>
                    typeof page === "string" ? (
                      <span className="equipment-ellipsis" key={`${page}-${index}`} aria-hidden="true">...</span>
                    ) : (
                      <button
                        className={`equipment-page-number${filters.page === page ? " is-current" : ""}`}
                        key={page}
                        type="button"
                        aria-current={filters.page === page ? "page" : undefined}
                        disabled={loading || filters.page === page}
                        onClick={() => setFilters((current) => ({ ...current, page }))}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    className="equipment-pagination-text equipment-next"
                    type="button"
                    disabled={filters.page >= totalPages || loading}
                    onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
                  >
                    Next
                  </button>
                </nav>
              </footer>
            </section>

            <div className="equipment-sample-note">Live equipment records from your facilities.</div>
          </div>
        </main>
      </div>
    </div>
  );
}
