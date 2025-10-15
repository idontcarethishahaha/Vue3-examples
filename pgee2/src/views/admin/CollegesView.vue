<script setup lang="ts">
import { createMessageDialog } from '@/components/message'
import { CollegeService, CommonService } from '@/services'
import { useCollegeStore } from '@/stores/CollegeStore'
import type { College } from '@/types'
import { formatDate } from '@/utils/formatters'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const collegeStore = useCollegeStore()

const showModal = ref(false)
const isEditing = ref(false)
const collegeForm = ref({ id: '', name: '' })
const colleges = collegeStore.collegesS

const showAddCollegeModal = () => {
  collegeForm.value = { id: '', name: '' }
  isEditing.value = false
  showModal.value = true
}

const editCollege = (college: College) => {
  collegeForm.value = { ...college }
  isEditing.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveCollege = async () => {
  const validation = CollegeService.validateCollegeForm(collegeForm.value)
  if (!validation.isValid) {
    createMessageDialog(validation.message)
    return
  }

  try {
    if (isEditing.value) {
      await CollegeService.updateCollege(collegeForm.value.id, {
        name: collegeForm.value.name.trim()
      })
    } else {
      await CollegeService.addCollege({
        name: collegeForm.value.name.trim()
      })
    }
    closeModal()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '操作失败'
    createMessageDialog(message)
  }
}

const removeCollege = (college: College) => {
  CollegeService.deleteCollege(college)
}

const manageAdmins = (college: College) => {
  router.push({
    path: '/college-admins',
    query: { collegeId: college.id, collegeName: college.name }
  })
}

const logout = async () => {
  if (confirm('确定要退出登录吗？')) {
    CommonService.logout()
  }
}

onMounted(() => {
  CollegeService.initCollegeManagement()
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
