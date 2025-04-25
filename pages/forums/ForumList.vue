<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Forums</h1>
      <div v-if="forums.length === 0" class="text-gray-500">
        Aucun forum disponible pour le moment.
      </div>
      <ul v-else>
        <li v-for="forum in forums" :key="forum.id" class="mb-4">
          <router-link :to="`/forums/${forum.id}`" class="block p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
            <h2 class="text-xl font-semibold">{{ forum.name }}</h2>
            <p class="text-sm text-gray-600">{{ forum.description }}</p>
            <span class="text-sm text-blue-600">{{ forum.topicCount }} sujets</span>
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useForumsStore } from "@/store/forums";
  import { onMounted } from "vue";
  
  const forumsStore = useForumsStore();
  
  onMounted(() => {
    forumsStore.fetchForums();
  });
  
  const forums = computed(() => forumsStore.forums);
  </script>
  
  <style scoped>
  
  </style>
  