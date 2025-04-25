<!-- <template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Mot de passe:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Connexion</button>
  </form>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await authStore.login({ email, password });
    router.push("/");
  } catch (error) {
    alert("Erreur de connexion.");
  }
};
</script> -->

<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Connexion</h1>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from "@/components/Auth/LoginForm.vue";
</script>

