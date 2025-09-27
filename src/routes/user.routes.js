import { Router } from "express";

// Controladores
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controllers.js";

// Middlewares
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRouter = Router();
// userRouter.post("/users", createUser);

// Solo un admin puede traer todos los usuarios
userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Solo un admin puede tarer un usuario por ID
userRouter.get("/users/:id", authMiddleware, adminMiddleware, getUserById);

// Solo un admin puede borrar un usuario
userRouter.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// Solo un admin puede actualizar un usuario
userRouter.put("/users/:id", authMiddleware, adminMiddleware, updateUser);
