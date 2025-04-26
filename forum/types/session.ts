// Tipo para una Sesión de usuario
// /types/session.ts
export interface Session {
    _id?: string;
    userId: string;  // Relación con el _id del usuario
    token: string;
    createdAt: Date;
    expiresAt: Date;
  }
  