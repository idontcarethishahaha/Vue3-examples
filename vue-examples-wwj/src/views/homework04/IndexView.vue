<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from './loading'
import { listCoursesService } from './service'
import type { Course } from './type'

const coursesR = ref<Course[]>([])

const listCoursesF = async () => {
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
    <button @click="listCoursesF" class="btn">异步请求数据,4s 响应后自动关闭全屏Loading遮罩</button>
    <ul>
      <li v-for="(c, index) of coursesR" :key="index">{{ c.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.btn {
  padding: 10px 20px;
  background-color: skyblue;
  color: white;
  /*outline: none;*/
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
</style>
