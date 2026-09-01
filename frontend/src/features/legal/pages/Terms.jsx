import LegalPage from "../components/LegalPage";

const termsSections = [
  {
    heading: "Acceptance of terms",
    content:
      "By using JobLens, you agree to these Terms of Service and any policies referenced within them. If you do not agree with these terms, you should not access or use the platform.",
  },
  {
    heading: "Service use",
    list: [
      "You must provide accurate information when creating your account and using the platform.",
      "Use JobLens only for lawful purposes and in a way that respects the rights of others.",
      "You are responsible for the information you submit, including resumes, job descriptions, and interview notes.",
    ],
  },
  {
    heading: "AI-generated guidance",
    content:
      "JobLens provides AI-assisted interview preparation and recommendations. These outputs are designed to support your preparation process, but they should be reviewed critically and used alongside your own judgment and professional discretion.",
  },
  {
    heading: "Account responsibility",
    list: [
      "You are responsible for keeping your account credentials secure.",
      "We may suspend or restrict access if we believe there is misuse, abuse, or a security risk.",
      "You may stop using the service at any time.",
    ],
  },
  {
    heading: "Limitation of liability",
    content:
      "JobLens is provided on an as-is basis. While we aim to deliver helpful, accurate, and reliable guidance, we do not guarantee specific outcomes, interview success, or the completeness of any generated content.",
  },
];

const Terms = () => (
  <LegalPage
    title="Terms of Service"
    intro="These Terms of Service govern your access to and use of JobLens. By using our service, you agree to the terms below."
    sections={termsSections}
    lastUpdated="September 1, 2026"
    breadcrumb="Terms"
  />
);

export default Terms;
