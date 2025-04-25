<template>
    <v-card class="pa-4" v-if="isAuthenticated">
      <v-textarea v-model="message" label="Votre réponse" auto-grow />
      <v-btn color="primary" class="mt-2" @click="submitMessage">Envoyer</v-btn>
    </v-card>
    <v-alert v-else type="info" class="my-4">
      Connectez-vous pour répondre à ce sujet.
    </v-alert>
  </template>
  
  <script setup>
  const props = defineProps({ topicId: Number })
  const message = ref('')
  const isAuthenticated = true // Simulación
  
  function submitMessage() {
    if (!message.value.trim()) return
    console.log('Envoyer réponse:', message.value, 'à topic', props.topicId)
    message.value = ''
  }
  </script>
  