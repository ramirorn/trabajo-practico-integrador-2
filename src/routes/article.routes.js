import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getMyArticles,
} from "../controllers/article.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminArticleMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import {
  createArticleValidations,
  deleteArticleValidations,
  getArticleByIdValidations,
  updateArticleValidations,
} from "../middlewares/validations/article.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const articleRouter = Router();
articleRouter.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  applyValidations,
  createArticle
);

articleRouter.get("/articles", authMiddleware, getAllArticles);
articleRouter.get("/articles/my", authMiddleware, getMyArticles);

articleRouter.get(
  "/articles/:id",
  authMiddleware,
  getArticleByIdValidations,
  applyValidations,
  getArticleById
);

articleRouter.put(
  "/articles/:id",
  authMiddleware,
  updateArticleValidations,
  applyValidations,
  ownerOrAdminArticleMiddleware,
  updateArticle
);

articleRouter.delete(
  "/articles/:id",
  authMiddleware,
  deleteArticleValidations,
  applyValidations,
  ownerOrAdminArticleMiddleware,
  deleteArticle
);
