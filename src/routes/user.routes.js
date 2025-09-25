import { Router } from "express";
import {
  
  deleteUser,
  getAllUsers,
} from "../controllers/user.controllers.js";

export const userRouter = Router();
// userRouter.post("/users", createUser);
userRouter.get("/users", getAllUsers);
userRouter.delete("/users/:id", deleteUser);
