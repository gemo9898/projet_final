import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { forumId } = await readBody(event);

  
  await db.execute(
    `DELETE messages FROM messages 
    JOIN topics ON messages.topic_id = topics.id
    WHERE topics.forum_id = ?`,
    [forumId]
  );

  await db.execute(
    "DELETE FROM topics WHERE forum_id = ?",
    [forumId]
  );

  const [result] = await db.execute(
    "DELETE FROM forums WHERE id = ?",
    [forumId]
  );

  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, message: 'Forum introuvable' });
  }

  return { success: true, forumId };
});
