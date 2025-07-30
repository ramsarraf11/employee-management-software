<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="onLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>

    <button type="button" class="register-button" @click="goToRegisterOrg">
      Register Organization
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const onLogin = async () => {
  error.value = '';
  try {
    const data = await login(email.value, password.value);
    localStorage.setItem('token', data);
    router.push('/employees');
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Login failed';
  }
};

const goToRegisterOrg = () => {
  router.push('/addorg');
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 100px auto;
  text-align: center;
}
.error {
  color: red;
  margin-top: 10px;
}
.register-button {
  margin-top: 20px;
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-button:hover {
  background-color: #059669;
}
</style>
