// types/index.ts
// 后端返回的统一响应格式
export interface ResultVO<T = unknown> {
  code: number
  number: number
  message: string
  data: T
}

// 通用响应
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

// 学院类型
export interface College {
  id: string
  name: string
  code?: string
}

// 专业类型
export interface Major {
  id: string
  name: string
  collegeId?: string
  code?: string
}

// 用户信息（根据后端 User 类）
export interface User {
  id: string
  name: string
  collegeId?: string
  account: string
  password?: string // 可选，因为前端通常不处理密码
  role: string
  tel?: string
  createTime?: string
  updateTime?: string
}

// 学生信息（根据后端 StudentInfo 类）
export interface StudentInfo {
  id: string
  userId: string
  majorId: string
  createTime?: string
  updateTime?: string
}

// 辅导员信息（根据后端 CounselorInfo 类）
export interface CounselorInfo {
  id: string
  userId: string
  majorCategoryId: string
  createTime?: string
  updateTime?: string
}

// 注册请求参数
export interface RegisterRequest {
  account: string
  name: string
  tel: string
  password: string
  collegeId: string
  majorId: string
}

// 登录请求参数
export interface LoginRequest {
  account: string
  password: string
}

// 登录响应（包含 token 和用户信息）
export interface LoginResponse {
  user: User
  token: string
  role: string
}

// 从当前目录下的admin.ts文件中导入所有导出内容
export * from './admin'
