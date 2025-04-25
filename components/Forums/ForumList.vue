<!-- <template>
    <ul>
      <li v-for="forum in forums" :key="forum.id">
        <nuxt-link :to="`/forums/${forum.id}`">{{ forum.name }} ({{ forum.topicCount }})</nuxt-link>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { useForumsStore } from "@/store/forums";
  
  const forumsStore = useForumsStore();
  
  onMounted(() => {
    forumsStore.fetchForums();
  });
  
  const forums = computed(() => forumsStore.forums);
  </script> -->
  

  <template>
    <div>
      <h2 class="text-xl font-bold mb-4">Forums</h2>
      <ul>
        <li v-for="forum in forums" :key="forum.id" class="mb-4">
          <router-link :to="`/forums/${forum.id}`" class="text-blue-600 hover:underline">{{ forum.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { useForumsStore } from '@/store/forums';
  import { onMounted } from 'vue';
  
  const forumsStore = useForumsStore();
  
  onMounted(() => {
    forumsStore.fetchForums();
  });
  
  const forums = computed(() => forumsStore.forums);
  </script>
  