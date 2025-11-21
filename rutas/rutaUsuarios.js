import express from "express";
import {
  registrarUsuario,
  iniciarSesion, 
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} from "../controladores/controladorUsuarios.js";

const router = express.Router();

// Rutas de usuarios
router.post("/registrar", registrarUsuario);
router.post("/login", iniciarSesion); 
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
