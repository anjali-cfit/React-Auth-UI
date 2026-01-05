import { Link } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";

export default function Header() {
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  return (
    <header className="header">
      <Link to="/" className="logo">Storely</Link>

      <div className="auth-actions">
        {isLoggedIn && (
          <Link to="/dashboard/products" className="dashboard-link">
            <FaTachometerAlt className="dashboard-icon" />
            <span>Dashboard</span>
          </Link>
        )}
        {isLoggedIn ? (
          <Link to="/login" className="cta secondary" onClick={() => localStorage.removeItem("user")}>Sign out</Link>
        ) : (
          <Link to="/login" className="cta">Sign in</Link>
        )}
      </div>
    </header>
  );
}
