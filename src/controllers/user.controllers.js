import { UserModel } from "../models/user.model.js";
import {matchedData} from "express-validator"
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
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id).populate("Articles").populate("Comments");
    if (user) {
      res.status(200).json({
        ok: true,
        message: "Usuario encontrado",
        User: user,
      });
    } else {
      return res.status(404).json({
        ok: false,
        message: "No se encontro el usuario en la base de datos"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
      err
    });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const{id} = req.params;
  const data = req.body;
  try {
    const updated = await UserModel.findByIdAndUpdate(id,{$set: data},{ new: true });
    res.status(200).json({
      ok: true,
      messsage: "Usuario actualizado correctamente",
      updated: updated,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",err
    });
  }
};

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
