import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import type { EventHandler, EventHandlerRequest } from 'h3'

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async event => {
    const config = useRuntimeConfig()
    try {
      const connection = await mysql.createConnection({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        Promise: bluebird,
      })

      event.context.mysql = connection

      const response = await handler(event)

      await connection.end()

      return response
    } catch (err) {
      console.error('[MySQL error]', err)
      return { error: 'Erreur de connexion à la base de données' }
    }
  })
