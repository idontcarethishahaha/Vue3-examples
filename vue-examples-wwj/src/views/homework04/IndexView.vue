<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from './loading'
import { listCoursesService } from './service'
import type { Course } from './type'

const courses = ref<Course[]>([])

const listCoursesF = async () => {
  // 显示 Loading
  const loading = createLoading()

  try {
    courses.value = await listCoursesService()
  } catch (error) {
    console.error('Failed to fetch courses:', error)
  } finally {
    // 无论成功/失败，关闭 Loading
    loading.close()
  }
}
</script>

<template>
<<<<<<< HEAD
  <div>
    <h1>Homework - 函数式全屏 Loading 遮罩组件</h1>
    <p>
      网络异步数据请求时，无法确定数据响应时间，在没有提示的情况下会影响用户操作体验，甚至可能发生用户反复提交数据致使操作错误。因此，应设计友好的互交反馈指引用户操作。
    </p>
    <p>
      基于低耦合的函数式渲染，设计实现全屏 Loading
      遮罩组件，在请求前即时加载全屏遮罩提示用户请求进行中，并阻止用户其他操作行为；响应返回后，自动卸载遮罩。
    </p>
    <button @click="listCoursesF">异步请求数据，4s 响应后自动关闭全屏 Loading 遮罩</button>
    <ul>
      <li v-for="(c, index) of coursesR" :key="index">{{ c.name }}（ID：{{ c.id }}）</li>
    </ul>
  </div>
</template>
=======
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

>>>>>>> 8cb4115fa6cd7edb43a37e1362f181d3ee016cfd
