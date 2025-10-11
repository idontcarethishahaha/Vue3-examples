<script setup lang="ts">
import axios from '@/axios'
import type { AddCollegeRequest, College, UpdateCollegeRequest } from '@/types/admin'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const colleges = ref<College[]>([])
const showModal = ref(false)
const isEditing = ref(false)
const collegeForm = ref({
  id: '',
  name: ''
})

//检查登录状态
const checkLogin = (): boolean => {
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
const removeCollege = async (college: College): Promise<void> => {
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

<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>学院管理系统</h1>
      <button @click="logout" class="logout-btn">退出登录</button>
    </div>

    <div class="toolbar">
      <button @click="showAddCollegeModal" class="add-btn">添加学院</button>
    </div>

    <!--学院列表-->
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
          <tr v-for="college of colleges" :key="college.id">
            <td>{{ college.name }}</td>
            <td>{{ formatDate(college.createTime) }}</td>
            <td>{{ formatDate(college.updateTime) }}</td>
            <td class="actions">
              <button @click="editCollege(college)" class="edit-btn">编辑</button>
              <button @click="manageAdmins(college)" class="manage-btn">管理管理员</button>
              <button @click="removeCollege(college)" class="delete-btn">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--添加/编辑学院模态框-->
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

<style scoped></style>
