<script setup lang="ts">
import type { Course } from './type'

// 定义所有插槽类型：title（无参数）、action（传 course）

defineSlots<{
  // 明确是“任意对象”类型（无实际参数时更语义化）
  title: (props: object) => void
  action: (props: { course: Course }) => void
}>()

// 定义 props 类型
defineProps<{
  courses: Course[]
}>()
</script>

<template>
  <table class="course-table">
    <tr>
      <th>#</th>
      <th>课程名称</th>
      <slot name="title"></slot>
    </tr>
    <tr v-for="(course, index) of courses" :key="course.id || index" class="course-row">
      <td>{{ index + 1 }}</td>
      <td>{{ course.name }}</td>
      <slot name="action" :course="course"></slot>
    </tr>
  </table>
</template>

<style scoped>
.course-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  border: 1px solid #e5e7eb;
}

.course-table th,
.course-table td {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.course-table th {
  background-color: #f9fafb;
  font-weight: 600;
}

.course-row:hover {
  background-color: #f3f4f6;
}
</style>
