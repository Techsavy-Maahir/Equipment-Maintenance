import { useCallback, useEffect, useState } from "react";
import { api, handleApiError, isUnauthorizedError } from "./api";
import { EquipmentListPage } from "./pages/EquipmentListPage";
import { EquipmentDetailPage } from "./pages/EquipmentDetailPage";
import { EquipmentFormPage } from "./pages/EquipmentFormPage";
import { LoginPage } from "./pages/LoginPage";
import { MasterDataPage } from "./pages/MasterDataPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import "./App.css";

function getInitialPage() {
  const hash = window.location.hash.toLowerCase();
  if (hash === "#master-data") return "master-data";
  if (hash === "#user-management") return "user-management";
  if (hash === "#equipment-create") return "equipment-create";
  if (hash.startsWith("#equipment-edit-")) return hash.slice(1);
  if (hash.startsWith("#equipment-detail-")) return hash.slice(1);
  return "equipment";
}

function App() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("loading");
  const [authError, setAuthError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#master-data") {
        setCurrentPage("master-data");
      } else if (hash === "#user-management") {
        setCurrentPage("user-management");
      } else if (hash === "#equipment-create") {
        setCurrentPage("equipment-create");
      } else if (hash.startsWith("#equipment-edit-")) {
        setCurrentPage(hash.slice(1));
      } else if (hash.startsWith("#equipment-detail-")) {
        setCurrentPage(hash.slice(1));
      } else if (hash === "#equipment" || !hash) {
        setCurrentPage("equipment");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page === "equipment" ? "#equipment" : `#${page}`;
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
