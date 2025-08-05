<template>
    <div class="dashboard">
    <Sidebar />
    <main>
      <Header />
      <div class="stat-cards">
        <StatCard title="Today Income" value="₹0" subtext="This Month Income: ₹0" />
        <StatCard title="Today Expenses" value="₹0" subtext="This Month Expenses: ₹0" />
        <StatCard title="Total Staff" value="2" subtext="Presents: 0 | Absent: 2" />
      </div>
      <Chart />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchEmployees } from '../api';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue'
import StatCard from '../components/StatCard.vue'
import Chart from '../components/Chart.vue';

const employees = ref([]);
const router = useRouter();
const isadd = ref(false);

const loadEmployees = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  try {
    employees.value = await fetchEmployees(token);
  } catch {
    router.push('/login');
  }
};

</script>

<style scoped>
.dashboard {
  display: flex;
}
main {
  flex: 1;
  background: #f2f3f8;
  padding: 1rem;
  overflow-y: auto;
  height: 100vh;
}
.stat-cards {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>