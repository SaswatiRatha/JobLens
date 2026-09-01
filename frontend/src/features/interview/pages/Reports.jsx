import { useEffect, useRef } from "react";
import { Link } from "react-router";
import LoadingState from "../../../components/LoadingState";
import Navbar from "../../../components/Navbar";
import useAuth from "../../auth/hooks/useAuth";
import { useInterview } from "../hooks/useInterview";

const Reports = () => {
  const { user, handleLogout, loading: authLoading } = useAuth();
  const { loading, reports, getReports, deleteReportById } = useInterview();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    getReports();
  }, [getReports]);

  const hasReports = Array.isArray(reports) && reports.length > 0;

  return (
    <main className="report-page">
      <Navbar
        user={user}
        loading={authLoading}
        onLogout={handleLogout}
        showLogout
      />

      <section className="report-shell">
        <header className="report-header">
          <div>
            <p className="eyebrow">JobLens / My reports</p>
            <h1>Your saved interview reports</h1>
          </div>
        </header>

        {loading ? (
          <LoadingState
            title="Loading your reports"
            description="Fetching the latest saved interview insights for your account."
            variant="list"
          />
        ) : !hasReports ? (
          <div className="report-empty">
            <p>No reports yet.</p>
            <Link className="button primary-button" to="/">
              Create your first report
            </Link>
          </div>
        ) : (
          <div className="report-sections">
            {reports.map((report) => (
              <article className="report-section" key={report._id}>
                <div className="section-heading">
                  <span className="section-number">
                    {report.matchScore ?? "--"}%
                  </span>
                  <div>
                    <p className="eyebrow">Role match</p>
                    <h2>
                      {report.jobDescription?.slice(0, 70) ||
                        "Interview report"}
                    </h2>
                  </div>
                </div>

                <div className="plan-list">
                  <div className="plan-day">
                    <span className="day-label">Key focus</span>
                    <div>
                      <h3>
                        {report.skillGaps?.[0]?.skill || "Preparation overview"}
                      </h3>
                      <p>
                        {report.preparationPlan?.[0]?.focus ||
                          "Review your preparation plan and interview guidance."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="action-items">
                  <Link
                    className="button secondary-button"
                    to="/interview"
                    state={{ report }}
                  >
                    View report
                  </Link>
                  <button
                    className="button error-button"
                    onClick={() => deleteReportById(report._id)}
                  >
                    Delete Report
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Reports;
