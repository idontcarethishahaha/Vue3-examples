/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from '@/types'
import { shallowRef } from 'vue'

// 使用Map存储不同学院的管理员列表，key为学院ID
const collegeAdminsMapS = shallowRef<any>(new Map())

// 设置学院的管理员列表
const setCollegeAdmins = (collegeId: string, admins: User[]): void => {
  collegeAdminsMapS.value.set(collegeId, admins)
}

// 获取学院的管理员列表
const getCollegeAdmins = (collegeId: string): User[] | undefined => {
  return collegeAdminsMapS.value.get(collegeId)
}

// 添加管理员到学院
const addCollegeAdmin = (collegeId: string, admin: User): void => {
  const admins = collegeAdminsMapS.value.get(collegeId) || []
  admins.push(admin)
  collegeAdminsMapS.value.set(collegeId, admins)
}

// 从学院移除管理员
const removeCollegeAdmin = (collegeId: string, userId: string): void => {
  const admins = collegeAdminsMapS.value.get(collegeId)
  if (admins) {
    const filteredAdmins = admins.filter((admin: User) => admin.id !== userId)
    collegeAdminsMapS.value.set(collegeId, filteredAdmins)
  }
}

// 清空管理员缓存
const clearCollegeAdmins = (): void => {
  collegeAdminsMapS.value.clear()
}

// 清空指定学院的管理员缓存
const clearCollegeAdminsByCollege = (collegeId: string): void => {
  collegeAdminsMapS.value.delete(collegeId)
}

const store = {
  collegeAdminsMapS,
  setCollegeAdmins,
  getCollegeAdmins,
  addCollegeAdmin,
  removeCollegeAdmin,
  clearCollegeAdmins,
  clearCollegeAdminsByCollege
}

export const useCollegeAdminStore = () => {
  return store
}
