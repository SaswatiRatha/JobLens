import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await api.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data ?? response.data;
};

export const getInterviewReportById = async (reportId) => {
  const response = await api.get(`/api/interview/${reportId}`);
  return response.data?.data ?? response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview");
  return response.data?.data ?? response.data;
};

export const deleteInterviewReportById = async (reportId) => {
  const response = await api.delete(`/api/interview/${reportId}`);
  return response.data?.data ?? response.data;
};

export const generateResumePdf = async (reportId) => {
  const response = await api.post(`/api/interview/resume/pdf/${reportId}`, {
    responseType: "blob",
  });
  return response.data;
};
