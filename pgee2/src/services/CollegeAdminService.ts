import axios from '@/axios'
import { createMessageDialog } from '@/components/message'
import { useCollegeAdminStore } from '@/stores/CollegeAdminStore'
import type { CollegeAdminAddDTO, ResultVO, User } from '@/types'
import { StoreClear, StoreMapCache } from './Decorators'

const collegeAdminStore = useCollegeAdminStore()

export class CollegeAdminService {
  //获取学院管理员列表
  @StoreMapCache(collegeAdminStore.collegeAdminsMapS, [0]) // [0] 表示使用第一个参数 collegeId 作为key
  static async getCollegeAdmins(collegeId: string) {
    const response = await axios.get<ResultVO<User[]>>(`/admin/colleges/${collegeId}/collegeadmins`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '加载管理员列表失败')
  }

  //强制刷新管理员列表（忽略缓存）
  static async refreshCollegeAdmins(collegeId: string): Promise<User[]> {
    // 先清除缓存
    collegeAdminStore.clearCollegeAdminsByCollege(collegeId)
    // 重新获取
    return this.getCollegeAdmins(collegeId)
  }

  //添加学院管理员（清除缓存）
  @StoreClear(() => collegeAdminStore.clearCollegeAdmins())
  static async addCollegeAdmin(collegeId: string, adminData: CollegeAdminAddDTO): Promise<void> {
    const response = await axios.post<ResultVO<User>>(
      `/admin/colleges/${collegeId}/collegeadmins`,
      adminData
    )
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '添加管理员失败')
    }
    createMessageDialog('添加成功')
    // 清除缓存后，下次调用 getCollegeAdmins 会自动重新加载
  }

  //重置用户密码
  static async resetPassword(userAccount: string): Promise<void> {
    const response = await axios.put<ResultVO<void>>(`/admin/users/${userAccount}/password`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '重置密码失败')
    }
    createMessageDialog('重置密码成功')
  }

  /**
   * 移除学院管理员（清除缓存）
   */
  @StoreClear(() => collegeAdminStore.clearCollegeAdmins())
  static async removeCollegeAdmin(collegeId: string, userId: string): Promise<void> {
    const confirmed = await this.confirmAction('确定要移除该管理员吗？')
    if (!confirmed) return

    const response = await axios.delete<ResultVO<void>>(
      `/admin/colleges/${collegeId}/collegeadmins/${userId}`
    )
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '移除管理员失败')
    }
    createMessageDialog('移除成功')
    // 清除缓存后，下次调用 getCollegeAdmins 会自动重新加载
  }

  // 验证管理员表单
  static validateAdminForm(form: { name: string; account: string; tel?: string }): {
    isValid: boolean
    message: string
  } {
    if (!form.name?.trim()) {
      return { isValid: false, message: '请输入姓名' }
    }
    if (!form.account?.trim()) {
      return { isValid: false, message: '请输入账号' }
    }
    if (form.tel && !/^1[3-9]\d{9}$/.test(form.tel)) {
      return { isValid: false, message: '请输入正确的手机号格式' }
    }
    return { isValid: true, message: '' }
  }

  //清除管理员缓存
  static clearAdminCache(): void {
    collegeAdminStore.clearCollegeAdmins()
  }

  //清除指定学院的管理员缓存
  static clearAdminCacheByCollege(collegeId: string): void {
    collegeAdminStore.clearCollegeAdminsByCollege(collegeId)
  }

  //确认对话框
  private static confirmAction(message: string): Promise<boolean> {
    return Promise.resolve(window.confirm(message))
  }
}
