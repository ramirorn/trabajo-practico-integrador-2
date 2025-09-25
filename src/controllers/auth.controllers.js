import { UserModel } from "../models/user.model.js";
import {matchedData} from "express-validator";
// Register de usuario
export const register = async (req, res) => {
    try {
        const data = matchedData(req);

        const user = await UserModel.create(data)

        res.status(201).json({ok: true, msg: 'Usuario creado correctamente', user})

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
        ok: false,
        message: "Error interno del servidor",err
    });
    }
}

// Login de usuario
export const login = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}
