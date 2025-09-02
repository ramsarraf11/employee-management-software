<template>
  <div class="attendance-container">
    <h2>Staff Attendance</h2>

    <!-- Staff Attendance Filter -->
    <div class="filter-section">
      <div>
        <label>Roles</label>
        <select v-model="selectedRoleId">
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>

      <div>
        <label>Date</label>
        <input type="date" v-model="selectedDate" />
      </div>

      <button @click="getAttendance">Search</button>
    </div>

    <!-- Attendance List -->
    <div class="attendance-list-section">
      <h3>Staff Attendance List</h3>
      <button class="btn-holiday">MARK AS HOLIDAY</button>

      <table class="attendance-table">
        <thead>
          <tr>
            <th>Staff Id</th>
            <th>Name</th>
            <th>Attendance</th>
            <th>Contact</th>
            <th>In Time</th>
            <th>Out Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in attendanceList" :key="entry.employeeId">
            <td>{{ entry.employeeId }}</td>
            <td>{{ entry.email }}</td>
            <td class="attendance-options">
              <label><input type="radio" :name="'attend' + index" value="Present" v-model="entry.status" /> Present</label>
              <label><input type="radio" :name="'attend' + index" value="Absent" v-model="entry.status" /> Absent</label>
              <label><input type="radio" :name="'attend' + index" value="Late" v-model="entry.status" /> Late</label>
            </td>
            <td>{{ entry.contact }}</td>
            <td><input type="time" v-model="entry.inTime" /></td>
            <td><input type="time" v-model="entry.outTime" /></td>
          </tr>
        </tbody>
      </table>

      <div class="button-row">
        <button @click="giveAttendance">GIVE ATTENDANCE</button>
        <button @click="saveAttendanceForEmployees">SAVE ATTENDANCE</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAttendanceByRole, saveAttendance } from '../api';
import { useRouter } from 'vue-router';


const roles = [
  { id: 1, name: 'Manager' },
  { id: 2, name: 'Marketing Staff' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'Accountant' },
  { id: 5, name: 'Group-D' },
  { id: 6, name: 'Office Staff' }
];

const selectedRoleId = ref(1); 
const selectedDate = ref<string>(new Date().toISOString().substr(0, 10));
const attendanceList = ref<any[]>([]);

const router = useRouter();
const isLoading = ref(false);

const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }

const getAttendance = async () => {
  if (!selectedRoleId.value || !selectedDate.value) return;
  attendanceList.value = await fetchAttendanceByRole(selectedRoleId.value, token);
};

const saveAttendanceForEmployees = async () => {
   
 try {
    isLoading.value = true;

    for (const record of attendanceList.value) {
    const payload = {
        employeeId: record.employeeId,
        date: selectedDate.value,            // Assuming common date
        status: record.status,           // "Present", "Absent", etc.
        inTime: record.inTime?.slice(0, 5),   // "09:00:00" → "09:00"
        outTime: record.outTime?.slice(0, 5)            // e.g., "17:00"
      };

      await saveAttendance(payload, token);
    }

    alert('Attendance saved for all employees.');
  } catch (error) {
    console.error(error);
    alert('Error saving attendance.');
  } finally {
    isLoading.value = false;
  }
};

const giveAttendance = () => {
  alert('Giving attendance (custom logic can go here)');
};

onMounted(async () => {
});
</script>

<style scoped>
.attendance-container {
  padding: 20px;
  background: #f9f9f9;
}
.filter-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.filter-section label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.filter-section select,
.filter-section input[type="date"] {
  padding: 5px;
}
.attendance-list-section {
  margin-top: 30px;
}
.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.attendance-table th,
.attendance-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
.attendance-options {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.button-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
.btn-holiday {
  background-color: black;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
}
button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1565c0;
}
</style>
