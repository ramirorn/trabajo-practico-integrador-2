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
import {
  createTagValidations,
  deleteTagValidations,
  getTagValidations,
  updateTagValidations,
} from "../middlewares/validations/tag.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const tagRouter = Router();

// Solo un admin puede crear una tag
tagRouter.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);

// Solo un usuario autenticado puede traer todas las tags
tagRouter.get("/tags", authMiddleware, getAllTags);

// Solo un usuario autenticado puede traer una tag por ID
tagRouter.get(
  "/tags/:id",
  authMiddleware,
  getTagValidations,
  applyValidations,
  getTagById
);

// Solo un admin puede actualizar una tag
tagRouter.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidations,
  applyValidations,
  updateTag
);

// Solo un admin puede borrar una tag
tagRouter.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  deleteTagValidations,
  applyValidations,
  deleTag
);
