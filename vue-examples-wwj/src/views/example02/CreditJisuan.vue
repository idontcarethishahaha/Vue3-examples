<script setup lang="ts">
import { listCourses } from '@/datasource/DataSource'
import type { Course } from '@/datasource/Types'
import { computed, ref, watch } from 'vue'

const courses: Course[] = listCourses().sort((a, b) => a.term - b.term)

const selectedCoursesR = ref<Course[]>([])

const totalScoreC = computed(() =>
  selectedCoursesR.value.reduce((sum, course) => sum + course.credit, 0)
)

const maxScore = 12

watch(selectedCoursesR, newCourses => {
  selectedCoursesR.value = newCourses.sort((a, b) => a.term - b.term)
})
</script>

<template>
  <div class="container">
    <div class="score-dispaly" :style="{ color: totalScoreC >= 12 ? 'green' : 'red' }">
      {{ totalScoreC }}/{{ maxScore }}
    </div>
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
      <div v-for="course in selectedCoursesR" :key="course.id">
        <p>{{ course.name }} - ({{ course.term }}) ({{ course.credit }}学分)</p>
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
