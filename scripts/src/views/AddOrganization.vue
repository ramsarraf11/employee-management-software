<template>
  <div class="add-org-form">
    <h2>Add Organization</h2>

    <form @submit.prevent="submitForm">
      <div v-for="(value, key) in form" :key="key" class="form-group">
        <label :for="key">{{ toLabel(key) }}</label>

        <!-- Boolean field for enableGST -->
        <input
          v-if="typeof form[key] === 'boolean'"
          type="checkbox"
          v-model="form[key]"
          :id="key"
        />

        <!-- Date inputs -->
        <input
          v-else-if="key.includes('financialYear')"
          type="date"
          v-model="form[key]"
          :id="key"
          required
        />

        <!-- Other fields -->
        <input
          v-else
          type="text"
          v-model="form[key]"
          :id="key"
          required
        />
      </div>

      <button type="submit">Add Organization</button>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref,defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { addOrganization } from '../api';

const router = useRouter();
const message = ref('');
const emit = defineEmits(['organizationAdded']); 

const form = ref({
  orgName: '',
  ownerName: '',
  email: '',
  address: '',
  phone: '',
  pinCode: '',
  panNo: '',
  taxNo: '',
  financialYearStart: '',
  financialYearEnd: '',
  country: '',
  state: '',
  bankName: '',
  accountNumber: '',
  branchName: '',
  ifscCode: '',
  enableGST: false
});

const toLabel = (key: string) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

const submitForm = async () => {
  try {

    await addOrganization(form.value);
    message.value = 'Organization added successfully!';
    emit('organizationAdded');
    // Optional: Reset form here if needed
  } catch (err) {
    console.error(err);
    message.value = 'Failed to add organization.';
  }
};
</script>

<style scoped>
.add-org-form {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
}
input[type="text"],
input[type="date"],
input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
input[type="checkbox"] {
  margin-top: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
