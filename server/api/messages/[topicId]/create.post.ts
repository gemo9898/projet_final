import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { topicId } = event.context.params;
  const { content, userId } = await readBody(event);

  const [result] = await db.execute(
    "INSERT INTO messages (content, topic_id, user_id, created_at) VALUES (?, ?, ?, NOW())",
    [content, topicId, userId]
  );

  return { messageId: result.insertId };
});
