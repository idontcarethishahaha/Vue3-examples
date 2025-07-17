<script setup lang="ts">
import { ref, watch } from 'vue'

const days = [
  { value: 1, label: '星期一' },
  { value: 2, label: '星期二' },
  { value: 3, label: '星期三' },
  { value: 4, label: '星期四' },
  { value: 5, label: '星期五' },
  { value: 6, label: '星期六' },
  { value: 7, label: '星期日' }
]

const isWeekdayR = ref(false)
const isWeekendR = ref(false)

const selectedDaysR = ref<number[]>([])

const WeekdayChange = () => {
  const weekdayValues = [1, 2, 3, 4, 5]
  if (isWeekdayR.value) {
    selectedDaysR.value = [...new Set([...selectedDaysR.value, ...weekdayValues])]
  } else {
    selectedDaysR.value = selectedDaysR.value.filter(day => day > 5)
  }
}

const WeekendChange = () => {
  const weekendValues = [6, 7]
  if (isWeekendR.value) {
    selectedDaysR.value = [...new Set([...selectedDaysR.value, ...weekendValues])]
  } else {
    selectedDaysR.value = selectedDaysR.value.filter(day => day < 6)
  }
}

const singleDayChange = () => {
  const weekdayValues = [1, 2, 3, 4, 5]
  const weekendValues = [6, 7]

  isWeekdayR.value = weekdayValues.every(day => selectedDaysR.value.includes(day))
  isWeekendR.value = weekendValues.every(day => selectedDaysR.value.includes(day))
}

watch(selectedDaysR, newVal => {
  console.log('已选', newVal)
})
</script>

<template>
  <div>
    <h2>Week</h2>
    <div>
      <label>
        <input type="checkbox" v-model="isWeekdayR" @change="WeekdayChange" />
        工作日|
      </label>

      <label>
        <input type="checkbox" v-model="isWeekendR" @change="WeekendChange" />
        周末
      </label>
    </div>
    <div>
      <label v-for="day in days" :key="day.value">
        <input
          type="checkbox"
          v-model="selectedDaysR"
          :value="day.value"
          @change="singleDayChange" />
        {{ day.label }}|
      </label>
    </div>
  </div>
</template>

<style scoped></style>
