<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input v-model="username" type="text" id="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input v-model="password" type="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div>
        <button type="submit" class="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700">S'inscrire</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    // Lógica para registrar al usuario
  };
  </script>
  