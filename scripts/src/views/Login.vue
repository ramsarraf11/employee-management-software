<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>

      <button class="register-button" @click="goToRegisterOrg">
        Register Organization
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const onLogin = async () => {
  error.value = ''
  try {
    const data = await login(email.value, password.value)
    localStorage.setItem('token', data.token)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Login failed'
  }
}

const goToRegisterOrg = () => {
  router.push('/addorg')
}
</script>

<style scoped>
/* Background image */
.login-page {
  height: 97vh;
  background: url('../assets/background-img.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Card styling */
.login-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Headline */
h2 {
  margin-bottom: 1.5rem;
  color: #2563eb;
}

/* Inputs */
input {
  width: 94%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

/* Login button */
button[type='submit'] {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

/* Register button */
.register-button {
  width: 100%;
  background-color: #10b981;
  padding: 0.75rem;
  border: none;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #059669;
}

/* Error */
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
