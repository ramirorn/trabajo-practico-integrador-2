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

export const articleRouter = Router();
articleRouter.post("/articles", authMiddleware, createArticle);
articleRouter.get("/articles",authMiddleware, getAllArticles);
articleRouter.get("/articles/my",authMiddleware, getMyArticles)
articleRouter.get("/articles/:id",authMiddleware, getArticleById);
articleRouter.put("/articles/:id", authMiddleware, ownerOrAdminArticleMiddleware,updateArticle);
articleRouter.delete("/articles/:id", authMiddleware, ownerOrAdminArticleMiddleware, deleteArticle);
