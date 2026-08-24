import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  userProfileController,
} from "../controllers/auth.controller.js";
import { userAuth } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.get("/profile", userAuth, userProfileController);

export default authRouter;
