<template>
     <div  v-if="!isadd">
    <h2>Employees</h2>
    <EmployeeList :employees="employees" />
    <button @click="logout">Logout</button>
    <button @click="addEmployee">Add Employee</button>
  </div>
     <AddEmployee v-if="isadd"
      @employeeAdded="onEmployeeAdded" 
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchEmployees } from '../api';

import EmployeeList from '../components/EmployeeList.vue';
import AddEmployee from '../components/AddEmployee.vue';
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

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const addEmployee = () => {
  // Logic to add a new employee
 isadd.value = true;
  console.log('Add Employee button clicked');
};

const onEmployeeAdded = () => {
  isadd.value = false;
  loadEmployees();
};

onMounted(loadEmployees);

</script>