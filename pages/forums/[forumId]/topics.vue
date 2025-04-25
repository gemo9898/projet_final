<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ forum.name }}</h1>
      <TopicList :forumId="forumId" />
      <button
        v-if="isAuthenticated"
        @click="createTopic"
        class="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Nouveau Sujet
      </button>
    </div>
  </template>
  
  <script setup>
  import TopicList from "@/components/Forums/TopicList.vue";
  import { useForumsStore } from "@/store/forums";
  import { useAuthStore } from "@/store/auth";
  
  const forumsStore = useForumsStore();
  const authStore = useAuthStore();
  
  const { forumId } = useRoute().params;
  
  onMounted(() => {
    forumsStore.fetchForum(forumId);
  });
  
  const forum = computed(() => forumsStore.selectedForum);
  const isAuthenticated = computed(() => !!authStore.user);
  
  const createTopic = () => {
    // Lógica para abrir un formulario de nuevo tema
  };
  </script>
  