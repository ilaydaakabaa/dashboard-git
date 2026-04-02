<template>
  <div class="stat-card">
    <p class="stat-title">{{ title }}</p>
    <h3 class="stat-value">{{ value }}</h3>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  }
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 18px;
  padding: 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.stat-title {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  word-break: break-word;
}

@media (max-width: 576px) {
  .stat-card {
    padding: 18px;
  }

  .stat-value {
    font-size: 1.45rem;
  }
}
</style>