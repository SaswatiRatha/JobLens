import { Link, useLocation } from "react-router";
import Navbar from "../../../components/Navbar";
import useAuth from "../../auth/hooks/useAuth";
import "../report.scss";

const Interview = () => {
  const { state } = useLocation();
  const { user, handleLogout, loading } = useAuth();
  const report = state?.report;

  const handleSidebarClick = (event, sectionId) => {
    event.preventDefault();

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${sectionId}`);
  };

  const navItems = [
    { id: "technical-questions", label: "Technical questions" },
    { id: "behavioural-questions", label: "Behavioural questions" },
    { id: "preparation-plan", label: "Preparation plan" },
  ];

  if (!report) {
    return (
      <main className="report-page">
        <Navbar
          user={user}
          loading={loading}
          onLogout={handleLogout}
          showLogout
        />
        <section className="report-empty">
          <p className="eyebrow">Interview report</p>
          <h1>No report to show yet.</h1>
          <p>Generate a report from your resume and target job description.</p>
          <Link className="button primary-button" to="/">
            Create a report
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="report-page">
      <Navbar
        user={user}
        loading={loading}
        onLogout={handleLogout}
        showLogout
      />

      <section className="report-shell">
        <header className="report-header">
          <div>
            <p className="eyebrow">JobLens / Interview report</p>
            <h1>Your preparation brief</h1>
            <p>Built around your resume, experience, and target role.</p>
          </div>
          <div
            className="score-panel"
            aria-label={`Match score ${report.matchScore}%`}
          >
            <span>Role match</span>
            <strong>{report.matchScore}%</strong>
            <small>profile alignment</small>
          </div>
        </header>

        <div className="report-layout">
          <aside className="report-sidebar">
            <p className="eyebrow">Sections</p>
            <nav className="report-nav" aria-label="Report sections">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => handleSidebarClick(event, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="report-content">
            <section className="report-section" id="technical-questions">
              <div className="section-heading">
                <span className="section-number">01</span>
                <div>
                  <p className="eyebrow">Technical round</p>
                  <h2>Technical questions</h2>
                </div>
              </div>
              <QuestionList questions={report.technicalQuestions} />
            </section>

            <section className="report-section" id="behavioural-questions">
              <div className="section-heading">
                <span className="section-number">02</span>
                <div>
                  <p className="eyebrow">People and process</p>
                  <h2>Behavioural questions</h2>
                </div>
              </div>
              <QuestionList questions={report.behavioralQuestions} />
            </section>

            <section className="report-section">
              <div className="section-heading">
                <span className="section-number">03</span>
                <div>
                  <p className="eyebrow">Where to focus</p>
                  <h2>Skill gaps</h2>
                </div>
              </div>
              <div className="skill-grid">
                {report.skillGaps?.map((gap) => (
                  <article className="skill-item" key={gap.skill}>
                    <span>{gap.skill}</span>
                    <span className={`severity severity-${gap.severity}`}>
                      {gap.severity}
                    </span>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="report-section plan-section"
              id="preparation-plan"
            >
              <div className="section-heading">
                <span className="section-number">04</span>
                <div>
                  <p className="eyebrow">Seven-day sprint</p>
                  <h2>Preparation plan</h2>
                </div>
              </div>
              <div className="plan-list">
                {report.preparationPlan?.map((day) => (
                  <article className="plan-day" key={day.day}>
                    <span className="day-label">Day {day.day}</span>
                    <div>
                      <h3>{day.focus}</h3>
                      <p>{day.tasks}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

const QuestionList = ({ questions = [] }) => (
  <div className="question-list">
    {questions.map((item, index) => (
      <article className="question-item" key={`${item.question}-${index}`}>
        <h3>{item.question}</h3>
        <p className="question-intention">
          <strong>Intent:</strong> {item.intention}
        </p>
        <p>
          <strong>How to answer:</strong> {item.answer}
        </p>
      </article>
    ))}
  </div>
);

export default Interview;
