import express from "express";
import {
  crearCurso,
  obtenerCursos,
  obtenerCursoPorId,
  actualizarCurso,
  eliminarCurso,
  obtenerContenidoCurso,
} from "../controladores/controladorCursos.js";

import {
  verificarToken,
  verificarAdministrador,
} from "../intermediarios/verificarToken.js";

const router = express.Router();

// Rutas públicas
router.get("/", obtenerCursos);
router.get("/:id", obtenerCursoPorId);
router.get("/:id/contenido", obtenerContenidoCurso);

// Rutas protegidas
router.post("/crear", verificarToken, verificarAdministrador, crearCurso);
router.put("/:id", verificarToken, verificarAdministrador, actualizarCurso);
router.delete("/:id", verificarToken, verificarAdministrador, eliminarCurso);

export default router;
