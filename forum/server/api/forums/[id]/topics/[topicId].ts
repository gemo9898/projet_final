import { defineWrappedResponseHandler } from '@/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql
  const forumId = Number(event.context.params?.id) // ID del foro
  const topicId = Number(event.context.params?.topicId) // ID del topic

  // Verificación de parámetros numéricos
  if (isNaN(forumId) || isNaN(topicId)) {
    throw createError({ statusCode: 400, message: 'ID del foro o del tema no válido.' })
  }

  try {
    // Consultamos la base de datos para obtener el topic específico dentro del foro
    const [rows] = await db.execute(
      `
      SELECT 
        topics.id AS topicId,
        topics.title,
        topics.locked,
        topics.created_at,
        topics.updated_at,
        users.username AS author,
        users.email AS authorEmail
      FROM topics
      LEFT JOIN users ON topics.author_id = users.id
      WHERE topics.forum_id = ? AND topics.id = ?
      `,
      [forumId, topicId]
    )

    // Si no encontramos el topic, devolvemos un error 404
    if (rows.length === 0) {
      throw createError({ statusCode: 404, message: 'Topic no encontrado.' })
    }

    // Si todo sale bien, devolvemos el topic encontrado
    return { topic: rows[0] }
  } catch (error) {
    console.error('Error al obtener el tema:', error)
    throw createError({ statusCode: 500, message: 'No se pudo cargar el tema.' })
  }
})
