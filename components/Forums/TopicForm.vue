<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
        <input v-model="title" type="text" id="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Premier message</label>
        <textarea v-model="message" id="message" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
      </div>
      <div>
        <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">Créer le sujet</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('');
  const message = ref('');
  
  const handleSubmit = () => {
    // Lógica para crear el nuevo tema
  };
  </script>
  