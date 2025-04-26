export interface CreateTopicRequest {
  title: string     // Corresponde a la columna 'title' en la tabla 'topics'
  forumId: number   // Corresponde a la columna 'forum_id' en la tabla 'topics'
  message: string   // Debería ser parte del contenido de los mensajes en la tabla 'messages'
  authorId: number  // Corresponde a la columna 'author_id' en la tabla 'topics'
}
