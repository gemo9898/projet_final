<!-- components/ForumList.vue -->
<template>
  <div class="forum-list">
    <h2>Foros disponibles</h2>
    <ul v-if="forums?.length">
      <li v-for="forum in forums" :key="forum.forumId" class="forum-item">
        <router-link :to="`/forums/${forum.forumId}`">
          <h3>{{ forum.forumName }}</h3>
          <p>{{ forum.description }}</p>
          <small>{{ forum.topicsCount }} tema(s)</small>
        </router-link>
      </li>
    </ul>
    <p v-else>Cargando foros...</p>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/forums')
const forums = data.value?.forums ?? []
</script>

<style scoped>
.forum-list {
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
}

.forum-item {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

router-link {
  text-decoration: none;
  color: inherit;
}
</style>
