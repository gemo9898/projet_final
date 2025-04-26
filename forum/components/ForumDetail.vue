<!-- components/ForumDetail.vue -->
<template>
    <div v-if="forumDetails" class="forum-detail">
      <h2>{{ forumDetails.forumName }}</h2>
      <p>{{ forumDetails.description }}</p>
      <h3>Temas:</h3>
      <ul v-if="forumDetails.topics?.length">
        <li v-for="topic in forumDetails.topics" :key="topic.topicId" class="topic-item">
          <router-link :to="`/forums/${route.params.id}/topics/${topic.topicId}`">
            <h4>{{ topic.title }}</h4>
            <small>Último mensaje: {{ topic.lastMessageDate }} por {{ topic.lastMessageAuthor }}</small>
          </router-link>
        </li>
      </ul>
      <p v-else>No hay temas disponibles.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  const { data, error, pending } = await useFetch(`/api/forums/${route.params.id}/topics`)
  const forumDetails = data.value
  
  </script>
  
  <style scoped>
  .forum-detail {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .topic-item {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  router-link {
    text-decoration: none;
    color: inherit;
  }
  </style>
  