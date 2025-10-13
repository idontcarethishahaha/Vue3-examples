// services/CollegeService.ts
import axios from '@/axios'
import type { College, ResultVO } from '@/types'
import type { AddCollegeRequest, UpdateCollegeRequest } from '@/types/admin'

export class CollegeService {
  // 确保有 export
  /**
   * 获取所有学院列表
   */
  static async getColleges(): Promise<College[]> {
    const response = await axios.get<ResultVO<College[]>>('/admin/colleges')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '加载学院列表失败')
  }

  /**
   * 添加学院
   */
  static async addCollege(collegeData: AddCollegeRequest): Promise<void> {
    const response = await axios.post<ResultVO<College>>('/admin/colleges', collegeData)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '添加学院失败')
    }
  }

  /**
   * 更新学院
   */
  static async updateCollege(collegeId: string, collegeData: UpdateCollegeRequest): Promise<void> {
    const response = await axios.put<ResultVO<College>>(`/admin/colleges/${collegeId}`, collegeData)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '更新学院失败')
    }
  }

  /**
   * 删除学院
   */
  static async deleteCollege(collegeId: string): Promise<void> {
    const response = await axios.delete<ResultVO<void>>(`/admin/colleges/${collegeId}`)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '删除学院失败')
    }
  }

  /**
   * 验证学院表单
   */
  static validateCollegeForm(form: { name: string }): { isValid: boolean; message: string } {
    if (!form.name?.trim()) {
      return { isValid: false, message: '请输入学院名称' }
    }
    return { isValid: true, message: '' }
  }
}
