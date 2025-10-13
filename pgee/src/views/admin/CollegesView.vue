<script setup lang="ts">
import { createMessageDialog } from '@/components/message'
import { CollegeService, CommonService } from '@/services'
import { useCollegeStore } from '@/stores/CollegeStore'
import type { College } from '@/types'
import type { AddCollegeRequest, UpdateCollegeRequest } from '@/types/admin'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const collegeStore = useCollegeStore()

const showModal = ref(false)
const isEditing = ref(false)
const collegeForm = ref({
  id: '',
  name: ''
})

// 使用 Store 中的响应式数据
const colleges = collegeStore.collegesS

// 格式化日期函数（直接写在组件里）
const formatDate = (dateString?: string): string => {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('zh-CN')
  } catch {
    return '-'
  }
}

// 确认对话框函数（直接写在组件里）
const confirmAction = (message: string): Promise<boolean> => {
  return Promise.resolve(window.confirm(message))
}

// 加载学院列表
const loadColleges = async (): Promise<void> => {
  try {
    console.log('开始加载学院列表...')
    const collegesData = await CollegeService.getColleges()
    collegeStore.setColleges(collegesData)
    console.log('成功加载学院数量:', collegesData.length)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '加载学院列表失败'
    createMessageDialog(message)
  }
}

// 显示添加学院模态框
const showAddCollegeModal = (): void => {
  collegeForm.value = { id: '', name: '' }
  isEditing.value = false
  showModal.value = true
}

// 编辑学院
const editCollege = (college: College): void => {
  collegeForm.value = { ...college }
  isEditing.value = true
  showModal.value = true
}

// 关闭模态框
const closeModal = (): void => {
  showModal.value = false
}

// 保存学院（添加或更新）
const saveCollege = async (): Promise<void> => {
  // 表单验证
  const validation = CollegeService.validateCollegeForm(collegeForm.value)
  if (!validation.isValid) {
    createMessageDialog(validation.message)
    return
  }

  try {
    if (isEditing.value) {
      const request: UpdateCollegeRequest = { name: collegeForm.value.name.trim() }
      await CollegeService.updateCollege(collegeForm.value.id, request)
      collegeStore.updateCollege(collegeForm.value.id, { name: collegeForm.value.name.trim() })
      createMessageDialog('更新成功')
    } else {
      const request: AddCollegeRequest = { name: collegeForm.value.name.trim() }
      await CollegeService.addCollege(request)
      createMessageDialog('添加成功')
      // 重新加载列表以获取新学院的完整信息
      await loadColleges()
    }
    closeModal()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '操作失败'
    createMessageDialog(message)
  }
}

// 删除学院
const removeCollege = async (college: College): Promise<void> => {
  const confirmed = await confirmAction(`确定要删除学院 "${college.name}" 吗？此操作不可恢复！`)
  if (!confirmed) return

  try {
    await CollegeService.deleteCollege(college.id)
    collegeStore.removeCollege(college.id)
    createMessageDialog('删除成功')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '删除学院失败'
    createMessageDialog(message)
  }
}

// 管理学院管理员，跳转到管理员页面
const manageAdmins = (college: College): void => {
  router.push({
    path: '/college-admins',
    query: {
      collegeId: college.id,
      collegeName: college.name
    }
  })
}

// 退出登录
const logout = async (): Promise<void> => {
  const confirmed = await confirmAction('确定要退出登录吗？')
  if (confirmed) {
    CommonService.logout()
  }
}

// 初始化
onMounted(() => {
  console.log('组件挂载，开始检查登录状态...')
  if (CommonService.checkAdminLogin()) {
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

<style scoped>
/* 样式保持不变 */
</style>
