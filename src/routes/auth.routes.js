import { Router } from "express";
import {
  login,
  logout,
  register,
  getAuthProfile,
  updateAuthProfile
} from "../controllers/auth.controllers.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  registerValidations,
  updateAuthProfileValidations,
} from "../middlewares/validations/auth.validations.js";

export const authRouter = Router();
authRouter.post(
  "/auth/register",
  registerValidations,
  applyValidations,
  register
);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", authMiddleware, logout);
authRouter.get("/auth/profile", authMiddleware, getAuthProfile);
authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateAuthProfileValidations,
  applyValidations,
  updateAuthProfile
);
