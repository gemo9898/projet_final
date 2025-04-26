import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Leer la cookie que contiene el token
    const token = getCookie(event, 'token')

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No hay token de sesión',  // Específico si el token falta
      })
    }

    // Verificar el token con tu JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    // Guardar los datos del usuario en el contexto si quieres usarlos en otros handlers
    event.context.auth = decoded

    // Retornar la sesión activa
    return {
      authenticated: true,
      user: decoded,
    }
  } catch (error) {
    // Si la validación del token falla, devolver el estado 'no autenticado'
    return {
      authenticated: false,
      user: null,
      message: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
})
