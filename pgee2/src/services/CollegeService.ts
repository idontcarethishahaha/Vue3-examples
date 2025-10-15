import axios from '@/axios'
import { createMessageDialog } from '@/components/message'
import { useCollegeStore } from '@/stores/CollegeStore'
import type { College, CollegeAddDTO, CollegeUpdateDTO, ResultVO } from '@/types'
import { StoreCache, StoreClear } from './Decorators'
import { UserService } from './index'

const collegeStore = useCollegeStore()

export class CollegeService {
  //初始化学院管理（包含权限检查和数据加载）
  static async initCollegeManagement(): Promise<boolean> {
    console.log('组件挂载，开始检查登录状态...')
    if (!UserService.isLoggedIn()) {
      return false
    }

    console.log('登录状态验证通过，开始加载学院列表...')
    await this.loadColleges()
    return true
  }

  //加载学院列表
  @StoreCache(collegeStore.collegesS)
  static async loadColleges() {
    console.log('开始加载学院列表...')
    const response = await axios.get<ResultVO<College[]>>('/admin/colleges')

    if (response.data.code === 200) {
      const colleges = response.data.data || []
      console.log('成功加载学院数量:', colleges.length)
      return colleges
    } else {
      throw new Error(response.data.message || '加载学院列表失败')
    }
  }

  //强制刷新学院列表（忽略缓存）
  @StoreCache(collegeStore.collegesS, true)
  static async refreshColleges() {
    console.log('强制刷新学院列表...')
    const response = await axios.get<ResultVO<College[]>>('/admin/colleges')

    if (response.data.code === 200) {
      const colleges = response.data.data || []
      console.log('成功刷新学院数量:', colleges.length)
      return colleges
    } else {
      throw new Error(response.data.message || '刷新学院列表失败')
    }
  }

  //添加学院（清除缓存后重新加载）
  @StoreClear(collegeStore.clearColleges)
  static async addCollege(collegeData: CollegeAddDTO): Promise<void> {
    const response = await axios.post<ResultVO<College>>('/admin/colleges', collegeData)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '添加学院失败')
    }
    createMessageDialog('添加成功')
    // 清除缓存后会自动重新加载
  }

  //更新学院（更新本地缓存）
  static async updateCollege(collegeId: string, collegeData: CollegeUpdateDTO): Promise<void> {
    const response = await axios.put<ResultVO<College>>(`/admin/colleges/${collegeId}`, collegeData)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '更新学院失败')
    }
    // 直接更新本地缓存，避免重新加载
    collegeStore.updateCollege(collegeId, { name: collegeData.name })
    createMessageDialog('更新成功')
  }

  //删除学院（清除缓存后重新加载）
  @StoreClear(collegeStore.clearColleges)
  static async deleteCollege(college: College): Promise<void> {
    const confirmed = await this.confirmAction(
      `确定要删除学院 "${college.name}" 吗？此操作不可恢复！`
    )
    if (!confirmed) return

    try {
      const response = await axios.delete<ResultVO<void>>(`/admin/colleges/${college.id}`)
      if (response.data.code !== 200) {
        throw new Error(response.data.message || '删除学院失败')
      }
      createMessageDialog('删除成功')
      // 清除缓存后会自动重新加载
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '删除学院失败'
      createMessageDialog(message)
    }
  }

  //验证学院表单
  static validateCollegeForm(form: { name: string }): { isValid: boolean; message: string } {
    if (!form.name?.trim()) {
      return { isValid: false, message: '请输入学院名称' }
    }
    return { isValid: true, message: '' }
  }

  //清除学院缓存
  static clearCollegeCache(): void {
    collegeStore.clearColleges()
  }

  //确认对话框
  private static confirmAction(message: string): Promise<boolean> {
    return Promise.resolve(window.confirm(message))
  }
}
