<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Gestion des Forums</h1>
      <ul>
        <li v-for="forum in forums" :key="forum.id" class="mb-2">
          <div class="flex items-center gap-4">
            <span>{{ forum.name }}</span>
            <button @click="deleteForum(forum.id)" class="p-1 bg-red-500 text-white rounded">
              Supprimer
            </button>
          </div>
        </li>
      </ul>
      <div class="mt-4">
        <input v-model="newForumName" placeholder="Nom du forum" class="p-2 border rounded" />
        <button @click="addForum" class="p-2 bg-blue-500 text-white rounded">
          Ajouter
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useForumsStore } from "@/store/forums";
  
  const forumsStore = useForumsStore();
  const newForumName = ref("");
  
  onMounted(() => {
    forumsStore.fetchForums();
  });
  
  const forums = computed(() => forumsStore.forums);
  
  const addForum = async () => {
    if (!newForumName.value) return;
    await forumsStore.createForum(newForumName.value);
    newForumName.value = "";
  };
  
  const deleteForum = async (forumId) => {
    await forumsStore.deleteForum(forumId);
  };
  </script>
  