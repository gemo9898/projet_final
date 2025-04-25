import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { id } = event.context.params;

  const [result] = await db.execute(
    "DELETE FROM messages WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    throw createError({ statusCode: 404, message: 'Message introuvable' });
  }

  return { success: true, messageId: id };
});
