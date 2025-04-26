// server/api/forums/index.ts

import { defineWrappedResponseHandler } from '@/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql

  try {
    const [rows] = await db.execute(`
      SELECT 
        forums.id AS forumId,
        forums.name AS forumName,
        forums.description,
        COUNT(topics.id) AS topicsCount
      FROM forums
      LEFT JOIN topics ON topics.forum_id = forums.id
      GROUP BY forums.id
      ORDER BY forums.name ASC
    `)

    return { forums: rows }
  } catch (error) {
    console.error('Error al obtener los foros:', error)
    throw createError({ statusCode: 500, message: 'No se pudieron cargar los foros.' })
  }
})
