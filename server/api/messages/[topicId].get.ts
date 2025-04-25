import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { topicId } = event.context.params;

  const [rows] = await db.execute(
    "SELECT messages.id, messages.content, messages.created_at, users.username AS author FROM messages LEFT JOIN users ON messages.user_id = users.id WHERE messages.topic_id = ? ORDER BY messages.created_at ASC LIMIT 20",
    [topicId]
  );

  return { messages: rows };
});
