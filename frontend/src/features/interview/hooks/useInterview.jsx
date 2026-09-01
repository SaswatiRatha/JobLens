import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  deleteInterviewReportById,
  generateInterviewReport,
  generateResumePdf,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = useCallback(
    async ({ jobDescription, selfDescription, resumeFile }) => {
      setLoading(true);
      try {
        const response = await generateInterviewReport({
          jobDescription,
          selfDescription,
          resumeFile,
        });
        const reportData = response?.data ?? response;
        setReport(reportData);
        return reportData;
      } catch (err) {
        console.error(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const generateReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      try {
        const response = await getInterviewReportById(interviewId);
        const reportData = response?.data ?? response;
        setReport(reportData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const deleteReportById = useCallback(
    async (reportId) => {
      setLoading(true);
      try {
        await deleteInterviewReportById(reportId);

        setReports((currentReports) =>
          currentReports.filter((report) => report._id !== reportId),
        );
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReports],
  );

  const getReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      const reportList = response?.data ?? response ?? [];
      setReports(reportList);
    } catch (err) {
      console.error(err.message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  const getResumePdf = useCallback(
    async (reportId) => {
      setLoading(true);
      try {
        const response = await generateResumePdf(reportId);
        return response;
      } catch (err) {
        console.error(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  return {
    loading,
    report,
    reports,
    generateReport,
    generateReportById,
    deleteReportById,
    getReports,
    getResumePdf,
  };
};
