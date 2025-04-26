// Tipo para un Tema
// /types/topic.ts
export interface Topic {
    _id?: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string; // Relacionado con el _id del usuario
  }
  