import { usePost } from '@/axios'

export interface LoginRequest {
  account: string
  password: string
}

export interface UserInfo {
  id: number
  account: string
  name: string
}

export const login = (data: LoginRequest) => {
  return usePost<UserInfo>('/open/login', data)
}
