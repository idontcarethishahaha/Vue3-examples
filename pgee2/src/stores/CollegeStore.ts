import type { College } from '@/types'
import { shallowRef } from 'vue'

const collegesS = shallowRef<College[] | undefined>([])

// 设置学院列表
const setColleges = (colleges: College[]): void => {
  collegesS.value = colleges
}

// 添加学院到列表
const addCollege = (college: College): void => {
  if (!collegesS.value) {
    collegesS.value = []
  }
  collegesS.value.push(college)
}

// 更新学院信息
const updateCollege = (collegeId: string, collegeData: Partial<College>): void => {
  if (collegesS.value) {
    const index = collegesS.value.findIndex(college => college.id === collegeId)
    if (index !== -1) {
      collegesS.value[index] = { ...collegesS.value[index], ...collegeData }
    }
  }
}

// 删除学院
const removeCollege = (collegeId: string): void => {
  if (collegesS.value) {
    collegesS.value = collegesS.value.filter(college => college.id !== collegeId)
  }
}

// 清空学院列表（清除缓存）
const clearColleges = (): void => {
  collegesS.value = undefined
}

// 根据ID获取学院
const getCollegeById = (collegeId: string): College | undefined => {
  return collegesS.value?.find(college => college.id === collegeId)
}

const store = {
  collegesS,
  setColleges,
  addCollege,
  updateCollege,
  removeCollege,
  clearColleges,
  getCollegeById
}

export const useCollegeStore = () => {
  return store
}
