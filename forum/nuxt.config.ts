export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    DB_HOST: process.env.MYSQL_HOST || 'localhost',
    DB_USER: process.env.MYSQL_USER || 'root',
    DB_PASSWORD: process.env.MYSQL_PASSWORD || '',
    DB_NAME: process.env.MYSQL_DATABASE || '',
  },
  css: ['@/assets/css/theme.css']
})
