import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controllers.js";

export const userRouter = Router();
userRouter.post("/users", createUser);
userRouter.get("/users", getAllUsers);
