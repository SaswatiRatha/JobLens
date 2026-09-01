import { Link } from "react-router";
import { useTheme } from "../features/theme/useTheme.js";
import logo from "../assets/logo.png";
import "./Navbar.scss";

const Navbar = ({ user, loading, onLogout, showLogout = false }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="JobLens home">
        <img src={logo} alt="JobLens logo" className="brand-mark" />
        <span>JobLens</span>
      </a>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        {showLogout && (
          <>
            <Link className="nav-link" to="/reports">
              My reports
            </Link>
            <span className="user-name">{user?.name}</span>
            <button
              className="logout-button"
              type="button"
              onClick={onLogout}
              disabled={loading}
            >
              <span aria-hidden="true">↗</span>
              {loading ? "Signing out" : "Logout"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
