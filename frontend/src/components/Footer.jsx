import { Link } from "react-router";
import { useTheme } from "../features/theme/useTheme.js";
import logo from "../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="footer-logo" to="/" aria-label="JobLens home">
            <img src={logo} alt="JobLens logo" className="footer-logo-mark" />
            <span>JobLens</span>
          </Link>
          <p>
            Interview preparation built around your experience, goals, and the
            roles you want to win.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Navigate</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/reports">Reports</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href="mailto:hello@joblens.ai">hello@joblens.ai</a>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} JobLens</span>
        <span className="footer-status">
          {theme === "dark"
            ? "Built for confident prep"
            : "Clearer interview prep"}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
