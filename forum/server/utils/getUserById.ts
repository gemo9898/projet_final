import { defineWrappedResponseHandler } from '@/server/utils/mysql'; // Asegúrate de que esta función esté bien definida

// Definir la función que obtiene un usuario por ID
export async function getUserById(userId: number) {
  // Usamos defineWrappedResponseHandler para manejar la consulta y la respuesta
  const query = 'SELECT id, username, email, role, avatar_url, created_at FROM users WHERE id = ?';

  try {
    // Asumiendo que defineWrappedResponseHandler se encarga de ejecutar la consulta y manejar errores
    const result = await defineWrappedResponseHandler(query, [userId]);

    // Si no encontramos el usuario, retornamos null o un error
    if (!result || result.length === 0) {
      return null;  // O lanzar un error si prefieres manejarlo de esa forma
    }

    // Si encontramos el usuario, retornamos el primer resultado
    return result[0];
  } catch (error) {
    // Manejo de errores si la consulta falla
    console.error('Error al obtener el usuario por ID:', error);
    throw new Error('Error al obtener el usuario');
  }
}
