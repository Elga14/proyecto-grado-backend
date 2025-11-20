// 📁 models/curso.js

import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  nivel: { type: String, required: true },
  duracion: { type: String, required: true },
  categoria: { type: String, required: true, default: "General" },
  precio: { type: Number, required: true },
  imagenPortada: {
    type: String,
    default: "https://via.placeholder.com/600x400?text=Curso",
  },
  contenido: [
    {
      modulo: String,
      lecciones: [
        {
          tituloLeccion: String,
          descripcionLeccion: String,
          tipo: String,
          videoUrl: String,
          archivoUrl: String,
          imagenUrl: String,
          contenidoTexto: String,
          preguntas: [
            {
              pregunta: String,
              opciones: [String],
              respuestaCorrecta: String,
            },
          ],
        },
      ],
    },
  ],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: false,
  },
});

export default mongoose.model("Curso", cursoSchema);
