<template>
  <div class="card">
    <div class="icon">📊</div>
    <div>
      <h4>{{ title }}</h4>
      <p>{{ value }}</p>
      <small>{{ subtext }}</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  subtext: String,
})
</script>

<style scoped>
.card {
  display: flex;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  align-items: center;
}
.icon {
  font-size: 2rem;
  margin-right: 1rem;
}
</style>
