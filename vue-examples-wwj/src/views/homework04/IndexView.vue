<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from './loading'
import { listCoursesService } from './service'
import type { Course } from './type'

const coursesR = ref<Course[]>([])

const fetchCourses = async () => {
  const loading = createLoading()
  try {
    coursesR.value = await listCoursesService()
  } finally {
    loading.close()
  }
}
</script>

<template>
  <div>
    <h1>Homework-函数式全屏Loading遮罩组件</h1>
    <div class="demo-area">
      <button @click="fetchCourses" class="fetch-btn">获取课程数据 (模拟4秒请求)</button>
      <ul v-if="coursesR.length">
        <li v-for="course of coursesR" :key="course.id">
          {{ course.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.fetch-btn {
  padding: 10px 10px;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.fetch-btn:hover {
  background-color: #2980b9;
}
</style>
