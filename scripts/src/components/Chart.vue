<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref()

onMounted(() => {
  new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Income vs Expenses',
          data: [1, 0.5, 0.75],
          backgroundColor: ['#4caf50', '#f44336', '#2196f3']
        }
      ]
    }
  })
})
</script>

<style scoped>
.chart-container {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
