import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware.js";
import {
  generateInterviewReportController,
  deleteInterviewReportByIdController,
  getInterviewReportByIdController,
  getUserInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = Router();

interviewRouter.get("/", userAuth, getUserInterviewReportsController);
interviewRouter.get(
  "/resume/pdf/:reportId",
  userAuth,
  generateResumePdfController,
);
interviewRouter.get("/:reportId", userAuth, getInterviewReportByIdController);

interviewRouter.post(
  "/",
  userAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

interviewRouter.delete(
  "/:reportId",
  userAuth,
  deleteInterviewReportByIdController,
);

interviewRouter.post(
  "/resume/pdf/:reportId",
  userAuth,
  generateResumePdfController,
);

export default interviewRouter;
