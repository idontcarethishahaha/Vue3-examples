//后端返回的统一响应格式
export interface ResultVO<T = unknown> {
  code: number
  message: string
  data: T
}

//用户信息
export interface UserInfo {
  id: number
  account: string
  name: string
  role?: string
}

//登录请求参数
export interface LoginRequest {
  account: string
  password: string
}

//通用响应
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  code?: number
}

//学院类型
export interface College {
  id: number
  name: string
  code?: string
}

//专业类型
export interface Major {
  id: number
  name: string
  collegeId?: number
  code?: string
}

//注册请求参数
export interface RegisterRequest {
  account: string
  name: string
  tel: string
  password: string
  collegeId: number
  majorId: number
}

export * from './admin'
