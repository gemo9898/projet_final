// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],

  

  build: {
    transpile: ['vuetify'],
  },

  modules: [],

  nitro: {
    experimental: {
      websocket: true
    },
    
  },

  compatibilityDate: '2025-04-24',
})