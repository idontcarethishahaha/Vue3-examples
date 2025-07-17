<script setup lang="ts">
import { listCourses } from '@/datasource/DataSource'
import type { Course } from '@/datasource/Types'
import { computed, ref } from 'vue'

const courses: Course[] = listCourses().sort((a, b) => a.term - b.term)

const selectedCoursesR = ref<Course[]>([])

const maxScore = 12

const selectedCoursesInfo = computed(() => {
  const sortedCourses = [...selectedCoursesR.value].sort((a, b) => a.term - b.term)
  const totalScore = sortedCourses.reduce((sum, course) => sum + course.credit, 0)
  return { sortedCourses, totalScore }
})
</script>

<template>
  <div>
    <div class="header">
      <div
        class="score-display"
        :style="{ color: selectedCoursesInfo.totalScore >= maxScore ? 'green' : 'red' }">
        {{ selectedCoursesInfo.totalScore }}/{{ maxScore }}
      </div>
    </div>
    <div class="courses">
      <div class="left">
        <h2>这是你可以选的课~</h2>
        <div v-for="course in courses" :key="course.id">
          <label>
            <input type="checkbox" :value="course" v-model="selectedCoursesR" />
            {{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)
          </label>
        </div>
      </div>
      <div class="right">
        <h2>这是你选好的课~</h2>
        <div v-for="course in selectedCoursesInfo.sortedCourses" :key="course.id">
          <label>
            <input type="checkbox" :value="course" v-model="selectedCoursesR" />
            {{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 20px;
}

.score-display {
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
}

.courses {
  display: flex;
  gap: 20px;
}

.left {
  flex: 1;
  border: 1px solid #ccc;
  padding: 15px;
}

.right {
  flex: 1;
  border: 1px solid #ccc;
  padding: 15px;
}
</style>
