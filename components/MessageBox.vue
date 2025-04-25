<template>
    <div class="mb-4 p-4 border rounded shadow-sm">
      <div class="flex justify-between items-center mb-2">
        <span class="font-semibold">{{ message.author }}</span>
        <span class="text-sm text-gray-500">{{ message.createdAt }}</span>
      </div>
      <p>{{ message.content }}</p>
      <div v-if="canEdit" class="mt-2">
        <button @click="editMessage" class="text-blue-600 hover:underline">Modifier</button>
        <button @click="deleteMessage" class="text-red-600 hover:underline ml-2">Supprimer</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/store/auth";
  
  const props = defineProps({
    message: Object,
    canEdit: Boolean, // Permite que el autor o un admin edite/elimine el mensaje
  });
  
  const authStore = useAuthStore();
  
  const editMessage = () => {
    // Lógica para editar el mensaje
  };
  
  const deleteMessage = () => {
    // Lógica para eliminar el mensaje
  };
  </script>
  
  <style scoped>
  button {
    cursor: pointer;
  }
  </style>
  