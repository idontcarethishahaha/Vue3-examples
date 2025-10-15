import axios from '@/axios'
import { useCollegeStore } from '@/stores/CollegeStore'
import { useMajorStore } from '@/stores/MajorStore'
import type { RegisterRequest } from '@/types'
import { StoreCache, StoreMapCache } from './Decorators'

const collegeStore = useCollegeStore()
const majorStore = useMajorStore()

// 定义表单验证结果的类型
interface ValidationResult {
  isValid: boolean
  message: string
}

// 定义用于验证的表单数据类型
interface RegisterFormData {
  account?: string
  name?: string
  tel?: string
  password?: string
  collegeId?: string
  majorId?: string
}

export class StudentService {
  /**
   * 获取所有学院列表（带缓存）
   */
  @StoreCache(collegeStore.collegesS)
  static async getColleges() {
    const response = await axios.get('/open/colleges')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '加载学院列表失败')
  }

  /**
   * 根据学院ID获取专业列表（带缓存）
   */
  @StoreMapCache(majorStore.majorsMapS, [0]) // [0] 表示使用第一个参数 collegeId 作为key
  static async getMajorsByCollege(collegeId: string) {
    const response = await axios.get(`/open/colleges/${collegeId}/majors`)
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '加载专业列表失败')
  }

  /**
   * 强制刷新学院列表（忽略缓存）
   */
  @StoreCache(collegeStore.collegesS, true)
  static async refreshColleges() {
    const response = await axios.get('/open/colleges')
    if (response.data.code === 200) {
      return response.data.data || []
    }
    throw new Error(response.data.message || '刷新学院列表失败')
  }

  /**
   * 强制刷新专业列表（忽略缓存）
   */
  static async refreshMajorsByCollege(collegeId: string) {
    // 先清除缓存
    majorStore.clearMajorsByCollege(collegeId)
    // 重新获取
    return this.getMajorsByCollege(collegeId)
  }

  /**
   * 学生注册
   */
  static async register(studentData: RegisterRequest): Promise<void> {
    const response = await axios.post('/open/register', studentData)
    if (response.data.code !== 200) {
      throw new Error(response.data.message || '注册失败')
    }
  }

  /**
   * 验证注册表单
   */
  static validateRegisterForm(form: RegisterFormData): ValidationResult {
    if (
      !form.account?.trim() ||
      !form.name?.trim() ||
      !form.tel?.trim() ||
      !form.password ||
      !form.collegeId ||
      !form.majorId
    ) {
      return { isValid: false, message: '请填写所有必填字段' }
    }

    const telRegex = /^1[3-9]\d{9}$/
    if (!telRegex.test(form.tel)) {
      return { isValid: false, message: '请输入正确格式的手机号' }
    }

    if (form.password.length < 6) {
      return { isValid: false, message: '密码长度至少6位' }
    }

    return { isValid: true, message: '' }
  }

  /**
   * 清除学院缓存
   */
  static clearCollegeCache(): void {
    collegeStore.clearColleges()
  }

  /**
   * 清除专业缓存
   */
  static clearMajorCache(): void {
    majorStore.clearMajors()
  }

  /**
   * 清除指定学院的专业缓存
   */
  static clearMajorCacheByCollege(collegeId: string): void {
    majorStore.clearMajorsByCollege(collegeId)
  }
}
