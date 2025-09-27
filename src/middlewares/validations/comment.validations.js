import { ArticleModel } from "../../models/article.model.js";
import { body, param } from "express-validator";

// Validaciones para crear un comentario
export const createCommentValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido debe ser incluido")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe contener entre 5 y 500 caracteres"),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("El autor debe ser incluido")
    .isMongoId()
    .withMessage("El ID del autor debe tener el formato valido para mongo"),
  body("article")
    .trim()
    .notEmpty()
    .withMessage("El article debe ser incluido")
    .isMongoId()
    .withMessage("El ID del article debe tener el formato valido para mongo")
    .custom(async (article) => {
      // Verifica la existencia del article
      const articleExist = await ArticleModel.findOne({ _id: article });
      if (!articleExist) throw new Error("El article no existe");
    }),
];

// Validaciones para obtener el articulo de un comentario
export const getArticleCommentsValidations = [
  param("articleId")
    .trim()
    .notEmpty()
    .withMessage("El id debe ser incluido")
    .isMongoId()
    .withMessage("El articleId debe tener el formato valido para mongo"),
];

// Validaciones para actualizar un comentario
export const updateCommentValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El id debe ser incluido")
    .isMongoId()
    .withMessage("El id debe tener el formato valido para mongo"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido debe ser incluido")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe contener entre 5 y 500 caracteres"),
  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El autor debe ser incluido")
    .isMongoId()
    .withMessage("El ID del autor debe tener el formato valido para mongo"),
  body("article")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El article debe ser incluido")
    .isMongoId()
    .withMessage("El ID del article debe tener el formato valido para mongo")
    .custom(async (article) => {
      // Verifica la existencia del article
      const articleExist = await ArticleModel.findOne({ _id: article });
      if (!articleExist) throw new Error("El article no existe");
    }),
];

// Validaciones para borrar un comentario
export const deleteCommentValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El id debe ser incluido")
    .isMongoId()
    .withMessage("El id debe tener el formato valido para mongo"),
];
