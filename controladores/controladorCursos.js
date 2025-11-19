import Curso from "../modelos/cursos.js";

/**
 * Crear curso (solo admin)
 */
export const crearCurso = async (req, res) => {
  try {
    // Verificar que el usuario sea admin
    if (req.usuario.rol !== "admin") {
      return res.status(403).json({ mensaje: "No tienes permisos para crear cursos." });
    }

    const { titulo, descripcion, precio, imagen } = req.body;

    const nuevoCurso = new Curso({
      titulo,
      descripcion,
      precio,
      imagen,
      creadoPor: req.usuario.id
    });

    await nuevoCurso.save();

    return res.status(201).json({ mensaje: "Curso creado correctamente.", curso: nuevoCurso });

  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al crear el curso.",
      error: error.message
    });
  }
};

/**
 * Obtener todos los cursos (público)
 */
export const obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    return res.json({ cursos });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener cursos.", error: error.message });
  }
};

/**
 * Editar curso (solo admin)
 */
export const editarCurso = async (req, res) => {
  try {
    if (req.usuario.rol !== "admin") {
      return res.status(403).json({ mensaje: "No tienes permisos para editar cursos." });
    }

    const { id } = req.params;

    const cursoEditado = await Curso.findByIdAndUpdate(id, req.body, { new: true });

    if (!cursoEditado) {
      return res.status(404).json({ mensaje: "Curso no encontrado." });
    }

    return res.json({ mensaje: "Curso actualizado correctamente.", curso: cursoEditado });

  } catch (error) {
    return res.status(500).json({ mensaje: "Error al editar el curso.", error: error.message });
  }
};
