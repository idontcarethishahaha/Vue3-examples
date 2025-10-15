import axios from '@/axios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import type { LoginRequest, ResultVO, User } from '@/types'
import { ADMIN, COLLEGE_ADMIN, COUNSELOR, ROUTE_PATHS, STUDENT } from './Const'

export * from './CollegeAdminService'
//export * from './CommonService'
export * from './CollegeService'
export * from './Const'
export * from './StudentService'
//export * from './UserService'

const userStore = useUserStore()

export class CommonService {
  /**
   * 检查管理员登录状态
   */
  static checkAdminLogin(): boolean {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    console.log('登录状态检查:', {
      token: token ? '存在' : '不存在',
      role
    })

    if (!token) {
      console.log('未找到token,跳转到登录页')
      router.push('/login')
      return false
    }

    if (role !== ADMIN) {
      console.log('角色不符，当前角色:', role, '，期望角色: ' + ADMIN)
      router.push('/login')
      return false
    }

    console.log('登录状态验证通过')
    return true
  }

  /**
   * 检查登录状态（通用）
   */
  static checkLogin(): boolean {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || !role) {
      router.push('/login')
      return false
    }

    return true
  }

  /**
   * 检查特定角色权限
   */
  static checkRole(allowedRoles: string[]): boolean {
    const role = localStorage.getItem('role')
    if (!role || !allowedRoles.includes(role)) {
      router.push('/login')
      return false
    }
    return true
  }

  /**
   * 获取当前用户角色
   */
  static getRole(): string | null {
    return localStorage.getItem('role')
  }

  /**
   * 退出登录
   */
  static logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    if (userStore) {
      userStore.clearUser()
    }
    router.push('/login')
  }

  /**
   * 更新密码
   */
  static async updateSelfPassword(password: string): Promise<void> {
    const response = await axios.put('/user/password', { password })
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '密码更新失败')
    }
  }
}

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

    // 使用 Store 管理用户状态
    const userStore = useUserStore()
    userStore.setUserSessionStorage(user, token, role)

    // 同时存储 token 到 localStorage（用于 API 请求）
    localStorage.setItem('token', token)

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
    const userStore = useUserStore()
    return userStore.getCurrentUser()
  }

  /**
   * 获取当前用户角色
   */
  static getRole(): string | null {
    const userStore = useUserStore()
    return userStore.getCurrentRole()
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
    const userStore = useUserStore()
    return userStore.isLoggedIn()
  }

  /**
   * 退出登录
   */
  static logout(): void {
    const userStore = useUserStore()
    userStore.clearUser()
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
