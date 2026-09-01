import { Link } from "react-router";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import "../legal.scss";

const LegalPage = ({ title, intro, sections, lastUpdated, breadcrumb }) => {
  return (
    <main className="legal-page">
      <Navbar />

      <div className="legal-shell">
        <Link className="legal-breadcrumb" to="/">
          ← Back to home
        </Link>

        <header className="legal-page-header">
          <p className="eyebrow">{breadcrumb}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>

        {sections.map((section) => (
          <section key={section.heading} className="legal-section">
            <h2>{section.heading}</h2>
            {section.content && <p>{section.content}</p>}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.orderedList && (
              <ol>
                {section.orderedList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
          </section>
        ))}

        <p className="legal-meta">Last updated: {lastUpdated}</p>
      </div>

      <Footer />
    </main>
  );
};

export default LegalPage;
