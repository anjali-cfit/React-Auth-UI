import { Link } from "react-router-dom";

export default function Header() {
    const isLoggedIn = Boolean(localStorage.getItem("user"));
    console.log('isLoggedIn: ', isLoggedIn);
  return (

    <header className="header">
      <div className="logo">Storely</div>

      <div className="auth-actions">
        {isLoggedIn ? (
          <Link to="/login" className="cta secondary" onClick={() => localStorage.removeItem("user")}>Sign out</Link>
        ) : (
          <Link to="/login" className="cta">Sign in</Link>
        )}
      </div>
    </header>
  );
}
