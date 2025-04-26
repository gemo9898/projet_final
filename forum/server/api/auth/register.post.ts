import bcrypt from 'bcryptjs'
import { defineWrappedResponseHandler } from '@/server/utils/mysql'
import jwt from 'jsonwebtoken'
import { RegisterUserRequest } from '../../../types/registerUserRequest'  // Asegúrate de que este tipo esté bien importado

export default defineWrappedResponseHandler(async (event) => {
  // Leer el cuerpo de la solicitud
  const body = await readBody(event)
  const { email, password, username, role = 'user' }: RegisterUserRequest = body  // Usamos 'user' por defecto para el role

  // Validar que se reciban los datos necesarios
  if (!email || !password || !username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Faltan datos para el registro',
    })
  }

  // Obtener la conexión MySQL desde el contexto del evento
  const connection = event.context.mysql

  // Consultar si el correo ya está registrado
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  if (rows.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El correo ya está registrado',
    })
  }

  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Insertar el nuevo usuario en la base de datos
  const [result] = await connection.execute(
    'INSERT INTO users (email, password_hash, username, role, created_at) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, username, role, new Date()]
  )

  // Obtener el nuevo usuario insertado
  const newUser = {
    _id: result.insertId,  // El ID generado por MySQL
    email,
    username,
    role,
    created_at: new Date(),  // Utilizando el formato correcto
  }

  // Crear el token JWT
  const token = jwt.sign(
    {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
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
    userId: newUser._id,
    email: newUser.email,
    role: newUser.role,
  }

  // Devolver la respuesta
  return {
    message: 'Usuario registrado exitosamente',
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      created_at: newUser.created_at, // Devuelve la fecha correcta
    },
  }
})
