<template>
    <div>
      <header class="bg-gray-800 text-white p-4">
        <router-link to="/" class="text-xl">Admin Panel</router-link>
      </header>
      <main class="p-4">
        <slot />
      </main>
    </div>
  </template>
  