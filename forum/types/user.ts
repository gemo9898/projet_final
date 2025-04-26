// Tipo para un Usuario
// /types/user.ts
export interface User {
    _id?: string;
    username: string;
    email: string;
    passwordHass: string; // Considera corregir a "passwordHash"
    role: 'admin' | 'user';
    createdAt: Date;
  }
  