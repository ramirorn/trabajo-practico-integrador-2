import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

// Validaciones para traer un usuario por ID
export const getUserByIdValidations = [
  param("id").isMongoId().withMessage("El ID debe ser uno valido de mongo"),
];

// Validaciones para actualizar un usuario
export const updateUserValidations = [
  param("id").isMongoId().withMessage("El ID debe ser uno valido de mongo"),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El username debe ser incluido")
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumerico")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe contener entre 3 y 20 caracteres")
    .custom(async (username) => {
      // Comprueba la existencia de un username
      const userNameExists = await UserModel.findOne({ username: username });
      if (userNameExists)
        throw new Error("El username ya existe, ingrese otro");
    }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener un formato valido")
    .custom(async (email) => {
      // Comprueba la existencia de un email
      const emailExists = await UserModel.findOne({ email: email });
      if (emailExists)
        throw new Error("El email ya esta en uso, pruebe con otro");
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contrseña no debe estar vacia")
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

// Validaciones para borrar un usuario
export const deleteUserValidations = [
    param("id").isMongoId().withMessage("El ID debe ser uno valido de mongo"),
]