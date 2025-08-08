<script setup lang="ts">
import StudentView from './StudentView.vue'
import TeacherView from './TeacherView.vue'
</script>

<template>
  <div class="homework-container">
    <h1>Homework - Slot插槽应用</h1>
    <div class="views-container">
      <TeacherView />
      <hr class="divider" />
      <StudentView />
    </div>
  </div>
</template>

<style scoped>
.homework-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 2rem;
}

.views-container {
  gap: 2rem;
}

.divider {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #e2e8f0;
}
</style>
