<template>
    <div>
      <h2 class="text-xl font-bold mb-4">Messages</h2>
      <ul>
        <li v-for="message in messages" :key="message.id" class="mb-4">
          <div>
            <strong>{{ message.author }}</strong> <span>{{ message.date }}</span>
            <p>{{ message.content }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useForumsStore } from '@/store/forums';
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const topicId = route.params.topicId;
  
  const forumsStore = useForumsStore();
  
  onMounted(() => {
    forumsStore.fetchMessages(topicId);
  });
  
  const messages = computed(() => forumsStore.messages);
  </script>
  