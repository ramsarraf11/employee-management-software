<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="emp in employees" :key="emp.id">
        <td>{{ emp.id }}</td>
        <td>{{ emp.employeeNumber }}</td>
        <td>{{ emp.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps<{ employees: Array<any> }>();

onMounted(() => {
  // This component does not need to do anything on mount
  console.log('EmployeeList component mounted', props.employees);
});
</script>