<template>
    <Login />
  </template>
  
  <script setup>
  import Login from '@/components/Login.vue'
  
  // Obtener los datos de la sesión
  const { data, error } = await useFetch('/api/auth/session', {
    credentials: 'include' // Asegúrate de que las cookies se incluyan en la solicitud
  })
  
  // Depurar la respuesta de la API
  console.log('Datos de la sesión:', data.value)
  console.log('Error de la sesión:', error.value)
  
  // Si los datos no llegan como se espera
  if (!data.value) {
    console.log('No hay datos de sesión o la API falló en devolver información.')
    await navigateTo('/login')
  } else {
    console.log('Datos recibidos:', data.value)
    // Comprobar si la sesión existe
    if (data.value.user) {
      console.log('Información de usuario:', data.value.user)
      if (data.value.user.role !== 'invitado') {
        // Si el usuario no es invitado, redirige a la página principal
        await navigateTo('/')
      }
    } else {
      console.log('La sesión está activa pero no contiene datos de usuario')
      await navigateTo('/login')
    }
  }
  </script>
  