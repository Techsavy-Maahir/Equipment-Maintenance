
import { useState } from "react";
import { handleApiError } from "../api";
import "./LoginPage.css";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError("Enter your email address and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onLogin(normalizedEmail, password);
    } catch (loginError) {
      if (loginError?.response?.status === 401) {
        setError(
          "Incorrect email or password. Check your credentials and try again."
        );
      } else {
        setError(handleApiError(loginError));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="imms-login">
      <section className="imms-brand-panel" aria-label="IMMS introduction">
        <div className="imms-brand-content">
          <a className="imms-brand" href="#login" aria-label="IMMS home">
            <span className="imms-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4L12 2.8Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4.4 7.6 7.6 4.5 7.6-4.5M12 12.1v8.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span>IMMS</span>
          </a>

          <div className="imms-brand-message">
            <span className="imms-badge">
              <span className="imms-badge-dot" />
              Built for Industrial Operations
            </span>

            <h1>Industrial Maintenance Management System</h1>

            <p className="imms-brand-tagline">
              Smarter Maintenance.
              <br />
              Safer Operations.
            </p>
          </div>

          <div className="imms-brand-footer">
            <span className="imms-shield" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3 20 6v5.5c0 4.8-3.3 7.8-8 9.5-4.7-1.7-8-4.7-8-9.5V6l8-3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m8.5 12 2.3 2.3 4.8-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <strong>Reliable systems.</strong>
              <br />
              Resilient operations.
            </span>
            <span className="imms-version">Version 2.4.0</span>
          </div>
        </div>
      </section>

      <section className="imms-form-panel" id="login">
        <div className="imms-form-wrap">
          <div className="imms-mobile-brand">
            <span className="imms-brand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4L12 2.8Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="m4.4 7.6 7.6 4.5 7.6-4.5M12 12.1v8.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </span>
            <span>IMMS</span>
          </div>

          <div className="imms-form-heading">
            <span className="imms-form-eyebrow">Maintenance portal</span>
            <h2>Welcome Back</h2>
            <p>Sign in to access your maintenance dashboard.</p>
          </div>

          <form className="imms-form" onSubmit={handleSubmit}>
            <div className="imms-field">
              <label htmlFor="login-email">Email address</label>
              <div className="imms-input-wrap">
                <svg
                  className="imms-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="username"
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="imms-field">
              <label htmlFor="login-password">Password</label>
              <div className="imms-input-wrap">
                <svg
                  className="imms-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button
                  className="imms-password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.9 10.9 0 0 1 12 5c5.2 0 8.5 4.8 9 7-.2.9-1.1 2.4-2.6 3.7M6.2 6.3C3.9 7.8 2.4 10.4 2 12c.5 2.2 3.8 7 10 7 1.1 0 2.1-.2 3-.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M2 12s3.3-7 10-7 10 7 10 7-3.3 7-10 7S2 12 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="imms-form-options">
              <label className="imms-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#access-help">Forgot password?</a>
            </div>

            {error && (
              <p className="imms-login-error" role="alert">
                <span aria-hidden="true">!</span>
                {error}
              </p>
            )}

            <button
              className="imms-submit"
              type="submit"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
              {!isSubmitting && (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>

          <p className="imms-access-help" id="access-help">
            Need access? Contact your system administrator.
          </p>

          <footer className="imms-copyright">
            © 2026 IMMS. All rights reserved.
          </footer>
        </div>
      </section>
    </main>
  );
}
