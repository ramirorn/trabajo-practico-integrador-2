import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { tagRouter } from "./tag.routes.js";
// import { authRoutes } from "./auth.routes.js";

export const routes = Router();
routes.use(userRouter);
routes.use(tagRouter);
// routes.use(authRoutes);
