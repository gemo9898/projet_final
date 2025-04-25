import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { name } = await readBody(event);

  const [result] = await db.execute(
    "INSERT INTO forums (name) VALUES (?)",
    [name]
  );

  return { forumId: result.insertId };
});
