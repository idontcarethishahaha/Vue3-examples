<script setup lang="ts">
import { computed, ref } from 'vue'
interface Course {
  id: number
  name: string
  credit: number
  term: number
  checked: boolean
}

const courses = ref<Course[]>([
  { id: 1, name: 'Web开发技术', credit: 2.5, term: 4, checked: false },
  { id: 2, name: 'C++程序设计', credit: 2.5, term: 4, checked: false },
  { id: 3, name: 'Java程序设计', credit: 2.5, term: 4, checked: false },
  { id: 4, name: '计算机学生的自我修养：从入门到入土', credit: 2, term: 4, checked: false },
  { id: 5, name: 'Web前端开发技术', credit: 2, term: 5, checked: false },
  { id: 6, name: 'Web系统框架', credit: 2.5, term: 5, checked: false },
  { id: 7, name: 'XML与WebService技术', credit: 2, term: 5, checked: false },
  { id: 8, name: '数字图像处理', credit: 2, term: 5, checked: false },
  { id: 9, name: '企业资源计划', credit: 2, term: 6, checked: false },
  { id: 10, name: '服务科学与SOA', credit: 2, term: 6, checked: false },
  { id: 11, name: '人工智能导论', credit: 2, term: 6, checked: false },
  { id: 12, name: '机器学习', credit: 2, term: 6, checked: false }
])

const checkedCourses = computed(() => courses.value.filter(course => course.checked))

const totalScore = computed(() => {
  let total = 0
  checkedCourses.value.forEach(course => {
    total += course.credit
  })
  return total
})

const maxScore = 12

const sortedCheckedCourses = computed(() => {
  return [...checkedCourses.value].sort((a, b) => a.term - b.term)
})
</script>

<template>
  <div class="container">
    <div class="score-dispaly" :style="{ color: totalScore >= 12 ? 'green' : 'red' }">
      {{ totalScore }}/{{ maxScore }}
    </div>

    <div class="left">
      <h2>这是你可以选的课~</h2>
      <div v-for="term in [4, 5, 6]" :key="term">
        <h3>第{{ term }}学期</h3>
        <div v-for="course in courses.filter(course => course.term === term)" :key="course.id">
          <label>
            <input type="checkbox" v-model="course.checked" />
            {{ course.name }} ({{ course.credit }}学分)
          </label>
        </div>
      </div>
    </div>

    <div class="right">
      <h2>这是你选好的课~</h2>
      <div v-for="course in sortedCheckedCourses" :key="course.id">
        <p>第{{ course.term }}学期-{{ course.name }} ({{ course.credit }}学分)</p>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  padding: 20px;
  position: relative;
}

.score-dispaly {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  top: 20px;
  left: 20px;
}
.left {
  flex: 1;
  margin-top: 40px;
  border-right: 1px solid #ccc;
  padding-right: 20px;
}

.right {
  flex: 1;
  margin-top: 40px;
  padding-left: 20px;
}
</style>
