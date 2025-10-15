import { usePost } from '@/axios'

export interface ResultVO<T = unknown> {
  code: number
  message: string
  data: T
}

export interface User {
  id: string
  name: string
  collegeId?: string
  account: string
  password?: string
  role: string
  tel: string
  createTime?: string
  updateTime?: string
}

export interface StudentInfo {
  id: string
  userId: string
  majorId: string
  createTime?: string
  updateTime?: string
}

//注册请求
export interface RegisterRequest {
  account: string
  name: string
  tel: string
  password: string
  collegeId: string
  majorId: string
}

//登录请求
export interface LoginRequest {
  account: string
  password: string
}

//登录响应
export interface LoginResponse {
  user: User
  token: string
  role: string
}

export interface CounselorInfo {
  id: string
  userId: string
  majorCategoryId: string
  createTime?: string
  updateTime?: string
}

export interface College {
  id: string
  name: string
  createTime?: string
  updateTime?: string
}

export interface Major {
  id: string
  name: string
  collegeId: string
  createTime?: string
  updateTime?: string
}

export interface CollegeAddDTO {
  name: string
}

export interface CollegeUpdateDTO {
  name: string
}

//学院管理员
export interface CollegeAdmin {
  id: string
  name: string
  account: string
  password?: string
  tel: string
  createTime?: string
  updateTime?: string
}

//添加学院管理员
export interface CollegeAdminAddDTO {
  name: string
  account: string
  tel: string
  password?: string
}

export interface UserInfo {
  id: number
  account: string
  name: string
}

export const login = (data: LoginRequest) => {
  return usePost<UserInfo>('/open/login', data)
}
