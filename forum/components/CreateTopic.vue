<template>
    <div>
      <h2>Crear Tópico</h2>
  
      <form @submit.prevent="createTopic">
        <div>
          <label for="title">Título</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Ingrese el título del tópico"
            required
          />
        </div>
  
        <div>
          <label for="description">Descripción (opcional)</label>
          <textarea
            id="description"
            v-model="description"
            placeholder="Ingrese una descripción del tópico"
          ></textarea>
        </div>
  
        <div>
          <label for="forumName">Nombre del Foro</label>
          <input
            id="forumName"
            v-model="forumName"
            type="text"
            placeholder="Ingrese el nombre del foro"
            required
          />
        </div>
  
        <div>
          <label for="message">Mensaje Inicial</label>
          <textarea
            id="message"
            v-model="message"
            placeholder="Ingrese el mensaje inicial"
            required
          ></textarea>
        </div>
  
        <div>
          <button type="submit">Crear Tópico</button>
        </div>
  
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Estado del formulario
  const title = ref('');
  const description = ref('');
  const forumName = ref('');
  const message = ref('');
  const error = ref('');
  const success = ref('');
  
  // ID del autor está fijado a un valor por defecto (puedes reemplazarlo con un valor real más tarde)
  const authorId = 1; // Cambiar por el ID real cuando tengas el sistema de autenticación listo
  
  const createTopic = async () => {
    if (!title.value || !message.value || !forumName.value) {
      error.value = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
  
    try {
      // Llamar a la API para crear el tópico
      const response = await $fetch('/api/newTopic', {
        method: 'POST',
        body: {
          title: title.value,
          description: description.value,
          forumName: forumName.value,
          message: message.value,
          authorId,
        },
      });
  
      success.value = 'Tópico creado exitosamente';
      title.value = '';
      description.value = '';
      forumName.value = '';
      message.value = '';
    } catch (err) {
      console.error('Error al crear el tópico:', err);
      error.value = 'Hubo un error al crear el tópico, inténtalo nuevamente.';
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  