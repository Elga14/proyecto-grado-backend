import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Conexión con la Base de Datos MongoDB

import conectarBD from "./configuracion/conexionBD.js";


// Importación de rutas

import rutaUsuarios from "./rutas/rutaUsuarios.js";
import rutaCursos from "./rutas/rutaCursos.js"; 
import rutaPedidos from "./rutas/rutaPedidos.js"; 


// Configuración inicial

dotenv.config();
conectarBD();
const app = express();

app.use(cors());
app.use(express.json());


// Ruta raíz para comprobar funcionamiento

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});


// Registro de rutas principales del API

app.use("/api/usuarios", rutaUsuarios);
app.use("/api/cursos", rutaCursos);
app.use("/api/pedidos", rutaPedidos); 

// Servidor en funcionamiento

const PUERTO = process.env.PUERTO || 5000;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
