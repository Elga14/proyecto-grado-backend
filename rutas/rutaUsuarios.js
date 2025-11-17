/*
 * Rutas de Usuarios
 * Gestiona las rutas de registro y login.
 */

import express from "express";
import { registrarUsuario, loginUsuario } from "../controladores/controladorUsuarios.js";

const router = express.Router();

// Registrar usuario
router.post("/registro", registrarUsuario);

// Login usuario
router.post("/login", loginUsuario);

export default router;
