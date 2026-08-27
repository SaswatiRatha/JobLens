import { Router } from "express";
import { userAuth } from "../middleware/auth.middleware.js";
import generateInterviewReportController from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = Router();

interviewRouter.post(
  "/",
  userAuth,
  upload.single("resume"),
  generateInterviewReportController,
);

export default interviewRouter;
