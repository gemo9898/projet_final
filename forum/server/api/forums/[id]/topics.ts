import { defineWrappedResponseHandler } from '@/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql
  const forumId = Number(event.context.params?.id)

  if (!forumId) {
    throw createError({ statusCode: 400, message: 'ID del foro no válido.' })
  }

  try {
    const [rows] = await db.execute(
      `
      SELECT 
        topics.id AS topicId,
        topics.title,
        users.username AS author,
        topics.created_at,
        MAX(messages.created_at) AS lastMessageDate,
        MAX(users2.username) AS lastMessageAuthor
      FROM topics
      LEFT JOIN users ON topics.author_id = users.id
      LEFT JOIN messages ON messages.topic_id = topics.id
      LEFT JOIN users AS users2 ON messages.author_id = users2.id
      WHERE topics.forum_id = ?
      GROUP BY topics.id
      ORDER BY lastMessageDate DESC
      `,
      [forumId]
    )

    return { topics: rows }
  } catch (error) {
    console.error('Error al obtener los temas del foro:', error)
    throw createError({ statusCode: 500, message: 'No se pudieron cargar los temas.' })
  }
})
