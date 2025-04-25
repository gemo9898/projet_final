import { defineWrappedResponseHandler } from "~/server/utils/mysql"
export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    const { email, password } = await readBody(event)
    
    const [rows] = await db.execute(
      "SELECT id, email, username, role FROM users WHERE email = ? AND password = ?",
      [email, password]
    )
    
    if (rows.length === 0) {
      throw createError({ statusCode: 401, message: 'Credenciales inválidas' })
    }
    
    const user = rows[0]

    
    return { user }
  })


