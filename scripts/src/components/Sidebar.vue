<template>
  <aside class="sidebar">
    <ul>
      <li>Dashboard</li>
      <li>Front Office</li>
      <li>Income</li>
      <li>Expense</li>
      <li @click="resourceManagement">Human Resource</li>
      <li>General Setting</li>
    </ul>
  </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const resourceManagement = () => {
  router.push('/humanresource');
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #041f4e;
  color: white;
  height: 100vh;
  padding: 1rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 0.75rem 0;
  cursor: pointer;
}
.sidebar li:hover {
  background-color: #133366;
}
</style>
