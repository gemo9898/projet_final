<template>
  <div>
    <div v-if="!user">
      <Forums/>
    </div>

    <div v-else>
      <Forums />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Forums from '@/components/Forums.vue'

const user = ref(null)

// Intenta obtener la sesión del usuario desde tu API
const { data, error } = await useFetch('/api/auth/session', {
  credentials: 'include' // importante para enviar la cookie JWT
})

if (data.value) {
  user.value = data.value.user // Aquí accedes a 'user' dentro de 'data'
  console.log('Información de usuario:', user.value) // Verifica el objeto en la consola
}
</script>
