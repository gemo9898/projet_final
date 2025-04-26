import { defineWrappedResponseHandler } from '@/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
  // Eliminar la cookie del token para hacer logout
  setCookie(event, 'token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,  // Establece la duración de la cookie a 0 para eliminarla
    path: '/',
  })

  // Eliminar la información de autenticación del contexto
  event.context.auth = null

  // Responder con un mensaje de éxito
  return {
    message: 'Logout exitoso',
  }
})
