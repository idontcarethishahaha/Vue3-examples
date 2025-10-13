//后端返回的统一响应格式
export interface ResultVO<T = unknown> {
  code: number
  number: number
  message: string
  data: T
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
  id: string
  name: string
  code?: string
}

//专业类型
export interface Major {
  id: string
  name: string
  collegeId?: string
  code?: string
}

//用户信息
export interface UserInfo {
  id: string
  account: string
  name: string
  role?: string
}

//注册请求参数
export interface RegisterRequest {
  account: string
  name: string
  tel: string
  password: string
  collegeId: string
  majorId: string
}

//登录请求参数
export interface LoginRequest {
  account: string
  password: string
}

//从当前目录下的admin.ts文件中导入所有导出内容
export * from './admin'
