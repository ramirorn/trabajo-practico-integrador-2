import { param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";

// Validaciones para agregar un tag a un article
export const addTagToArticleValidations = [
  param("articleId")
    .isMongoId()
    .withMessage("El ID del article debe ser un ID de Mongo válido")
    .custom(async (articleId) => {
      const article = await ArticleModel.findById(articleId);
      if (!article) {
        throw new Error("El article no existe");
      }
    }),
  param("tagId")
    .isMongoId()
    .withMessage("El ID del tag debe ser un ID de Mongo válido")
    .custom(async (tagId) => {
      const tag = await TagModel.findById(tagId);
      if (!tag) {
        throw new Error("El tag no existe");
      }
    }),
];

// Validaciones para quitar un tag de un article
export const removeTagFromArticleValidations = [
  param("articleId")
    .isMongoId()
    .withMessage("El ID del article debe ser un ID de Mongo válido")
    .custom(async (articleId) => {
      const article = await ArticleModel.findById(articleId);
      if (!article) {
        throw new Error("El article no existe");
      }
    }),
  param("tagId")
    .isMongoId()
    .withMessage("El ID del tag debe ser un ID de Mongo válido")
    .custom(async (tagId) => {
      const tag = await TagModel.findById(tagId);
      if (!tag) {
        throw new Error("El tag no existe");
      }
    }),
];
