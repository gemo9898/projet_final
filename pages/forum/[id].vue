<template>
    <v-container>
      <v-btn
        v-if="isAuthenticated"
        color="primary"
        class="mb-4"
        @click="openDialog = true"
      >
        Nouveau sujet
      </v-btn>
      <v-alert v-else type="info" class="mb-4">
        Vous devez <NuxtLink to="/login">vous connecter</NuxtLink> pour créer un sujet.
      </v-alert>
  
      <v-row>
        <v-col
          v-for="topic in topics"
          :key="topic.id"
          cols="12"
        >
          <TopicCard :topic="topic" />
        </v-col>
      </v-row>
  
      <!-- Modal nouveau sujet -->
      <v-dialog v-model="openDialog" max-width="600">
        <v-card>
          <v-card-title>Créer un nouveau sujet</v-card-title>
          <v-card-text>
            <v-text-field v-model="newTopicTitle" label="Titre" />
            <v-textarea v-model="newTopicMessage" label="Message initial" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="openDialog = false">Annuler</v-btn>
            <v-btn color="primary" @click="createTopic">Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const forumId = route.params.id
  const openDialog = ref(false)
  
  const isAuthenticated = true 
  
  const topics = ref([
    {
      id: 1,
      title: 'Bienvenue sur le forum !',
      author: 'admin',
      lastMessage: { author: 'admin', date: '2024-04-01' }
    },
    {
      id: 2,
      title: 'Problème avec Nuxt 3',
      author: 'user123',
      lastMessage: { author: 'dev42', date: '2024-04-10' }
    }
  ])
  
  const newTopicTitle = ref('')
  const newTopicMessage = ref('')
  
  function createTopic() {
    
    console.log('Créer le sujet:', newTopicTitle.value, newTopicMessage.value)
    openDialog.value = false
  }
  </script>
  