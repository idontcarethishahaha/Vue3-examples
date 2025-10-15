import type { User } from '@/types'
import { shallowRef } from 'vue'

// 从localStorage初始化用户数据
const userJson = localStorage.getItem('user')
const userS = shallowRef<User | null>(null)

if (userJson) {
  try {
    userS.value = JSON.parse(userJson)
  } catch (error) {
    console.error('解析用户数据失败:', error)
    localStorage.removeItem('user')
  }
}

// 设置用户信息、角色和token到存储
const setUserSessionStorage = (user: User, role: string, token: string): void => {
  userS.value = user
  localStorage.setItem('role', role)
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

// 清除用户信息、角色和token
const clearUser = (): void => {
  userS.value = null
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// 获取当前用户
const getCurrentUser = (): User | null => {
  return userS.value
}

// 获取当前用户角色
const getCurrentRole = (): string | null => {
  return localStorage.getItem('role')
}

// 获取token
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// 检查用户是否已登录
const isLoggedIn = (): boolean => {
  return !!getToken() && !!userS.value
}

const store = {
  userS,
  setUserSessionStorage,
  clearUser,
  getCurrentUser,
  getCurrentRole,
  getToken,
  isLoggedIn
}

export const useUserStore = () => {
  return store
}
