import { Router } from "express";
import {
  createComment,
  getArticleComments,
  updateComment,
  deleteComment,
  getMyComments,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminCommentMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import {
  createCommentValidations,
  deleteCommentValidations,
  getArticleCommentsValidations,
  updateCommentValidations,
} from "../middlewares/validations/comment.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const commentRouter = Router();

commentRouter.post(
  "/comments",
  authMiddleware,
  createCommentValidations,
  applyValidations,
  createComment
);

// Traer el articulo de un comment
commentRouter.get(
  "/comments/article/:articleId",
  getArticleCommentsValidations,
  applyValidations,
  getArticleComments
);

commentRouter.get("/comments/my", authMiddleware, getMyComments);

commentRouter.put(
  "/comments/:id",
  updateCommentValidations,
  applyValidations,
  authMiddleware,
  ownerOrAdminCommentMiddleware,
  updateComment
);

commentRouter.delete(
  "/comments/:id",
  deleteCommentValidations,
  applyValidations,
  authMiddleware,
  ownerOrAdminCommentMiddleware,
  deleteComment
);
