import { Router } from "express";
import {
  createTag,
  deleTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRouter = Router();

// Solo un admin puede crear una tag
tagRouter.post("/tags", authMiddleware, adminMiddleware, createTag);
// Solo un usuario autenticado puede traer todas las tags
tagRouter.get("/tags", authMiddleware, getAllTags);
// Solo un usuario autenticado puede traer una tag por ID
tagRouter.get("/tags/:id", authMiddleware, getTagById);
// Solo un admin puede actualizar una tag
tagRouter.put("/tags/:id", authMiddleware, adminMiddleware, updateTag);
// Solo un admin puede borrar una tag
tagRouter.delete("/tags/:id", authMiddleware, adminMiddleware, deleTag);
