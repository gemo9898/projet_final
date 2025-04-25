import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { forumId } = event.context.params;
  const { title, message, userId } = await readBody(event);

  const [topicResult] = await db.execute(
    "INSERT INTO topics (title, forum_id, user_id, created_at) VALUES (?, ?, ?, NOW())",
    [title, forumId, userId]
  );

  const [messageResult] = await db.execute(
    "INSERT INTO messages (content, topic_id, user_id, created_at) VALUES (?, ?, ?, NOW())",
    [message, topicResult.insertId, userId]
  );

  return { topicId: topicResult.insertId, messageId: messageResult.insertId };
});
