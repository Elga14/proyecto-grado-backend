import express from "express";
import { registrarUsuario, loginUsuario, obtenerPerfil } from "../controladores/controladorUsuarios.js";
import { verificarToken } from "../intermediarios/verificarToken.js";
import { verificarRol } from "../intermediarios/verificarRol.js";

const router = express.Router();

// Registro y login
router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

// Perfil (protegido)
router.get("/perfil", verificarToken, obtenerPerfil);

// Ejemplo: ruta solo para admin
router.get("/solo-admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({ mensaje: "Acceso permitido: usuario con rol admin", usuario: req.usuario });
});

export default router;
