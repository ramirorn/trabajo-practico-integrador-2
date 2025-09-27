import { Router } from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getMyComments,
} from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminCommentMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";

export const commentRouter = Router();
commentRouter.post("/comments",authMiddleware, createComment);
commentRouter.get("/comments", getAllComments);
commentRouter.get("/comments/my",authMiddleware, getMyComments)
commentRouter.get("/comments/:id", getCommentById);
commentRouter.put("/comments/:id",authMiddleware,ownerOrAdminCommentMiddleware, updateComment);
commentRouter.delete("/comments/:id",authMiddleware, ownerOrAdminCommentMiddleware,deleteComment);