import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import { defineEventHandler } from 'h3';

export const defineWrappedResponseHandler = (handler) => {
  return defineEventHandler(async (event) => {
    let connection;
    try {
      connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'forum',
        port: 3306,
        Promise: bluebird,
      });

      event.context.mysql = connection;
      const response = await handler(event);
      return response;
    } catch (err) {
      console.error('Error in wrapped handler:', err);
      throw err; 
    } finally {
      if (connection) {
        await connection.end(); 
      }
    }
  });
};
