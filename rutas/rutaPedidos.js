import express from "express";
import {
  crearPedido,
  obtenerCursosDelUsuario,
} from "../controladores/controladorPedidos.js";
import { verificarToken } from "../intermediarios/verificarToken.js";

const router = express.Router();

// Crear un pedido (compra)
router.post("/crear", verificarToken, crearPedido);

// Obtener cursos comprados por el usuario autenticado
router.get("/mis-cursos", verificarToken, obtenerCursosDelUsuario);

export default router;
