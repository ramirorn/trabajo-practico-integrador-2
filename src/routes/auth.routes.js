import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { creatUserValidations } from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const authRouter = Router();
authRouter.post("/auth/register", creatUserValidations, applyValidations, register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", logout);