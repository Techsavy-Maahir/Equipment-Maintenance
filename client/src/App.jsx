import { useCallback, useEffect, useState } from "react";
import { api, handleApiError, isUnauthorizedError } from "./api";
import { EquipmentListPage } from "./pages/EquipmentListPage";
import { EquipmentDetailPage } from "./pages/EquipmentDetailPage";
import { EquipmentFormPage } from "./pages/EquipmentFormPage";
import { LoginPage } from "./pages/LoginPage";
import { MasterDataPage } from "./pages/MasterDataPage";
import { RequestsPage } from "./pages/RequestsPage";
import { WorkOrdersPage } from "./pages/WorkOrdersPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ApprovalsPage } from "./pages/ApprovalsPage";
import { PreventiveMaintenancePage } from "./pages/PreventiveMaintenancePage";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { KaizenPage } from "./pages/KaizenPage";
import { RelocationPage } from "./pages/RelocationPage";
import "./App.css";

function resolvePageFromHash(hash = window.location.hash.toLowerCase()) {
  if (hash === "#dashboard") return "dashboard";
  if (hash === "#requests") return "requests";
  if (hash === "#approvals") return "approvals";
  if (hash === "#work-orders") return "work-orders";
  if (hash === "#preventive-maintenance") return "preventive-maintenance";
  if (hash === "#audit-logs") return "audit-logs";
  if (hash === "#kaizen") return "kaizen";
  if (hash === "#relocation") return "relocation";
  if (hash === "#master-data") return "master-data";
  if (hash === "#user-management") return "user-management";
  if (hash === "#equipment") return "equipment";
  if (hash === "#equipment-create") return "equipment-create";
  if (hash.startsWith("#equipment-edit-")) return hash.slice(1);
  if (hash.startsWith("#equipment-detail-")) return hash.slice(1);
  return "dashboard";
}

function getInitialPage() {
  return resolvePageFromHash();
}

function App() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("loading");
  const [authError, setAuthError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(resolvePageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    const nextHash = page === "equipment" ? "#equipment" : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  };

  const loadCurrentUser = useCallback(async () => {
    setAuthStatus("loading");
    setAuthError("");

    try {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
      setAuthStatus("authenticated");
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setUser(null);
        setAuthStatus("unauthenticated");
        return;
      }

      setAuthError(handleApiError(error));
      setAuthStatus("error");
    }
  }, []);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const currentUser = await api.getCurrentUser();
        if (active) {
          setUser(currentUser);
          setAuthStatus("authenticated");
        }
      } catch (error) {
        if (!active) return;

        if (isUnauthorizedError(error)) {
          setUser(null);
          setAuthStatus("unauthenticated");
        } else {
          setAuthError(handleApiError(error));
          setAuthStatus("error");
        }
      }
    };

    restoreSession();
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (email, password) => {
    const authenticatedUser = await api.login(email, password);
    setUser(authenticatedUser);
    setAuthError("");
    setAuthStatus("authenticated");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setAuthError("");

    try {
      await api.logout();
      setUser(null);
      setAuthStatus("unauthenticated");
    } catch (error) {
      setAuthError(handleApiError(error));
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (authStatus === "loading") {
    return <main className="app-shell app-message">Checking your session...</main>;
  }

  if (authStatus === "error") {
    return (
      <main className="app-shell app-message" role="alert">
        <p>Unable to check your sign-in status: {authError}</p>
        <button className="button button-primary" type="button" onClick={loadCurrentUser}>
          Try again
        </button>
      </main>
    );
  }

  if (authStatus === "unauthenticated") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentPage === "dashboard") {
    return (
      <main className="app-shell app-shell-equipment">
        <DashboardPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "approvals") {
    return (
      <main className="app-shell app-shell-equipment">
        <ApprovalsPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "work-orders") {
    return (
      <main className="app-shell app-shell-equipment">
        <WorkOrdersPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "preventive-maintenance") {
    return (
      <main className="app-shell app-shell-equipment">
        <PreventiveMaintenancePage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "audit-logs") {
    return (
      <main className="app-shell app-shell-equipment">
        <AuditLogsPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "kaizen") {
    return (
      <main className="app-shell app-shell-equipment">
        <KaizenPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "relocation") {
    return (
      <main className="app-shell app-shell-equipment">
        <RelocationPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "requests") {
    return (
      <main className="app-shell app-shell-equipment">
        <RequestsPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "master-data") {
    return (
      <main className="app-shell app-shell-equipment">
        <MasterDataPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "user-management") {
    return (
      <main className="app-shell app-shell-equipment">
        <UserManagementPage
          user={user}
          authError={authError}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  if (currentPage === "equipment-create") {
    return (
      <main className="app-shell app-shell-equipment">
        <EquipmentFormPage
          user={user}
          onNavigate={handleNavigate}
          onSuccess={() => handleNavigate("equipment")}
        />
      </main>
    );
  }

  if (currentPage.startsWith("equipment-edit-")) {
    const editId = currentPage.replace("equipment-edit-", "");
    return (
      <main className="app-shell app-shell-equipment">
        <EquipmentFormPage
          user={user}
          equipmentId={editId}
          onNavigate={handleNavigate}
          onSuccess={() => handleNavigate("equipment")}
        />
      </main>
    );
  }

  if (currentPage.startsWith("equipment-detail-")) {
    const equipmentId = currentPage.slice("equipment-detail-".length);
    return (
      <main className="app-shell app-shell-equipment">
        <EquipmentDetailPage
          user={user}
          equipmentId={equipmentId}
          onNavigate={handleNavigate}
        />
      </main>
    );
  }

  return (
    <main className="app-shell app-shell-equipment">
      <EquipmentListPage
        user={user}
        authError={authError}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </main>
  );
}

export default App;
