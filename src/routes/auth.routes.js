import { Router } from "express";
import { register } from "../controllers/auth.controllers.js";
import { creatUserValidations } from "../middlewares/validations/user.validations.js";

export const authRouter = Router();
authRouter.post("/auth/register", creatUserValidations, register);
