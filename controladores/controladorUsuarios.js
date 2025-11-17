/**
 * Controlador de Usuarios
 * Contiene la lógica del registro y login.
 */

import Usuario from "../modelos/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExiste = await Usuario.findOne({ correo });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    // Crear usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    // Comparar contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRETO,
      { expiresIn: "7d" }
    );

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};
