import type { Major } from '@/types'
import { shallowRef } from 'vue'

// 使用Map存储不同学院的专业列表，key为学院ID
const majorsMapS = shallowRef<Map<string, Major[]>>(new Map())

// 设置学院的专业列表
const setMajors = (collegeId: string, majors: Major[]): void => {
  majorsMapS.value.set(collegeId, majors)
}

// 获取学院的专业列表
const getMajors = (collegeId: string): Major[] | undefined => {
  return majorsMapS.value.get(collegeId)
}

// 添加专业到学院
const addMajor = (collegeId: string, major: Major): void => {
  const majors = majorsMapS.value.get(collegeId) || []
  majors.push(major)
  majorsMapS.value.set(collegeId, majors)
}

// 更新专业信息
const updateMajor = (collegeId: string, majorId: string, majorData: Partial<Major>): void => {
  const majors = majorsMapS.value.get(collegeId)
  if (majors) {
    const index = majors.findIndex(major => major.id === majorId)
    if (index !== -1) {
      majors[index] = { ...majors[index], ...majorData }
    }
  }
}

// 删除专业
const removeMajor = (collegeId: string, majorId: string): void => {
  const majors = majorsMapS.value.get(collegeId)
  if (majors) {
    const filteredMajors = majors.filter(major => major.id !== majorId)
    majorsMapS.value.set(collegeId, filteredMajors)
  }
}

// 清空专业缓存
const clearMajors = (): void => {
  majorsMapS.value.clear()
}

// 清空指定学院的专业缓存
const clearMajorsByCollege = (collegeId: string): void => {
  majorsMapS.value.delete(collegeId)
}

const store = {
  majorsMapS,
  setMajors,
  getMajors,
  addMajor,
  updateMajor,
  removeMajor,
  clearMajors,
  clearMajorsByCollege
}

export const useMajorStore = () => {
  return store
}
