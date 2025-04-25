import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { forumId } = event.context.params;

  const [forum] = await db.execute(
    "SELECT id, name FROM forums WHERE id = ?",
    [forumId]
  );

  if (forum.length === 0) {
    throw createError({ statusCode: 404, message: 'Forum introuvable' });
  }

  return { forum: forum[0] };
});
