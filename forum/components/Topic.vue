<template>
    <div v-if="topicDetails" class="topic-detail">
      <h2>{{ topicDetails.title }}</h2>
      <p><strong>Autor:</strong> {{ topicDetails.author }}</p>
      <p><strong>Fecha de creación:</strong> {{ topicDetails.created_at }}</p>
      <h3>Mensajes:</h3>
      <ul v-if="topicDetails.messages?.length">
        <li v-for="message in topicDetails.messages" :key="message.id" class="message-item">
          <p>{{ message.content }}</p>
          <small>Por {{ message.author }} el {{ message.created_at }}</small>
        </li>
      </ul>
      <p v-else>No hay mensajes en este tema.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const topicDetails = ref(null)
  
  onMounted(async () => {
    const forumId = route.params.forumId
    const topicId = route.params.id
    
    const { data, error } = await useFetch(`/api/forums/${forumId}/topics/${topicId}`)
  
    if (error.value) {
      console.error('Error al obtener el tema:', error.value)
    } else {
      topicDetails.value = data.value
    }
  })
  </script>
  
  <style scoped>
  .topic-detail {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .message-item {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  