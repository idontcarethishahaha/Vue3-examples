import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import type { Course } from './type'

export const useExample09Store = createGlobalState(() => {
  const coursesS = ref<Course[]>([])
  return { coursesS }
})
