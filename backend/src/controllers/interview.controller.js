import generateInterviewReport, {
  generateResumePdf,
} from "../services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
import { PDFParse } from "pdf-parse";

export const generateInterviewReportController = async (req, res) => {
  try {
    const resumeFile = req.file;
    let resumeContent = "";

    if (resumeFile) {
      const resumeResult = await new PDFParse(
        Uint8Array.from(resumeFile.buffer),
      ).getText();
      resumeContent = resumeResult.text;
    }
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

    return res.status(201).json({
      message: "Interview report generated successfully",
      data: interviewReport,
    });
  } catch (err) {
    console.error("Interview generation failed:", err);

    const message = err?.message?.includes("authentication")
      ? "AI service authentication failed. Check the Anthropic API key."
      : "Unable to generate the interview report.";

    return res.status(500).json({ message });
  }
};

export const getUserInterviewReportsController = async (req, res) => {
  try {
    const reports = await InterviewReportModel.find({ user: req.user.id }).sort(
      {
        _id: -1,
      },
    );

    return res.status(200).json({
      message: "Interview reports fetched successfully",
      data: reports,
    });
  } catch (err) {
    console.error("Fetch interview reports failed:", err);
    return res.status(500).json({
      message: "Unable to fetch interview reports.",
    });
  }
};

export const getInterviewReportByIdController = async (req, res) => {
  try {
    const report = await InterviewReportModel.findOne({
      _id: req.params.reportId,
      user: req.user.id,
    });

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      data: report,
    });
  } catch (err) {
    console.error("Fetch interview report failed:", err);
    return res.status(500).json({
      message: "Unable to fetch interview report.",
    });
  }
};

export const deleteInterviewReportByIdController = async (req, res) => {
  try {
    const report = await InterviewReportModel.findOneAndDelete({
      _id: req.params.reportId,
      user: req.user.id,
    });

    res.status(200).json({
      message: "Interview report deleted successfully",
      data: report,
    });
  } catch (err) {
    console.error("Delete interview report failed:", err);
    return res.status(500).json({
      message: "Unable to delete interview report.",
    });
  }
};

export const generateResumePdfController = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await InterviewReportModel.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found.",
      });
    }

    const { resume, jobDescription, selfDescription } = report;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${reportId}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Generate resume PDF failed:", err);
    return res.status(500).json({
      message: "Unable to generate resume PDF.",
    });
  }
};
