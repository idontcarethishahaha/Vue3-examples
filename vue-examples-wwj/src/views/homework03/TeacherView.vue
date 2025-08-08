<script setup lang="ts">
import { ref } from 'vue'
import CourseTable from './CourseTable.vue'
import { listCourses } from './service'
import type { Course } from './type'

const courses = listCourses()
const selectedCourse = ref<Course | null>(null)

const handleSelectCourse = (course: Course) => {
  selectedCourse.value = course
}
</script>

<template>
  <div class="teacher-view">
    <h2>教师视图 - 课程管理</h2>
    <p>
      选择的课程：
      <span class="selected-course">{{ selectedCourse?.name || '未选择' }}</span>
    </p>

    <CourseTable :courses="courses">
      <template #title>
        <th>操作</th>
      </template>
      <template #action="row">
        <td>
          <button class="edit-btn" @click="handleSelectCourse(row.course)">编辑</button>
        </td>
      </template>
    </CourseTable>
  </div>
</template>

<style scoped>
.teacher-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.selected-course {
  color: #dc2626;
  font-weight: 600;
}

.edit-btn {
  padding: 0.25rem 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #2563eb;
}
</style>