// Importación de librerías principales del backend
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Importación de la función que conecta a MongoDB
import conectarBD from "./configuracion/conexionBD.js";

// Importación de las rutas del módulo Usuarios
import rutaUsuarios from "./rutas/rutaUsuarios.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar con la base de datos MongoDB
conectarBD();

// Crear una instancia de la aplicación Express
const app = express();

// Habilitar CORS para permitir peticiones del frontend
app.use(cors());

// Habilitar lectura de datos en formato JSON
app.use(express.json());

/*
  Ruta raíz del servidor.
  Esta ruta permite verificar rápidamente que el backend está activo.
  Simplemente responde un mensaje tipo ping-test.
*/
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

// Rutas principales del API relacionadas con usuarios
app.use("/api/usuarios", rutaUsuarios);

// Puerto en el que se ejecutará el servidor (definido en .env o por defecto 5000)
const PUERTO = process.env.PUERTO || 5000;

/*
  Inicio del servidor.
  Aquí se activa el servidor y queda escuchando peticiones HTTP.
*/
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
