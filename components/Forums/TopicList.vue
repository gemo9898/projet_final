<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Sujets</h2>
      <ul>
        <li v-for="topic in topics" :key="topic.id" class="mb-4">
          <router-link :to="`/forums/${forumId}/topics/${topic.id}`" class="text-blue-600 hover:underline">{{ topic.title }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useForumsStore } from '@/store/forums';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const forumId = route.params.forumId;
  
  const forumsStore = useForumsStore();
  
  onMounted(() => {
    forumsStore.fetchTopics(forumId);
  });
  
  const topics = computed(() => forumsStore.topics);
  </script>
  