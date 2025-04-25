<!-- <template>
    <v-container>
      <h1 class="text-h4 mb-4">Forums disponibles</h1>
      <v-row>
        <v-col
          v-for="forum in forums"
          :key="forum.id"
          cols="12"
          sm="6"
          md="4"
        >
          <ForumCard :forum="forum" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const { data: forums } = await useFetch('/api/forums/list', {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json'     
    }
  })
  </script> -->

  <template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Bienvenue sur le Forum</h1>
      <ForumList />
    </div>
  </template>
  
  <script setup>
  import ForumList from "@/components/Forums/ForumList.vue";
  </script>
  