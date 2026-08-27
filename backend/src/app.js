import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import interviewRouter from "./routes/interview.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const port = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
