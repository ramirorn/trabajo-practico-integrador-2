import { Router } from "express";
// Controllers
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/article.tag.controllers.js";

// Middlewares
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminArticleMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";

// Validaciones
import { addTagToArticleValidations, removeTagFromArticleValidations } from "../middlewares/validations/article.tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";

// Router
export const articleTagRouter = Router();

// Agregar una tag a un article
articleTagRouter.post("/articles/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  addTagToArticleValidations,
  applyValidations,
  addTagToArticle
)

// Quitar una tag de un article
articleTagRouter.delete("/articles/:articleId/tags/:tagId",
  authMiddleware,
  ownerOrAdminArticleMiddleware,
  removeTagFromArticleValidations,
  applyValidations,
  removeTagFromArticle
)