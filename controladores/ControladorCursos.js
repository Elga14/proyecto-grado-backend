
import Curso from "../modelos/cursos.js";

/**
 * 👉 Crear un nuevo curso
 * - Recibe los datos desde el body
 * - Valida los campos obligatorios
 * - Guarda el curso en la base de datos
 */
export const crearCurso = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      nivel,
      duracion,
      precio,
      categoria,
      imagenPortada,
      contenido,
      instructor,
    } = req.body;

    if (!titulo || !descripcion || !nivel || !duracion || !precio) {
      return res.status(400).json({
        mensaje: "Todos los campos obligatorios deben completarse",
      });
    }

    const nuevoCurso = new Curso({
      titulo,
      descripcion,
      nivel,
      duracion,
      precio,
      categoria,
      imagenPortada,
      contenido,
      instructor: instructor || req.usuario?.id, // el instructor es el usuario logueado
    });

    await nuevoCurso.save();

    res.status(201).json({
      mensaje: "Curso creado exitosamente",
      curso: nuevoCurso,
    });
  } catch (error) {
    console.error("❌ Error al crear curso:", error.message);
    res.status(500).json({
      mensaje: "Error al crear el curso",
      error: error.message,
    });
  }
};

/**
 * 👉 Obtener todos los cursos
 */
export const obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().populate("instructor", "nombre email");

    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los cursos",
      error: error.message,
    });
  }
};

/**
 * 👉 Obtener un curso por ID
 */
export const obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id).populate(
      "instructor",
      "nombre email"
    );

    if (!curso) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener curso",
      error: error.message,
    });
  }
};

/**
 * 👉 Actualizar curso
 */
export const actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;

    const cursoActualizado = await Curso.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!cursoActualizado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({
      mensaje: "Curso actualizado correctamente",
      curso: cursoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar curso",
      error: error.message,
    });
  }
};

/**
 * 👉 Eliminar curso
 */
export const eliminarCurso = async (req, res) => {
  try {
    const { id } = req.params;

    const cursoEliminado = await Curso.findByIdAndDelete(id);

    if (!cursoEliminado) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({ mensaje: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar curso",
      error: error.message,
    });
  }
};

/**
 * 👉 Obtener solo el contenido del curso (módulos y lecciones)
 */
export const obtenerContenidoCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);

    if (!curso) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({
      titulo: curso.titulo,
      contenido: curso.contenido,
    });
  } catch (error) {
    console.error("Error al obtener contenido:", error.message);
    res.status(500).json({
      mensaje: "Error al obtener contenido",
      error: error.message,
    });
  }
};
