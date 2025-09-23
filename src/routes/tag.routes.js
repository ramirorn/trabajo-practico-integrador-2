import { Router } from "express";
import {
  createTag,
  deleTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controllers.js";

export const tagRouter = Router();
tagRouter.post("/tags", createTag);
tagRouter.get("/tags", getAllTags);
tagRouter.get("/tags/:id", getTagById);
tagRouter.put("/tags/:id", updateTag);
tagRouter.delete("/tags/:id", deleTag);
