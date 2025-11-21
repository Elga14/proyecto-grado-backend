import Pedido from "../modelos/pedidos.js";

// crear una nueva orden (compra)
export const crearPedido = async (req, res) => {
  try {
    const { cursos, total } = req.body;
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    if (!cursos || cursos.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    const nuevoPedido = new Pedido({
      usuario: usuarioId,
      cursos,
      total,
    });

    await nuevoPedido.save();

    res.status(201).json({
      mensaje: "Compra realizada con éxito",
      pedido: nuevoPedido,
    });
  } catch (error) {
    console.error("❌ Error al crear pedido:", error.message);
    res.status(500).json({
      mensaje: "Error al crear el pedido",
      error: error.message,
    });
  }
};


// Obtener los cursos comprados por un usuario
export const obtenerCursosDelUsuario = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const pedidos = await Pedido.find({ usuario: usuarioId }).populate("cursos");

    const cursosComprados = [];
    pedidos.forEach((pedido) => {
      pedido.cursos.forEach((curso) => {
        if (!cursosComprados.find((c) => c._id.toString() === curso._id.toString())) {
          cursosComprados.push(curso);
        }
      });
    });

    res.status(200).json(cursosComprados);
  } catch (error) {
    console.error("Error al obtener cursos:", error.message);
    res.status(500).json({
      mensaje: "Error al obtener los cursos del usuario",
      error: error.message,
    });
  }
};
