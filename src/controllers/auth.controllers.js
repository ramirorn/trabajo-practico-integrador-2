import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

// Registro de usuario
export const register = async (req, res) => {
  try {
    // Extraer los datos que pasaron la validacion
    const data = matchedData(req);

    // Hashear la contraseña
    const hashedPassword = await hashPassword(data.password);

    // Creacion del usuario con los datos validados
    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword, // Password hasheada
      role: data.role,
      profile: data.profile,
    });

    // Devuelve el usuario creado
    res
      .status(201)
      .json({ ok: true, msg: "Usuario creado correctamente", user });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
      err,
    });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar el usuario por su username
    const user = await UserModel.findOne({ username });
    if (!user)
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });

    // Comparar la contraseña recibida con la almacenada
    const isMatch = await comparePassword(password, user.password);

    // Si no coinciden las contraseñas
    if (!isMatch)
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });

    // Generar el token con JWT
    const token = generateToken(user);

    // Enviar el token en una cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    }); // 1 hora

    res.status(200).json({ ok: true, message: "Login exitoso", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Error interno del servidor", err });
  }
};

// Logout de usuario
export const logout = async (req, res) => {
  try {
    // Eliminar la cookie del token
    res.clearCookie("token");

    res.status(200).json({
      ok: true,
      message: "Logout exitoso",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
      err,
    });
  }
};
