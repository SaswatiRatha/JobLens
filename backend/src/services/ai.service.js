import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import puppeteer from "puppeteer";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "The match score between the candidate's profile and the job description, ranging from 0 to 100",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The most probable technical question which can be asked during the interview",
          ),
        intention: z
          .string()
          .describe("The intention behind the technical question"),
        answer: z
          .string()
          .describe(
            "Guidance on how the candidate should structure and approach their answer, based on their actual resume/experience — not a scripted answer. 2-3 concise sentences, max ~50 words.",
          ),
      }),
    )
    .describe(
      "A list of technical questions, their intentions, and guidance on how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The most probable behavioral question which can be asked during the interview",
          ),
        intention: z
          .string()
          .describe("The intention behind the behavioral question"),
        answer: z
          .string()
          .describe(
            "Guidance on how the candidate should structure and approach their answer, based on their actual resume/experience — not a scripted answer. 2-3 concise sentences, max ~50 words.",
          ),
      }),
    )
    .describe(
      "A list of behavioral questions, their intentions, and guidance on how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skill gap"),
      }),
    )
    .describe("A list of skill gaps and their severity"),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe("The focus of the preparation plan for that day"),
        tasks: z
          .string()
          .describe(
            "The tasks to be completed for that day's preparation plan",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to improve their skills and prepare for the interview",
    ),
});

const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const prompt = `
    You are an expert technical interviewer and career advisor.

    Generate an interview preparation report based on the following information.

    RESUME:
    ${resume}

    SELF DESCRIPTION:
    ${selfDescription}

    JOB DESCRIPTION:
    ${jobDescription}

    Analyze the candidate against the job description.

    Generate:

    - A realistic match score from 0 to 100
    - Likely technical interview questions
    - Likely behavioral interview questions
    - The intention behind every question
    - A strong candidate-specific answer for every question
    - Important skill gaps
    - A 7-day preparation plan

    Do not invent skills, experience, projects, or qualifications that are not present in the resume.

    Return only JSON matching the provided schema.
    `;
  try {
    const response = await client.messages.parse({
      model: "claude-sonnet-5",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      output_config: { format: zodOutputFormat(interviewReportSchema) },
    });
    if (response.stop_reason === "max_tokens") {
      throw new Error("Response truncated — increase max_tokens");
    }
    return response.parsed_output;
  } catch (err) {
    console.error("Error generating interview report:", err);
    throw err;
  }
};

const generatePdfFromHtml = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "40mm", bottom: "20mm", left: "20mm", right: "20mm" },
  });
  await browser.close();
  return pdfBuffer;
};

export const generateResumePdf = async ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to a PDF using any library like Puppeteer",
      ),
  });

  const prompt = `
You are an expert resume writer, ATS specialist, and professional resume designer.

Create a professional, human-like, one-page resume tailored to the target job.

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Rules:
- Use ONLY facts from the candidate's resume and self-description.
- NEVER invent skills, experience, projects, achievements, metrics, education, or certifications.
- Tailor the resume by highlighting the candidate's existing skills and experience relevant to the job.
- Naturally include relevant job-description keywords only when supported by the candidate's background.
- Write a concise and specific professional summary.
- Use strong action verbs for experience and project descriptions.
- Keep the resume concise and ideally within one A4 page.
- Make it ATS-friendly with clear standard sections and simple HTML structure.
- The candidate's NAME must be prominently displayed at the TOP and CENTER ALIGNED.
- Contact information should appear directly below the name and be CENTER ALIGNED.
- Use a clean, modern, professional resume layout.
- Use exactly TWO colors throughout the resume:
  1. One primary color for headings, name, borders, and accents.
  2. One neutral color (black/dark gray) for all body text and details.
- Do not use any other colors.
- Keep headings visually distinct using the primary color and appropriate font weight.
- Use consistent spacing, typography, and alignment.
- Generate clean HTML with embedded CSS suitable for PDF conversion.
- Do not use external CSS, JavaScript, fonts, images, icons, tables, or graphics.
- Avoid excessive decoration, large empty spaces, and unnecessary design elements.
- Return ONLY valid JSON matching the provided schema.
- Do not return Markdown, explanations, or code fences.
- Fit the resume content within margins suitable for an A4 page, ensuring it is visually appealing and professional.
`;

  try {
    const response = await client.messages.parse({
      model: "claude-sonnet-5",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      output_config: { format: zodOutputFormat(resumePdfSchema) },
    });

    const pdfBuffer = await generatePdfFromHtml(response.parsed_output.html);
    return pdfBuffer;
  } catch (err) {
    console.error("Error generating resume html:", err);
    throw err;
  }
};

export default generateInterviewReport;
