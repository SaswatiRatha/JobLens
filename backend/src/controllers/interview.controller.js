import generateInterviewReport from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
import { PDFParse } from "pdf-parse";

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;
  const resumeResult = await new PDFParse(
    Uint8Array.from(resumeFile.buffer),
  ).getText();
  const resumeContent = resumeResult.text;
  const { selfDescription, jobDescription } = req.body;

  const interviewReportAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await InterviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    data: interviewReport,
  });
};

export default generateInterviewReportController;
