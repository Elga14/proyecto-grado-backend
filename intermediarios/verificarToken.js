// 📁 middleware/verificarToken.js

import jwt from "jsonwebtoken";
import Usuario from "../modelos/usuarios.js";

/**
 * 👉 Middleware: verificarToken
 * - Verifica que el usuario envíe un token válido
 * - Decodifica el token y obtiene el ID del usuario
 * - Busca el usuario en la base de datos y lo adjunta al request
 */
export const verificarToken = async (req, res, next) => {
  try {
    const encabezadoAuth = req.headers.authorization;

    if (!encabezadoAuth || !encabezadoAuth.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ mensaje: "No se proporcionó un token válido" });
    }

    const token = encabezadoAuth.split(" ")[1];

    const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRETO)

    // Buscar al usuario vinculado al token
    const usuario = await Usuario.findById(tokenDecodificado.id).select(
      "-contraseña"
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Guardamos el usuario autenticado en la request
    req.usuario = usuario;
    

    next();
  } catch (error) {
    console.error("Error en verificarToken:", error.message);
    res.status(403).json({
      mensaje: "Token inválido o expirado",
      error: error.message,
    });
  }
};

/**
 * 👉 Middleware: verificarAdministrador
 * - Verifica que el usuario que hace la petición tenga rol de administrador
 */
export const verificarAdministrador = (req, res, next) => {
  try {
    if (!req.usuario || req.usuario.rol !== "admin") {
      return res
        .status(403)
        .json({ mensaje: "Acceso denegado: solo administradores" });
    }

    next();
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al verificar el rol de administrador",
      error: error.message,
    });
  }
};
