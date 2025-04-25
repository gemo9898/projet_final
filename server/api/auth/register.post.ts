import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;
  const { email, username, password, role } = await readBody(event);

  try {
    
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      throw createError({ statusCode: 400, message: "El correo ya está registrado" });
    }

    
    const [result] = await db.execute(
      "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)",
      [email, username, password, role || "user"]
    );

    
    const userId = result.insertId;

    return { success: true, userId };
  } catch (error) {
    console.error("Error in register:", error);
    throw createError({ statusCode: 500, message: "Error al registrar el usuario" });
  }
});
