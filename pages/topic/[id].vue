<template>
    <v-container>
      <v-card class="mb-4">
        <v-card-title>{{ topic?.title }}</v-card-title>
        <v-card-subtitle>Posté par {{ topic?.author }} – {{ formatDate(topic?.created_at) }}</v-card-subtitle>
        <v-card-text>{{ topic?.content }}</v-card-text>
      </v-card>
  
      <v-divider class="my-6" />
      <h2 class="text-h6 mb-4">Réponses</h2>
  
      <v-card
        v-for="(message, index) in topic?.messages"
        :key="index"
        class="mb-3"
      >
        <v-card-title>{{ message.author }}</v-card-title>
        <v-card-subtitle>{{ formatDate(message.created_at) }}</v-card-subtitle>
        <v-card-text>{{ message.content }}</v-card-text>
      </v-card>
  
      <v-divider class="my-6" />
      <h2 class="text-h6 mb-4">Répondre</h2>
      <MessageForm :topicId="topicId" />
    </v-container>
  </template>
  
  <script setup>
  import MessageForm from '@/components/MessageForm.vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const topicId = parseInt(route.params.id)
  const topic = ref(null)
  
  onMounted(() => {
    // Simulación de datos
    topic.value = {
      id: topicId,
      title: 'Comment installer Nuxt 3 avec Docker ?',
      author: 'JeanDupont',
      created_at: '2024-12-20T14:30:00Z',
      content: 'Bonjour à tous, j’essaie d’installer Nuxt 3 dans un conteneur Docker. Des conseils ?',
      messages: [
        {
          author: 'SophieCode',
          created_at: '2024-12-20T15:00:00Z',
          content: 'Tu peux utiliser un fichier Dockerfile avec node:18 et faire un `npm run dev` dedans.',
        },
        {
          author: 'AlexDev',
          created_at: '2024-12-20T15:15:00Z',
          content: 'Et n’oublie pas d’ouvrir le port 3000 ! 😉',
        }
      ]
    }
  })
  
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }
  </script>
  