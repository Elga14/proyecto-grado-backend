/**
 * Controlador Usuarios
 * - registrarUsuario
 * - loginUsuario
 * - obtenerPerfil
 */

import Usuario from "../modelos/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Registrar usuario
 * - Si no envían rol, queda "usuario" por defecto.
 */
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Verificar existencia
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Crear usuario (rol opcional, por seguridad no permitir rol admin desde frontend)
    const nuevo = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaHash,
      // Si por alguna razón envían rol y eres estrictamente admin-only al crear, puedes ignorarlo.
      rol: rol === "admin" ? "usuario" : rol // evita asignar admin desde el body
    });

    await nuevo.save();

    return res.status(201).json({ mensaje: "Usuario registrado correctamente." });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al registrar usuario.", error: error.message });
  }
};

/**
 * Login usuario
 * Devuelve token con id y rol
 */
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    // Generar token incluyendo rol
    const payload = {
      id: usuario._id,
      rol: usuario.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRETO, { expiresIn: "7d" });

    return res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al iniciar sesión.", error: error.message });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-contraseña");
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }
    return res.json({ mensaje: "Perfil del usuario autenticado", datos: usuario });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener el perfil.", error: error.message });
  }
};
