<template>
  <v-card class="pa-3" hover>
    <v-card-title>{{ forum.name }}</v-card-title>
    <v-card-subtitle>{{ forum.description }}</v-card-subtitle>

    <v-divider class="my-2" />

    <v-list v-if="topics?.length">
      <v-list-item
        v-for="topic in topics"
        :key="topic.id"
      >
        <v-list-item-title>{{ topic.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <p v-else class="text-caption">Aucun sujet pour le moment.</p>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({ forum: Object })

const topics = ref([])

onMounted(async () => {
  const res = await $fetch(`/api/forums/${forum.id}/topics`)
  topics.value = res.topics
})
</script>
