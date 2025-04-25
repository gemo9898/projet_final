<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ topic.title }}</h1>
      <MessageList :topicId="topicId" />
      <MessageForm v-if="isAuthenticated" :topicId="topicId" />
    </div>
  </template>
  
  <script setup>
  import MessageList from "@/components/Forums/MessageList.vue";
  import MessageForm from "@/components/Forums/MessageForm.vue";
  import { useForumsStore } from "@/store/forums";
  import { useAuthStore } from "@/store/auth";
  
  const forumsStore = useForumsStore();
  const authStore = useAuthStore();
  
  const { topicId } = useRoute().params;
  
  onMounted(() => {
    forumsStore.fetchTopic(topicId);
  });
  
  const topic = computed(() => forumsStore.selectedTopic);
  const isAuthenticated = computed(() => !!authStore.user);
  </script>
  