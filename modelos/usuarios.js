/**
 * Modelo Usuario
 * Define la estructura de los documentos de usuario en MongoDB.
 */

import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contraseña: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Registra createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Usuario", usuarioSchema);
