<script setup lang="ts">
import { ref } from 'vue'
import { createLoading } from './loading'
import { listCoursesService } from './service'
import type { Course } from './type'

const coursesR = ref<Course[]>([])

const listCoursesF = async () => {
  // 显示 Loading
  const loading = createLoading()

  try {
    coursesR.value = await listCoursesService()
  } finally {
    // 无论成功/失败，关闭 Loading
    loading.close()
  }
}
</script>

<template>
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
