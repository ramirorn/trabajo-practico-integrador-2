import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { tagRouter } from "./tag.routes.js";
import { articleRouter } from "./article.routes.js";
import { commentRouter } from "./comment.routes.js";
import { authRouter } from "./auth.routes.js";
// import { authRoutes } from "./auth.routes.js";

export const routes = Router();
routes.use(authRouter);
routes.use(userRouter);
routes.use(tagRouter);
routes.use(articleRouter);
routes.use(commentRouter);
// routes.use(authRoutes);
