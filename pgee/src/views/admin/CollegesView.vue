<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>学院管理系统</h1>
      <button @click="logout" class="logout-btn">退出登录</button>
    </div>

    <!-- 搜索和添加区域 -->
    <div class="toolbar">
      <div class="search-box">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索学院名称..."
          class="search-input"
          @input="handleSearch" />
      </div>
      <button @click="showAddCollegeModal" class="add-btn">添加学院</button>
    </div>

    <!-- 学院列表 -->
    <div class="college-list">
      <table class="college-table">
        <thead>
          <tr>
            <th>学院名称</th>
            <th>创建时间</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="college in filteredColleges" :key="college.id">
            <td>{{ college.name }}</td>
            <td>{{ formatDate(college.createTime) }}</td>
            <td>{{ formatDate(college.updateTime) }}</td>
            <td class="actions">
              <button @click="editCollege(college)" class="edit-btn">编辑</button>
              <button @click="manageAdmins(college)" class="manage-btn">管理管理员</button>
              <button @click="deleteCollege(college)" class="delete-btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑学院模态框 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ isEditing ? '编辑学院' : '添加学院' }}</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <input
            v-model="collegeForm.name"
            type="text"
            placeholder="请输入学院名称"
            class="form-input" />
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveCollege" class="save-btn">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api'
import type { AddCollegeRequest, College, UpdateCollegeRequest } from '@/types/admin'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const colleges = ref<College[]>([])
const searchKeyword = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const collegeForm = ref({
  id: '',
  name: ''
})

//搜索
const filteredColleges = computed(() => {
  if (!searchKeyword.value) return colleges.value
  return colleges.value.filter(college =>
    college.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

//搜索处理
const handleSearch = (): void => {
  // 计算属性自动处理搜索
  console.log('搜索关键词:', searchKeyword.value)
}

//检查登录状态
const checkLogin = (): boolean => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  console.log('登录状态检查:', {
    token: token ? '存在' : '不存在',
    role
  })

  if (!token) {
    console.log('未找到token，跳转到登录页')
    router.push('/login')
    return false
  }

  if (role !== 'Fr5g') {
    console.log('角色不符，当前角色:', role, '，期望角色: Fr5g')
    router.push('/login')
    return false
  }

  console.log('登录状态验证通过')
  return true
}

//加载学院列表
const loadColleges = async (): Promise<void> => {
  try {
    console.log('开始加载学院列表...')
    const response = await axios.get('/admin/colleges')
    console.log('学院列表响应:', response.data)

    if (response.data.code === 200) {
      colleges.value = response.data.data
      console.log('成功加载学院数量:', colleges.value.length)
    } else {
      alert('加载学院列表失败: ' + response.data.message)
    }
  } catch (error: unknown) {
    console.error('加载学院列表失败:', error)
    if (error instanceof Error) {
      alert('加载学院列表失败: ' + error.message)
    } else {
      alert('加载学院列表失败')
    }
  }
}

//显示添加学院模态框
const showAddCollegeModal = (): void => {
  collegeForm.value = { id: '', name: '' }
  isEditing.value = false
  showModal.value = true
}

//编辑学院
const editCollege = (college: College): void => {
  collegeForm.value = { ...college }
  isEditing.value = true
  showModal.value = true
}

//关闭模态框
const closeModal = (): void => {
  showModal.value = false
}

//保存学院（添加或更新）
const saveCollege = async (): Promise<void> => {
  if (!collegeForm.value.name.trim()) {
    alert('请输入学院名称')
    return
  }

  try {
    let response

    if (isEditing.value) {
      const request: UpdateCollegeRequest = { name: collegeForm.value.name.trim() }
      response = await axios.put(`/admin/colleges/${collegeForm.value.id}`, request)
    } else {
      const request: AddCollegeRequest = { name: collegeForm.value.name.trim() }
      response = await axios.post('/admin/colleges', request)
    }

    if (response.data.code === 200) {
      alert(isEditing.value ? '更新成功' : '添加成功')
      closeModal()
      await loadColleges()
    } else {
      alert((isEditing.value ? '更新失败' : '添加失败') + ': ' + response.data.message)
    }
  } catch (error: unknown) {
    console.error('操作失败:', error)
    if (error instanceof Error) {
      alert('操作失败: ' + error.message)
    } else {
      alert('操作失败')
    }
  }
}

//删除学院
const deleteCollege = async (college: College): Promise<void> => {
  if (!confirm(`确定要删除学院 "${college.name}" 吗？此操作不可恢复！`)) {
    return
  }

  try {
    const response = await axios.delete(`/admin/colleges/${college.id}`)
    if (response.data.code === 200) {
      alert('删除成功')
      await loadColleges()
    } else {
      alert('删除失败: ' + response.data.message)
    }
  } catch (error: unknown) {
    console.error('删除学院失败:', error)
    if (error instanceof Error) {
      alert('删除学院失败: ' + error.message)
    } else {
      alert('删除学院失败')
    }
  }
}

//管理学院管理员,跳转到管理员页面
const manageAdmins = (college: College): void => {
  router.push({
    path: '/college-admins',
    query: {
      collegeId: college.id,
      collegeName: college.name
    }
  })
}

//退出登录
const logout = (): void => {
  if (confirm('确定要退出登录吗？')) {
    localStorage.clear()
    router.push('/login')
  }
}

//格式化日期
const formatDate = (dateString?: string): string => {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('zh-CN')
  } catch {
    return '-'
  }
}

//初始化
onMounted(() => {
  console.log('组件挂载，开始检查登录状态...')
  if (checkLogin()) {
    console.log('登录状态验证通过，开始加载学院列表...')
    loadColleges()
  }
})
</script>

<style scoped>
.admin-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.admin-header h1 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input,
.form-input {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 300px;
  font-size: 14px;
}

.search-input:focus,
.form-input:focus {
  border-color: #409eff;
  outline: none;
}

.add-btn,
.save-btn {
  background: #409eff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-btn:hover,
.save-btn:hover {
  background: #337ecc;
}

.edit-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.edit-btn:hover {
  background: #218838;
}

.manage-btn {
  background: rgb(12, 172, 235);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  font-size: 12px;
}

.manage-btn:hover {
  background: rgb(12, 172, 235);
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background: #c82333;
}

.logout-btn,
.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.logout-btn:hover,
.cancel-btn:hover {
  background: #545b62;
}

.college-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.college-table th,
.college-table td {
  border: 1px solid #e0e0e0;
  padding: 12px;
  text-align: left;
}

.college-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.college-table tr:hover {
  background: #f5f5f5;
}

.actions {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-body {
  padding: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
  background: #f5f5f5;
  border-radius: 50%;
}
</style>
