import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    isLoggedIn: false,
    email: null as string | null,  // Cambié 'user' por 'email'
  }),

  actions: {
    async fetchSession() {
      try {
        const { data } = await useFetch('/api/auth/session', {
          credentials: 'include', // si usas cookies httpOnly
        })

        // Verificamos si el 'email' existe en la respuesta
        if (data.value?.email) {
          this.email = data.value.email  // Guardamos el email en la store
          this.isLoggedIn = true
        } else {
          this.email = null
          this.isLoggedIn = false
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error)
        this.email = null
        this.isLoggedIn = false
      }
    },

    logout() {
      this.email = null
      this.isLoggedIn = false
    }
  }
})
