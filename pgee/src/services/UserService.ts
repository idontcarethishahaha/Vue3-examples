// services/UserService.ts
import axios from '@/axios'
import router from '@/router'
import type { LoginRequest, ResultVO, User } from '@/types'
import { ADMIN, COLLEGE_ADMIN, COUNSELOR, ROUTE_PATHS, STUDENT } from './Const'

export class UserService {
  /**
   * 登录服务
   */
  static async loginService(loginData: LoginRequest): Promise<void> {
    const resp = await axios.post<ResultVO<User>>('/open/login', loginData)
    const user = resp.data.data
    const token = resp.headers.token
    const role = resp.headers.role

    if (!user || !token || !role) {
      throw new Error('登录错误：缺少必要信息')
    }

    // 存储token和用户信息到 localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)
    localStorage.setItem('user', JSON.stringify(user))

    console.log('登录成功:', { user, token, role })

    // 根据角色跳转不同页面
    let path = ''
    switch (role) {
      case ADMIN:
        path = ROUTE_PATHS.ADMIN
        break
      case COLLEGE_ADMIN:
        path = ROUTE_PATHS.COLLEGE_ADMIN
        break
      case COUNSELOR:
        path = ROUTE_PATHS.COUNSELOR
        break
      case STUDENT:
        path = ROUTE_PATHS.STUDENT
        break
      default:
        throw new Error('未知用户角色: ' + role)
    }

    await router.push(path)
  }

  /**
   * 获取当前用户信息
   */
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  }

  /**
   * 获取当前用户角色
   */
  static getRole(): string | null {
    return localStorage.getItem('role')
  }

  /**
   * 获取 token
   */
  static getToken(): string | null {
    return localStorage.getItem('token')
  }

  /**
   * 检查是否已登录
   */
  static isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  /**
   * 退出登录
   */
  static logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    router.push('/login')
  }

  /**
   * 验证登录表单
   */
  static validateLoginForm(form: LoginRequest): { isValid: boolean; message: string } {
    if (!form.account?.trim() || !form.password?.trim()) {
      return { isValid: false, message: '请输入账号和密码' }
    }
    return { isValid: true, message: '' }
  }
}
