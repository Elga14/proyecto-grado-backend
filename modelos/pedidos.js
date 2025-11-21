import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", 
      required: true,
    },
    cursos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curso",
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Pedido", pedidoSchema);
