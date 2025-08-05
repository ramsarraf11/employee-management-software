<template>
  <header class="header">
    <div class="breadcrumbs">
      <span>🏠 / Dashboard</span>
      <h2>Dashboard</h2>
    </div>
    <div class="user-icons">
      <i class="icon" @click="logout">👤</i>
      <i class="icon">🔔</i>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'; 
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.user-icons i {
  margin-left: 1rem;
}
</style>
