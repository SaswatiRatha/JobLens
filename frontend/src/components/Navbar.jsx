import "./Navbar.scss";

const Navbar = ({ user, loading, onLogout, showLogout = false }) => {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="JobLens home">
        <span className="brand-mark">J</span>
        <span>JobLens</span>
      </a>

      {showLogout && (
        <div className="nav-actions">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
