import { usePost } from '@/api'

export interface LoginRequest {
  account: string
  password: string
}

export interface UserInfo {
  id: number
  account: string
  name: string
  // 其他用户信息字段
}

export const login = (data: LoginRequest) => {
  return usePost<UserInfo>('/open/login', data)
}
