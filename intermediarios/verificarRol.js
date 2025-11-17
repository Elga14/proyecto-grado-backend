/**
 * Middleware para verificar rol de usuario.
 * Uso: verificarRol('admin')  o verificarRol('usuario')
 */
export const verificarRol = (rolRequerido) => {
  return (req, res, next) => {
    try {
      // req.usuario viene de verificarToken
      if (!req.usuario || !req.usuario.rol) {
        return res.status(403).json({ mensaje: "Acceso denegado. Rol no disponible." });
      }
      if (req.usuario.rol !== rolRequerido) {
        return res.status(403).json({ mensaje: "Acceso denegado. No tienes permiso." });
      }
      next();
    } catch (error) {
      return res.status(500).json({ mensaje: "Error al verificar rol.", error: error.message });
    }
  };
};
