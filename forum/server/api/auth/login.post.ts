import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { defineWrappedResponseHandler } from '@/server/utils/mysql'
import { User } from '@/types/user' // Asegúrate de que la interfaz User esté bien definida

export default defineWrappedResponseHandler(async (event) => {
  // Leer el cuerpo de la solicitud
  const body = await readBody(event)
  const { email, password } = body

  // Validar que se reciban los datos necesarios
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan datos para iniciar sesión',
    })
  }

  // Obtener la conexión MySQL desde el contexto del evento
  const connection = event.context.mysql

  // Consultar el usuario en la base de datos
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  const user = rows[0] as User

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuario no encontrado',
    })
  }

  // Verificar la contraseña
  const validPassword = await bcrypt.compare(password, user.password_hash)
  if (!validPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Contraseña incorrecta',
    })
  }

  // Crear el token JWT
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!, // Asegúrate de tener la clave secreta en las variables de entorno
    { expiresIn: '1m' }
  )

  // Enviar el token en una cookie
  setCookie(event, 'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60, // 1 hora en segundos
    path: '/',
  })

  // Actualizar event.context.auth con la información del usuario
  event.context.auth = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  // Devolver la respuesta
  return {
    message: 'Inicio de sesión exitoso',
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  }
})
