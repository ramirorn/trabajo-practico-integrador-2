import { TagModel } from "../../models/tag.model.js";
import { body, param } from "express-validator";

// Validaciones para crear una tag
export const createTagValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El name no debe estar vacio")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "El name debe contener 2 caracteres como minimo y 30 como maximo"
    )
    .matches(/^\S+$/)
    .withMessage("El nombre no debe contener espacios")
    .custom(async (name) => {
      const nameExists = await TagModel.findOne({ name: name });
      if (nameExists) throw new Error("El nombre de la tag ya existe");
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La description no debe estar vacia")
    .isLength({ max: 200 })
    .withMessage("La description no debe superar los 200 caracteres"),
];

// Validaciones para traer una tag
export const getTagValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El id debe tener formato valido de mongo"),
];

// Validaciones para actualizar una tag
export const updateTagValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El id debe tener formato valido de mongo"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El name no debe estar vacio")
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "El name debe contener 2 caracteres como minimo y 30 como maximo"
    )
    .matches(/^\S+$/)
    .withMessage("El nombre no debe contener espacios")
    .custom(async (name) => {
      const nameExists = await TagModel.findOne({ name: name });
      if (nameExists) throw new Error("El nombre de la tag ya existe");
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La description no debe estar vacia")
    .isLength({ max: 200 })
    .withMessage("La description no debe superar los 200 caracteres"),
];

// Validaciones para borrar una tag
export const deleteTagValidations = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El ID debe ser incluido")
    .isMongoId()
    .withMessage("El id debe tener formato valido de mongo"),
];
