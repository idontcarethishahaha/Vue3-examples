<script setup lang="ts">
import { listCourses } from '@/datasource/DataSource'
import type { Course } from '@/datasource/Types'
import { ref, watch } from 'vue'

const coursesR = ref(listCourses().sort((a, b) => a.term - b.term))
const selectedCoursesR = ref<Course[]>([])
const maxScore = 12
const totalScoreR = ref(0)

watch(
  selectedCoursesR,
  newValue => {
    totalScoreR.value = newValue.reduce((sum, course) => sum + course.credit, 0)
    newValue.sort((a, b) => a.term - b.term)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div class="header">
      <div class="score-display" :style="{ color: totalScoreR >= maxScore ? 'green' : 'red' }">
        {{ totalScoreR }}/{{ maxScore }}
      </div>
    </div>

    <div class="courses">
      <div class="left">
        <h2>这是你可以选的课~</h2>
        <div v-for="course of coursesR" :key="course.id">
          <label>
            <input type="checkbox" :value="course" v-model="selectedCoursesR" />
            {{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)
          </label>
        </div>
      </div>

      <div class="right">
        <h2>这是你选好的课~</h2>
        <div v-for="course of selectedCoursesR" :key="course.id">
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
  margin-top: 20px;
}

.left,
.right {
  flex: 1;
  border: 1px solid #ccc;
  padding: 15px;
}
</style>
