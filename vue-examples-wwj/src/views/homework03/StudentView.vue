<script setup lang="ts">
import CourseTable from './CourseTable.vue'
import { listCourses } from './service'
import type { Course } from './type'

const courses = listCourses() as Course[]
</script>

<template>
  <div class="stu-view">
    <h2>学生视图</h2>
    <CourseTable :courses="courses">
      <template #title></template>
      <template #action></template>
    </CourseTable>
  </div>
</template>

<style scoped>
.stu-view {
  padding: 10px;
}
</style>
