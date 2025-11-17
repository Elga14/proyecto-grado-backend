import express from "express";
import { crearUsuario, obtenerUsuarios } from "../controladores/controladorUsuarios.js";

const router = express.Router();

// Rutas
router.post("/", crearUsuario);     // Crear usuario
router.get("/", obtenerUsuarios);   // Obtener lista de usuarios

export default router;
