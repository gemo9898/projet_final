// Solicitud para Promover un Usuario
// /types/promoteUserRequest.ts
export interface PromoteUserRequest {
    userId: string;
    role: 'admin' | 'user';
  }
  