import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware.js";
import generateInterviewReportController, {
  getInterviewReportByIdController,
  getUserInterviewReportsController,
} from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = Router();

interviewRouter.get("/", userAuth, getUserInterviewReportsController);
interviewRouter.get("/:reportId", userAuth, getInterviewReportByIdController);

interviewRouter.post(
  "/",
  userAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

export default interviewRouter;
