<template>
    <div class="breadcrumb-container">
      <ul class="breadcrumb-list">
        <li
          v-for="(route, index) in breadcrumb"
          :key="index"
          class="breadcrumb-item"
        >
          <nuxt-link :to="route.path" class="breadcrumb-link">
            {{ route.name }}
          </nuxt-link>
          <span v-if="index < breadcrumb.length - 1" class="separator">/</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const breadcrumb = ref([])
  
  const route = useRoute()
  
  // Función para actualizar el breadcrumb
  const updateBreadcrumb = () => {
    const path = route.path
    const name = route.name || 'Página'
  
    // Verificamos si la ruta ya existe en el historial
    if (breadcrumb.value.length === 0 || breadcrumb.value[breadcrumb.value.length - 1].path !== path) {
      // Si la ruta no está en el historial, la agregamos
      breadcrumb.value.push({ path, name })
    }
  }
  
  // Actualizar el breadcrumb cada vez que se cambia de ruta
  watch(route, () => {
    updateBreadcrumb()
  }, { immediate: true })
  </script>
  
  <style scoped>
  .breadcrumb-container {
    background-color: #f7f7f7;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  .breadcrumb-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    font-size: 14px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .breadcrumb-item {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  
  .breadcrumb-link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
  }
  
  .breadcrumb-link:hover {
    color: #0056b3;
    transform: scale(1.05);
  }
  
  .separator {
    margin: 0 5px;
    color: #888;
  }
  
  .breadcrumb-link:focus {
    outline: none;
    border-bottom: 2px solid #007bff;
  }
  </style>
  