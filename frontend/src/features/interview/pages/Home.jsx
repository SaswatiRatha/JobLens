import { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router";
import LoadingState from "../../../components/LoadingState";
import "../style.scss";
import { useInterview } from "../hooks/useInterview";

const Home = () => {
  // const { loading, generateReport } = useInterview();
  // const { user, handleLogout  } = useAuth()
  // const [jobDescription, setJobDescription] = useState("");
  // const [selfDescription, setSelfDescription] = useState("");
  // const resumeInputRef = useRef();
  // const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   const resumeFile = resumeInputRef.current.files[0];
  //   const data = await generateReport({
  //     jobDescription,
  //     selfDescription,
  //     resumeFile,
  //   });
  //   navigate(`/interview/${data._id}`);
  // };

  const { loading, generateReport } = useInterview();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleResumeChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setSubmitted(false);
    setError("");

    if (selectedFile && selectedFile.type !== "application/pdf") {
      setResumeFile(null);
      setError("Please upload your resume as a PDF file.");
      event.target.value = "";
      return;
    }

    setResumeFile(selectedFile ?? null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);

    if (!jobDescription.trim() || (!selfDescription.trim() && !resumeFile)) {
      setError(
        "Add the job description and either your self description or resume to continue.",
      );
      return;
    }

    try {
      setError("");
      const response = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setSubmitted(true);
      navigate("/interview", { state: { report: response?.data ?? response } });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to generate the report.",
      );
    }
  };

  return (
    <main className="interview-page">
      <Navbar
        user={user}
        loading={loading}
        onLogout={handleLogout}
        showLogout
      />

      <section className="interview-shell">
        {loading ? (
          <LoadingState
            title="Generating your report"
            description="Our AI is analyzing your resume and role details to build a tailored interview prep brief."
            variant="report"
          />
        ) : (
          <>
            <header className="interview-header">
              <p className="eyebrow">JobLens / Interview preparation</p>
              <h1>Build your interview report</h1>
              <p className="intro">
                Share the role, your experience, and a resume to create a
                focused preparation plan.
              </p>
            </header>

            <form className="interview-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field field-wide" htmlFor="job-description">
                  <span>Job description</span>
                  <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(event) => {
                      setJobDescription(event.target.value);
                    }}
                    placeholder="Paste the role, responsibilities, and requirements"
                    rows="9"
                  />
                </label>

                <label className="field field-wide" htmlFor="self-description">
                  <span>About you</span>
                  <textarea
                    id="self-description"
                    value={selfDescription}
                    onChange={(event) => {
                      setSelfDescription(event.target.value);
                    }}
                    placeholder="Describe your experience, strengths, and goals"
                    rows="9"
                  />
                </label>

                <label className="upload-field" htmlFor="resume">
                  <span className="upload-label">Resume</span>
                  <span className="upload-box">
                    <strong>
                      {resumeFile ? resumeFile.name : "Choose a PDF resume"}
                    </strong>
                    <small>
                      {resumeFile
                        ? `${(resumeFile.size / 1024).toFixed(0)} KB`
                        : "PDF only"}
                    </small>
                  </span>
                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleResumeChange}
                  />
                </label>
              </div>

              {error && <p className="form-message error-message">{error}</p>}
              {submitted && (
                <p className="form-message success-message">
                  Your interview details are ready to analyze.
                </p>
              )}

              <button
                className="button primary-button submit-button"
                type="submit"
              >
                Generate report
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
