<script setup lang="ts">
import type { Course } from './type'

const props = defineProps<{ courses: Course[] }>()
</script>

<template>
  <table class="course-table" border>
    <tr>
      <th>#</th>
      <th>课程名称</th>
      <slot name="title"></slot>
    </tr>
    <tr v-for="(course, index) of props.courses" :key="course.id" class="course-row">
      <td>{{ index + 1 }}</td>
      <td>{{ course.name }}</td>
      <slot name="action" :course="course"></slot>
    </tr>
  </table>
</template>

<style scoped>
.course-table {
  width: 600px;
  border-collapse: collapse;
  margin: 0;
  border: 1px solid #ccc;
}
.course-row:hover {
  background-color: #ccc;
}
</style>
