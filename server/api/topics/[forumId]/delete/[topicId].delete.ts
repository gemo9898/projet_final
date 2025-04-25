import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { topicId } = event.context.params;

  
  await db.execute(
    "DELETE FROM messages WHERE topic_id = ?",
    [topicId]
  );

  
  const [result] = await db.execute(
    "DELETE FROM topics WHERE id = ?",
    [topicId]
  );

  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, message: 'Sujet introuvable' });
  }

  return { success: true, topicId };
});
