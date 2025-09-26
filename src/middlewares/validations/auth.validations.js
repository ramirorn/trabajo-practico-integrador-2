import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

// Validaciones para el registro de usuario
export const registerValidations = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumérico")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ username: username });
      if (usernameExists) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw new Error("El email ya está en uso");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "g")
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número"
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),
  body("deleted_at")
    .optional()
    .isISO8601()
    .withMessage("La fecha de eliminación debe ser una fecha válida"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no debe exceder los 500 caracteres"),
  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("La URL del avatar debe ser válida"),
  body("profile.birthdate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
];

// Validaciones para la actualización del perfil del usuario autenticado
export const updateAuthProfileValidations = [
  body("profile.firstName")
    .optional()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .optional()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),
  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no debe exceder los 500 caracteres"),
  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("La URL del avatar debe ser válida"),
  body("profile.birthdate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser una fecha válida"),
];
