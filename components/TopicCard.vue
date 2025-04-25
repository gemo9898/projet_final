<template>
    <v-card class="pa-2" :to="`/topic/${topic.id}`" hover>
      <v-card-title>{{ topic.title }}</v-card-title>
      <v-card-subtitle>
        Par {{ topic.author }} · Dernier message par {{ topic.lastMessage.author }} le {{ topic.lastMessage.date }}
      </v-card-subtitle>
    </v-card>
  </template>
  
  <script setup>
  defineProps({
    topic: Object
  })
  </script>
  