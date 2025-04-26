// Cuerpo de la solicitud de Registro de Usuario
// /types/registerUserRequest.ts
export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
  }
  