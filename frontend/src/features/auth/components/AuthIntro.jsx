const AuthIntro = () => {
  return (
    <section className="auth-intro" aria-labelledby="auth-intro-title">
      <p className="auth-eyebrow">Your next interview, prepared</p>
      <h2 id="auth-intro-title">Turn a job description into a clearer plan.</h2>
      <p className="auth-description">
        JobLens helps you understand where you fit, what to improve, and how to
        prepare with confidence.
      </p>
      <ul className="auth-features">
        <li>Compare your resume with the role</li>
        <li>Find important skill gaps</li>
        <li>Practice tailored interview questions</li>
      </ul>
    </section>
  );
};

export default AuthIntro;
