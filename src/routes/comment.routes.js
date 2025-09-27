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

export const commentRouter = Router();
commentRouter.post("/comments",authMiddleware, createComment);
// Traer el articulo de un comment
commentRouter.get("/comments/article/:articleId", getArticleComments);
commentRouter.get("/comments/my",authMiddleware, getMyComments)
commentRouter.put("/comments/:id",authMiddleware,ownerOrAdminCommentMiddleware, updateComment);
commentRouter.delete("/comments/:id",authMiddleware, ownerOrAdminCommentMiddleware,deleteComment);