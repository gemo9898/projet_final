<template>
  <header>
    <div class="welcome">
      Bienvenido, {{ session.email || 'invitado' }}
    </div>
    <button @click="handleClick">
      {{ session.isLoggedIn ? 'Cerrar sesión' : 'Iniciar sesión' }}
    </button>
  </header>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const session = useSessionStore()
const router = useRouter()

// Al montar el componente, verificamos la sesión
onMounted(() => {
  session.fetchSession() // Llama a la función que consulta el estado de la sesión
  console.log('Estado de la sesión:', session) // Imprime el estado de la sesión para depurar
})

// Manejar el clic del botón
const handleClick = async () => {
  console.log('Sesión actual al hacer clic:', session) // Imprime la sesión cuando se hace clic en el botón
  
  if (session.isLoggedIn) {
    // Cierre de sesión
    try {
      const response = await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (response.success) {
        session.logout() // Actualiza el estado de la sesión en la store
        router.push('/login') // Redirige al login después de cerrar sesión
      } else {
        console.error('Error al cerrar sesión:', response.message)
      }
    } catch (err) {
      console.error('Error cerrando sesión:', err)
    }
  } else {
    // Redirige al login si no está logueado
    router.push('/login')
  }
}
</script>
<style scoped src="@/assets/css/Header.css"></style>

