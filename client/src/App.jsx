import { useCallback, useEffect, useState } from "react";
import { api, handleApiError, isUnauthorizedError } from "./api";
import { EquipmentListPage } from "./pages/EquipmentListPage";
import { LoginPage } from "./pages/LoginPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("loading");
  const [authError, setAuthError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Equipment Maintenance</p>
          <p className="app-user">{user?.name} · {user?.role}</p>
        </div>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </header>
      {authError && <p className="app-error" role="alert">{authError}</p>}
      <EquipmentListPage />
    </main>
  );
}

export default App;