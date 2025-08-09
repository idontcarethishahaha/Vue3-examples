<script setup lang="ts">
import StudentView from './StudentView.vue'
import TeacherView from './TeacherView.vue'
</script>

<template>
  <div>
    <h1>Homework03-Slot插槽</h1>
    <div>
      <TeacherView />
      <hr />
      <StudentView />
    </div>
  </div>
</template>
