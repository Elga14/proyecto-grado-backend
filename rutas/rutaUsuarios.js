import express from "express";
import {
  registrarUsuario,
  iniciarSesion, // 👈 importamos la función de login
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} from "../controladores/controladorUsuarios.js";

const router = express.Router();

// Rutas de usuarios
router.post("/registrar", registrarUsuario);
router.post("/login", iniciarSesion); // 👈 esta ruta resuelve tu 500
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
