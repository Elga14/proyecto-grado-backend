import express from "express";
import { crearCurso, obtenerCursos, editarCurso } from "../controladores/controladorCursos.js";
import { verificarToken } from "../intermediarios/verificarToken.js";

const router = express.Router();

// Rutas públicas
router.get("/", obtenerCursos);

// Rutas protegidas (solo admin)
router.post("/", verificarToken, crearCurso);
router.put("/:id", verificarToken, editarCurso);

export default router;
