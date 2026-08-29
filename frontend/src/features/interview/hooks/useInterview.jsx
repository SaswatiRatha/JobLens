import { useCallback, useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
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

  return {
    loading,
    report,
    reports,
    generateReport,
    generateReportById,
    getReports,
  };
};
