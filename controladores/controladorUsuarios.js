import Usuario from "../modelos/usuarios.js";
import bcrypt from "bcryptjs";

/**
 * 👉 Registrar un usuario
 * - Recibe: nombre, correo, contraseña, rol
 * - Verifica si el correo ya está registrado
 * - Encripta la contraseña antes de guardar
 */
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
      rol,
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar usuario",
      error: error.message,
    });
  }
};

/**
 * 👉 Obtener todos los usuarios
 * - Retorna todos los usuarios excepto la contraseña
 */
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña");
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

/**
 * 👉 Obtener un usuario por ID
 * - Busca un usuario por su ID
 */
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuario",
      error: error.message,
    });
  }
};

/**
 * 👉 Actualizar usuario
 * - Actualiza nombre, correo y rol
 */
export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, correo, rol },
      { new: true }
    ).select("-contraseña");

    if (!usuarioActualizado)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

/**
 * 👉 Eliminar usuario
 * - Elimina un usuario por ID
 */
export const eliminarUsuario = async (req, res) => {
  try {
    const eliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json({ mensaje: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar usuario",
      error: error.message,
    });
  }
};
