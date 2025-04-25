import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { forumId } = event.context.params;

  const [rows] = await db.execute(
    `SELECT topics.id, topics.title, topics.created_at, users.username AS author, 
    (SELECT username FROM users WHERE id = messages.user_id ORDER BY messages.created_at DESC LIMIT 1) AS lastMessageAuthor,
    (SELECT created_at FROM messages WHERE topic_id = topics.id ORDER BY created_at DESC LIMIT 1) AS lastMessageDate
    FROM topics
    LEFT JOIN users ON topics.user_id = users.id
    WHERE topics.forum_id = ?
    ORDER BY lastMessageDate DESC
    LIMIT 20`,
    [forumId]
  );

  return { topics: rows };
});
