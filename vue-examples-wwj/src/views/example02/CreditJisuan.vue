<script setup lang="ts">
import { listCourses } from '@/datasource/DataSource'
import type { Course } from '@/datasource/Types'
import { computed, ref, watch } from 'vue'

const courses: Course[] = listCourses()

const checkedCourseidsR = ref<number[]>([])

const checkedCourses = computed(() =>
  courses.filter(course => checkedCourseidsR.value.includes(course.id))
)

const totalScore = computed(() =>
  checkedCourses.value.reduce((sum, course) => sum + course.credit, 0)
)

const maxScore = 12

const sortedCheckedCourses = computed(() =>
  [...checkedCourses.value].sort((a, b) => a.term - b.term)
)

watch(checkedCourseidsR, (newIds, oldIds) => {
  const addedIds = newIds.filter(id => !oldIds.includes(id))
  const removedIds = oldIds.filter(id => !newIds.includes(id))

  if (addedIds.length > 0) {
    const addedNames = addedIds.map(id => courses.find(c => c.id === id)?.name || '无')
    console.log(`新增课程: ${addedNames}`)
  }

  if (removedIds.length > 0) {
    const removedNames = removedIds.map(id => courses.find(c => c.id === id)?.name || '无')
    console.log(`移除课程: ${removedNames}`)
  }
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
        <div v-for="course in courses.filter(c => c.term === term)" :key="course.id">
          <label>
            <input type="checkbox" :value="course.id" v-model="checkedCourseidsR" />
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
