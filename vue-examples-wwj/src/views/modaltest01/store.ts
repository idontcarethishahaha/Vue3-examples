import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import type { Course } from './type.ts'

export const useExample09Store = createGlobalState(() => {
  const coursesS = ref<Course[]>([])
  return { coursesS }
})
