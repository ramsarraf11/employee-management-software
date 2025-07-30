<template>
  <div class="add-employee-form">
    <h2>Add New Employee</h2>
    <form @submit.prevent="submitForm">
      <div v-for="(field, key) in form" :key="key" class="form-group">
        <label :for="key">{{ toLabel(key) }}</label>

        <input
          v-if="key !== 'gender' && key !== 'employmentType'"
          v-model="form[key]"
          :id="key"
          :type="getInputType(key)"
          required
        />

        <select v-else-if="key === 'gender'" v-model="form.gender" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select v-else-if="key === 'employmentType'" v-model="form.employmentType" required>
          <option value="">Select Employment Type</option>
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
          <option value="Intern">Intern</option>
        </select>
      </div>

      <button type="submit">Add Employee</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { addEmployee } from '../api'; // assumes this exists

const router = useRouter();
const message = ref('');
const emit = defineEmits(['employeeAdded']); 

const form = ref({
  employeeNumber: '',
  firstName: '',
  lastName: '',
  panNumber: '',
  roleId: '',
  departmentId: '',
  designationId: '',
  gender: '',
  email: '',
  dateOfBirth: '',
  dateOfJoining: '',
  contactNumber: '',
  employmentType: '',
  address: '',
  basicPay: 0,
  netAmount: 0,
});

// Get correct input type
const getInputType = (key: string) => {
  if (key.includes('Date')) return 'date';
  if (key.includes('email')) return 'email';
  if (typeof form.value[key as keyof typeof form.value] === 'number') return 'number';
  return 'text';
};

// Convert camelCase to Label
const toLabel = (key: string) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const submitForm = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    await addEmployee(form.value, token);
    message.value = 'Employee added successfully!';
    
    // Emit event to parent component
     // Redirect to employee list after adding
    form.value = {
      employeeNumber: '',
      firstName: '',
      lastName: '',
      panNumber: '',
      roleId: '',
      departmentId: '',
      designationId: '',
      gender: '',
      email: '',
      dateOfBirth: '',
      dateOfJoining: '',
      contactNumber: '',
      employmentType: '',
      address: '',
      basicPay: 0,
      netAmount: 0,
    };
    emit('employeeAdded');
  } catch (err) {
    console.error(err);
    message.value = 'Failed to add employee.';
  }
};
</script>

<style scoped>
.add-employee-form {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
}
input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
