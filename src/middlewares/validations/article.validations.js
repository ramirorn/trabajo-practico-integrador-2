import { body, param } from "express-validator";

// Validaciones para crear un article
export const createArticleValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo debe ser incluido")
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe contener entre 3 y 20 caracteres"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido no debe estar vacio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe contener como minimo 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El excerpt no debe estar vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt debe contener como maximo 500 caracteres"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El status no debe estar vacio")
    .isIn(["published", "archived"]),
  body("author")
    .trim()
    .notEmpty()
    .withMessage("El autor no debe estar vacio")
    .isMongoId()
    .withMessage("Debe ingresar un ID valido"),
  body("tags")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Las tags no deben estar vacias si son incluidas")
    .isMongoId()
    .withMessage("El ID de las tags debe tener el formato de una ID de mongo"),
];

// Validaciones para traer un article por ID
export const getArticleByIdValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El ID debe tener un formato valido"),
];

// Validaciones para actualizar un article
export const updateArticleValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El ID debe tener un formato valido"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El titulo debe ser incluido")
    .isLength({ min: 3, max: 200 })
    .withMessage("El titulo debe contener entre 3 y 20 caracteres"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido no debe estar vacio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe contener como minimo 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El excerpt no debe estar vacio")
    .isLength({ max: 500 })
    .withMessage("El excerpt debe contener como maximo 500 caracteres"),
  body("status")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El status no debe estar vacio")
    .isIn(["published", "archived"]),
  body("author")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El autor no debe estar vacio")
    .isMongoId()
    .withMessage("Debe ingresar un ID valido"),
  body("tags")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Las tags no deben estar vacias si son incluidas")
    .isMongoId()
    .withMessage("El ID de las tags debe tener el formato de una ID de mongo"),
];

// Validaciones para borrar un article
export const deleteArticleValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El ID debe tener un formato valido"),
];
