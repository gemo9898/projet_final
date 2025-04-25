<!-- <template>
    <v-container>
      <v-card class="mx-auto" max-width="500">
        <v-card-title>Créer un compte</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="register">
            <v-text-field v-model="username" label="Nom d'utilisateur" required />
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Mot de passe" type="password" required />
            <v-text-field v-model="confirmPassword" label="Confirmer le mot de passe" type="password" required />
            <v-btn type="submit" color="primary" block class="mt-4">S'inscrire</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <NuxtLink to="/login">Déjà un compte ?</NuxtLink>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()

async function register() {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas.")
    return
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Une erreur est survenue')
    }

    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.')
    router.push('/login')
  } catch (error) {
    alert(error.message)
  }
}
</script>

   -->

   
   <template>
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-4">Inscription</h1>
      <RegisterForm />
    </div>
  </template>
  
  <script setup>
  import RegisterForm from "@/components/Auth/RegisterForm.vue";
  </script>
  