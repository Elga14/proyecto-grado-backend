/**
 * ============================================================================
 * 🛡 Middleware: verificarToken
 * ----------------------------------------------------------------------------
 * Este middleware se encarga de:
 *  - Leer el token enviado por el cliente en los encabezados.
 *  - Validar que el token tenga el formato correcto ("Bearer token").
 *  - Verificar si es un token válido usando JWT.
 *  - Si es válido, agregar los datos del usuario a `req.usuario`.
 *  - Si no es válido o no existe, devolver error 401.
 * ============================================================================
 */

import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  try {
    // ------------------------------------------------------------------------
    // 1️⃣ Leer el encabezado "Authorization" enviado por el cliente
    //    Debe llegar en formato: "Bearer token_aqui"
    // ------------------------------------------------------------------------
    const encabezadoAutorizacion = req.headers["authorization"];

    if (!encabezadoAutorizacion) {
      return res.status(401).json({
        mensaje: "Acceso denegado. No se envió el token de autorización."
      });
    }

    // ------------------------------------------------------------------------
    // 2️⃣ Extraer solo el token limpio sin la palabra "Bearer"
    // ------------------------------------------------------------------------
    const token = encabezadoAutorizacion.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        mensaje: "Formato de token inválido. Debe enviarse como: Bearer token"
      });
    }

    // ------------------------------------------------------------------------
    // 3️⃣ Verificar el token usando nuestra clave secreta almacenada en .env
    // ------------------------------------------------------------------------
    const datosUsuario = jwt.verify(token, process.env.JWT_SECRETO);

    // Guardar datos del usuario en la petición para uso posterior
    req.usuario = datosUsuario;

    // ------------------------------------------------------------------------
    // 4️⃣ Continuar a la siguiente función del flujo de la ruta
    // ------------------------------------------------------------------------
    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado.",
      error: error.message
    });
  }
};
