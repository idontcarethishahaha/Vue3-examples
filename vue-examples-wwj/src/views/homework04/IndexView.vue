<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from './loading'
import { listCoursesService } from './service'
import type { Course } from './type'

const courses = ref<Course[]>([])

const fetchCourses = async () => {
  const loading = createLoading()

  try {
    courses.value = await listCoursesService()
  } catch (error) {
    console.error('Failed to fetch courses:', error)
  } finally {
    loading.close()
  }
}
</script>

<template>
  <div class="homework-container">
    <h1>函数式全屏Loading遮罩组件</h1>
    <div class="description">
      <p>网络异步数据请求时，无法确定数据响应时间，在没有提示的情况下会影响用户操作体验。</p>
      <p>基于低耦合的函数式渲染，实现全屏Loading遮罩组件，在请求前加载全屏遮罩，响应后自动卸载。</p>
    </div>

    <div class="demo-area">
      <button @click="fetchCourses" class="fetch-button">获取课程数据 (模拟4秒请求)</button>

      <ul v-if="courses.length" class="course-list">
        <li v-for="course in courses" :key="course.id" class="course-item">
          {{ course.name }} (ID: {{ course.id }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.homework-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  margin: 20px 0;
  color: #666;
}

.fetch-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.fetch-button:hover {
  background-color: #2980b9;
}

.course-list {
  margin-top: 20px;
  list-style: none;
  padding: 0;
}

.course-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.course-item:hover {
  background-color: #f5f5f5;
}
</style>

