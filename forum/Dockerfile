# Etapa de construcción
FROM node:20-alpine AS frontend
WORKDIR /home/node/app

# Copiamos los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalamos dependencias (usa npm ci si es producción y tienes package-lock.json)
RUN npm install

# Copiamos el resto del código
COPY . .

# Construimos la app Nuxt
RUN npm run build

# Etapa final
FROM node:20-alpine AS final
WORKDIR /app

# Copiamos el resultado de la build
COPY --from=frontend /home/node/app/.output ./

# Exponemos el puerto para Nuxt
EXPOSE 3000

# Variables de entorno
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Comando para iniciar la app
CMD ["node", "server/index.mjs"]

