<script setup lang="ts">
import { createMessageDialog } from '@/components/message'
import { CollegeAdminService, CommonService } from '@/services'
import type { User } from '@/types'
import { formatDate } from '@/utils/formatters'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 响应式数据
const showModal = ref(false)
const searchKeyword = ref('')
const admins = ref<User[]>([])
const adminForm = ref({
  name: '',
  account: '',
  tel: '',
  password: ''
})

// 从路由参数获取学院信息
const currentCollegeId = ref('')
const currentCollegeName = ref('')

// 计算属性
const filteredAdmins = computed(() => {
  if (!searchKeyword.value) return admins.value

  const keyword = searchKeyword.value.toLowerCase()
  return admins.value.filter(
    admin =>
      (admin.name && admin.name.toLowerCase().includes(keyword)) ||
      (admin.account && admin.account.toLowerCase().includes(keyword)) ||
      (admin.tel && admin.tel.includes(keyword))
  )
})

const adminCount = computed(() => admins.value.length)

// UI 交互函数
const showAddAdminModal = () => {
  adminForm.value = { name: '', account: '', tel: '', password: '' }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// 业务操作函数
const loadAdmins = async () => {
  try {
    const adminsData = await CollegeAdminService.getCollegeAdmins(currentCollegeId.value)
    admins.value = adminsData
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '加载管理员列表失败'
    createMessageDialog(message)
  }
}

const addAdmin = async () => {
  const validation = CollegeAdminService.validateAdminForm(adminForm.value)
  if (!validation.isValid) {
    createMessageDialog(validation.message)
    return
  }

  try {
    await CollegeAdminService.addCollegeAdmin(currentCollegeId.value, {
      name: adminForm.value.name.trim(),
      account: adminForm.value.account.trim(),
      tel: adminForm.value.tel.trim(),
      password: adminForm.value.password.trim() || adminForm.value.account.trim()
    })
    createMessageDialog('添加成功')
    closeModal()
    await loadAdmins()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '添加管理员失败'
    createMessageDialog(message)
  }
}

const resetPassword = async (admin: User) => {
  if (!confirm(`确定要重置管理员 "${admin.name}" 的密码吗？密码将重置为默认值。`)) {
    return
  }

  try {
    await CollegeAdminService.resetPassword(admin.account)
    createMessageDialog('密码重置成功')
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '重置密码失败'
    createMessageDialog(message)
  }
}

const removeAdmin = async (admin: User) => {
  if (!confirm(`确定要移除管理员 "${admin.name}" 吗？此操作不可恢复！`)) {
    return
  }

  try {
    await CollegeAdminService.removeCollegeAdmin(currentCollegeId.value, admin.id)
    createMessageDialog('移除成功')
    await loadAdmins()
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '移除管理员失败'
    createMessageDialog(message)
  }
}

const navigateToColleges = () => {
  router.push('/admin-colleges')
}

const logout = async () => {
  if (confirm('确定要退出登录吗？')) {
    CommonService.logout()
  }
}

// 初始化
onMounted(() => {
  // 检查登录状态
  if (!CommonService.checkAdminLogin()) {
    return
  }

  // 从路由参数获取学院信息
  currentCollegeId.value = route.query.collegeId as string
  currentCollegeName.value = decodeURIComponent((route.query.collegeName as string) || '')

  if (!currentCollegeId.value) {
    createMessageDialog('无效的学院信息')
    router.push('/admin-colleges')
    return
  }

  loadAdmins()
})
</script>

<template>
  <div class="admin-container">
    <!-- 头部导航 -->
    <div class="header">
      <h1>推免系统 - 超级管理员</h1>
      <div class="user-info">
        <span>超级管理员</span>
        <button class="btn" @click="logout" style="margin-left: 10px">退出登录</button>
      </div>
    </div>

    <!-- 主体容器 -->
    <div class="container">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <div class="menu-item" @click="navigateToColleges">学院管理</div>
        <div class="menu-item">用户管理</div>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <a @click="navigateToColleges" style="cursor: pointer; color: #1890ff">学院管理</a>
          &gt;
          <span>{{ currentCollegeName }}</span>
          - 管理员管理
        </div>

        <div class="page-header">
          <h2 class="page-title">{{ currentCollegeName }} - 管理员管理</h2>
          <div class="actions">
            <input
              v-model="searchKeyword"
              type="text"
              class="search-box"
              placeholder="搜索管理员..."
              @keypress.enter="loadAdmins" />
            <button class="btn" @click="loadAdmins">搜索</button>
            <button class="btn btn-primary" @click="showAddAdminModal">添加管理员</button>
            <button class="btn" @click="loadAdmins">刷新</button>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="stats">
          当前学院管理员总数：
          <strong>{{ adminCount }}</strong>
        </div>

        <!-- 管理员表格 -->
        <table v-if="filteredAdmins.length > 0" class="college-table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>账号</th>
              <th>手机号</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin in filteredAdmins" :key="admin.id">
              <td>{{ admin.name || '-' }}</td>
              <td>{{ admin.account }}</td>
              <td>{{ admin.tel || '-' }}</td>
              <td>{{ formatDate(admin.createTime) }}</td>
              <td class="actions">
                <div class="action-buttons">
                  <button class="action-btn reset-btn" @click="resetPassword(admin)">
                    重置密码
                  </button>
                  <button class="action-btn remove-btn" @click="removeAdmin(admin)">移除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 空状态 -->
        <div v-else class="empty-state">
          <div>📋</div>
          <h3>暂无管理员</h3>
          <p>当前学院还没有管理员，点击"添加管理员"按钮来添加</p>
        </div>
      </div>
    </div>

    <!-- 添加管理员模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>添加学院管理员</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="adminName">姓名 *</label>
            <input
              v-model="adminForm.name"
              type="text"
              id="adminName"
              class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="adminAccount">账号 *</label>
            <input
              v-model="adminForm.account"
              type="text"
              id="adminAccount"
              class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="adminTel">手机号</label>
            <input v-model="adminForm.tel" type="tel" id="adminTel" class="form-control" />
          </div>
          <div class="form-group">
            <label for="adminPassword">初始密码</label>
            <input
              v-model="adminForm.password"
              type="text"
              id="adminPassword"
              class="form-control"
              placeholder="留空则使用账号作为密码" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="addAdmin">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
