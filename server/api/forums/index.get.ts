import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;

  const [rows] = await db.execute(
    "SELECT forums.id, forums.name, COUNT(topics.id) AS topicCount FROM forums LEFT JOIN topics ON forums.id = topics.forum_id GROUP BY forums.id ORDER BY forums.name ASC"
  );

  return { forums: rows };
});
