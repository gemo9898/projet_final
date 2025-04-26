import { defineWrappedResponseHandler } from '@/server/utils/mysql'
import { CreateTopicRequest } from '../../../types/createTopicRequest'

export default defineWrappedResponseHandler(async (event) => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await readBody(event)

    // Desestructuración y asignación con validación de tipo
    const { title, description, forumName, message, authorId }: CreateTopicRequest = body

    // Validación de los campos requeridos
    if (!title || !message || !authorId || forumName === undefined) { // forumName también es requerido para la lógica
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan datos para la creación del tópico',
      })
    }

    // Validar tipos y longitudes de los datos
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El título no es válido.',
      })
    }

    if (description !== undefined && (typeof description !== 'string' || description.trim().length === 0)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'La descripción no es válida.',
      })
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El mensaje no es válido.',
      })
    }

    if (typeof authorId !== 'number' || authorId <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El ID de autor no es válido.',
      })
    }

    // Obtener la conexión MySQL desde el contexto del evento
    const connection = event.context.mysql

    // Verificar si el foro existe
    const [forum] = await connection.execute('SELECT * FROM forums WHERE name = ?', [forumName])

    let forumId
    if (!forum || forum.length === 0) {
      // Si no existe, crear un nuevo foro
      const [forumResult] = await connection.execute(
        'INSERT INTO forums (name, description) VALUES (?, ?)',
        [forumName, description] // Aquí también 'description' debe estar definido si el foro no existe
      )
      forumId = forumResult.insertId
    } else {
      forumId = forum[0].id; // Acceder al id del primer foro encontrado
    }

    // Crear el tópico
    const [topicResult] = await connection.execute(
      'INSERT INTO topics (forum_id, author_id, title, description, created_at) VALUES (?, ?, ?, ?, NOW())',
      [forumId, authorId, title, description !== undefined ? description : null] // Manejo de 'description' undefined
    )

    // Crear el primer mensaje (asociado al tópico recién creado)
    const [messageResult] = await connection.execute(
      'INSERT INTO messages (topic_id, author_id, content, created_at) VALUES (?, ?, ?, NOW())',
      [topicResult.insertId, authorId, message]
    )

    // Devolver la respuesta
    return {
      message: 'Tópico creado exitosamente',
      topic: {
        id: topicResult.insertId,
        title,
        description,
        forumId,
        firstMessageId: messageResult.insertId,
      },
    }
  } catch (error) {
    console.error('Error al crear el tópico:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al crear el tópico en el servidor',
    });
  }
})