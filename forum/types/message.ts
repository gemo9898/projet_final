// Tipo para un Mensaje
// /types/message.ts
export interface Message {
    _id?: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string; // Relacionado con el _id del usuario
    topicId: string;  // Relación con el _id de un tema
  }
  