import LegalPage from "../components/LegalPage";

const privacySections = [
  {
    heading: "Information we collect",
    content:
      "We collect the information you provide when creating an account, uploading a resume, sharing job details, and using the app to generate interview insights. This may include your name, email address, resume content, and the job description you submit for analysis.",
  },
  {
    heading: "How we use your information",
    content:
      "JobLens uses your data to generate interview preparation reports, improve the quality of recommendations, maintain account access, and support product reliability. We do not sell personal information to third parties.",
  },
  {
    heading: "How we protect your data",
    list: [
      "We use secure transmission and access controls to protect user information.",
      "Your resume and profile details are handled only as needed to provide interview guidance and saved reports.",
      "We keep the minimum information required to deliver the service and maintain your account securely.",
    ],
  },
  {
    heading: "Third-party services",
    content:
      "We may use third-party services for hosting, authentication, or AI-powered analysis. These providers are selected with care and are required to handle information responsibly in line with this policy.",
  },
  {
    heading: "Your choices",
    list: [
      "You can update your account details from your profile or account settings.",
      "You may request access to your data, correction of inaccuracies, or deletion of your account where applicable.",
      "You can contact us at hello@joblens.ai with privacy questions or requests.",
    ],
  },
];

const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    intro="This Privacy Policy explains how JobLens collects, uses, and protects the information you share while using our interview preparation platform."
    sections={privacySections}
    lastUpdated="September 1, 2026"
    breadcrumb="Privacy"
  />
);

export default PrivacyPolicy;
