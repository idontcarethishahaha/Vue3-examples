<script setup lang="ts">
import { ref } from 'vue'
import CourseTable from './CourseTable.vue'
import { listCourses } from './service'
import type { Course } from './type'

const courses = listCourses()
const selectedCourse = ref<Course>()
const handleSelectCourse = (course: Course) => {
  selectedCourse.value = course
}
</script>

<template>
  <div class="teacher-view">
    <h2>教师视图</h2>
    <p>
      选择的课程：
      <span class="selected-courses">{{ selectedCourse?.name || '未选择' }}</span>
    </p>
    <CourseTable :courses="courses">
      <template #title>
        <th>操作</th>
      </template>
      <template #action="row">
        <td>
          <button @click="handleSelectCourse(row.course)">EDIT</button>
        </td>
      </template>
    </CourseTable>
  </div>
</template>

<style scoped>
.teacher-view {
  padding: 10px;
}
.selected-courses {
  font-weight: bold;
  color: red;
}
</style>
