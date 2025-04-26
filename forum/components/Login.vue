<template>
  <div class="auth-container">
    <h2 v-if="isLogin">Iniciar sesión</h2>
    <h2 v-else>Registro</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Introduce tu correo electrónico"
          required
        />
      </div>
      <div v-if="!isLogin">
        <label for="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Introduce tu nombre de usuario"
          required
        />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Introduce tu contraseña"
          required
        />
      </div>
      <button type="submit">{{ isLogin ? 'Iniciar sesión' : 'Registrar' }}</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <button @click="toggleForm">
      {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCookie, navigateTo } from '#app'

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const username = ref('')
const errorMessage = ref('')

const toggleForm = () => {
  isLogin.value = !isLogin.value
  errorMessage.value = ''
}

const handleSubmit = async () => {
  errorMessage.value = ''
  try {
    const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
    await $fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: {
        email: email.value,
        password: password.value,
        ...(isLogin.value ? {} : { username: username.value }),
      },
    })

    const authToken = useCookie('token')
    if (authToken.value) {
      await navigateTo('/')
    } else {
      errorMessage.value = 'No se pudo establecer la sesión. Verifica tus credenciales.'
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.statusMessage || 'Error al procesar la solicitud'
  }
}
</script>

<style scoped src="@/assets/css/AuthForm.css"></style>
