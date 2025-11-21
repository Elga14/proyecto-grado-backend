import express from "express";
import {
  crearPedido,
  obtenerCursosDelUsuario,
} from "../controladores/controladorPedidos.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Crear un pedido (compra)
router.post("/crear", verifyToken, crearPedido);

// Obtener cursos comprados por el usuario autenticado
router.get("/mis-cursos", verifyToken, obtenerCursosDelUsuario);

export default router;
