import { Router } from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";

export const commentRouter = Router();
commentRouter.post("/comments", createComment);
commentRouter.get("/comments", getAllComments);
commentRouter.get("/comments/:id", getCommentById);
commentRouter.put("/comments/:id", updateComment);
commentRouter.delete("/comments/:id", deleteComment);
