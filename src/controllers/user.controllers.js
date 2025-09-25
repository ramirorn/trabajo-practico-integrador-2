import { UserModel } from "../models/user.model.js";

// Crear un nuevo usuario
// export const createUser = async (req, res) => {
//   const { username, email, password, profile, lastName, firstName } = req.body;
//   try {
//     const newUser = await UserModel.create({
//       username,
//       email,
//       password,
//       profile,
//       firstName,
//       lastName,
//     });
//     res.status(201).json({
//       ok: true,
//       message: "Usuario creado exitosamente",
//       data: newUser,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       ok: false,
//       message: "Error interno del servidor",
//     });
//   }
// };

// Traer todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

// Traer un usuario por ID

// Actualizar un usuario por ID

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      message: "Usuario eliminado exitosamente",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};
