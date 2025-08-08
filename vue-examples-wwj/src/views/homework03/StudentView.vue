<script setup lang="ts">
import CourseTable from './CourseTable.vue'
import { listCourses } from './service'
import type { Course } from './type' // 确保导入 Course 类型

// 调用接口并推导类型（若 service 返回 Course[]，可直接用）
const courses = listCourses() as Course[] 
</script>

<template>
  <div class="student-view">
    <h2>学生视图 - 课程列表</h2>
    <!-- courses 类型匹配，插槽名称正确 -->
    <CourseTable :courses="courses">
      <template #title></template>
      <template #action></template>
    </CourseTable>
  </div>
</template>

<style scoped>
.student-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>