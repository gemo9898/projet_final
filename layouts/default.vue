<template>
    <div>
      <header class="bg-gray-800 text-white p-4">
        <router-link to="/" class="text-xl">Forum</router-link>
        <div v-if="isAuthenticated">
          <router-link to="/user/profile" class="ml-4">Mon Profil</router-link>
          <button @click="logout" class="ml-4 bg-red-500 text-white py-2 px-4 rounded">Déconnexion</button>
        </div>
        <div v-else>
          <router-link to="/login" class="ml-4">Se connecter</router-link>
          <router-link to="/register" class="ml-4">S'inscrire</router-link>
        </div>
      </header>
      <main class="p-4">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from "@/store/auth";
  
  const authStore = useAuthStore();
  const isAuthenticated = computed(() => !!authStore.user);
  
  const logout = () => {
    authStore.logout();
  };
  </script>
  