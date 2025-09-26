import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { tagRouter } from "./tag.routes.js";
import { articleRouter } from "./article.routes.js";
import { commentRouter } from "./comment.routes.js";
import { authRouter } from "./auth.routes.js";
import { articleTagRouter } from "./article.tag.routes.js";

// Router principal
export const routes = Router();

// Rutas auth
routes.use(authRouter);

//Rutas user
routes.use(userRouter);

// Rutas tag
routes.use(tagRouter);

// Rutas article
routes.use(articleRouter);

// Rutas comment
routes.use(commentRouter);

// Rutas article-tag
routes.use(articleTagRouter);
