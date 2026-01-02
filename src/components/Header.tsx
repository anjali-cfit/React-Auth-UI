import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Storely</div>

      <nav className="nav">
        <a href="#features">Features</a>
        <a href="#solutions">Solutions</a>
        <a href="#pricing">Pricing</a>
        <a href="#learn">Learn</a>
      </nav>

      <div className="auth-actions">
        {/* <Link to="/login" className="signin">Sign in</Link> */}
        <Link to="/login" className="cta">Sign in</Link>
      </div>
    </header>
  );
}
