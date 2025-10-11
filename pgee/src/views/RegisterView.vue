<template>
  <div class="register-container">
    <div class="register-header">
      <h1>学生注册</h1>
    </div>

    <div v-if="errorMessage" class="alert alert-error">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="account">学号:</label>
        <input
          v-model="form.account"
          type="text"
          id="account"
          class="form-control"
          placeholder="请输入学号"
          required />
      </div>

      <div class="form-group">
        <label for="name">姓名:</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="form-control"
          placeholder="请输入姓名"
          required />
      </div>

      <div class="form-group">
        <label for="tel">电话:</label>
        <input
          v-model="form.tel"
          type="tel"
          id="tel"
          class="form-control"
          placeholder="请输入电话"
          required />
      </div>

      <!--学院下拉框-->
      <div class="form-group">
        <label for="collegeSelect">学院:</label>
        <select
          v-model="selectedCollegeId"
          id="collegeSelect"
          class="form-control"
          required
          @change="loadMajors">
          <option value="">请选择学院</option>
          <option v-for="college of colleges" :key="college.id" :value="college.id">
            {{ college.name }}
          </option>
        </select>
      </div>

      <!--专业下拉框-->
      <div class="form-group">
        <label for="majorSelect">专业:</label>
        <select
          v-model="selectedMajorId"
          id="majorSelect"
          class="form-control"
          required
          :disabled="!selectedCollegeId || majors.length === 0">
          <option value="">
            {{
              !selectedCollegeId
                ? '请先选择学院'
                : majors.length === 0
                  ? '该学院暂无专业'
                  : '请选择专业'
            }}
          </option>
          <option v-for="major of majors" :key="major.id" :value="major.id">
            {{ major.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="password">密码:</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="form-control"
          placeholder="请输入密码"
          required />
      </div>

      <button type="submit" class="btn-register" :disabled="loading">
        {{ loading ? '注册中...' : '注册' }}
      </button>
    </form>

    <div class="login-link">
      <router-link to="/login">已有账号？立即登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api'
import type { College, Major, RegisterRequest } from '@/types'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const colleges = ref<College[]>([])
const majors = ref<Major[]>([])
const selectedCollegeId = ref<number | ''>('')
const selectedMajorId = ref<number | ''>('')

const form = reactive<RegisterRequest>({
  account: '',
  name: '',
  tel: '',
  password: '',
  collegeId: 0,
  majorId: 0
})

//监听学院选择
watch(selectedCollegeId, newCollegeId => {
  if (newCollegeId) {
    form.collegeId = newCollegeId
  } else {
    form.collegeId = 0
    selectedMajorId.value = ''
  }
})

//监听专业选择
watch(selectedMajorId, newMajorId => {
  if (newMajorId) {
    form.majorId = newMajorId
  } else {
    form.majorId = 0
  }
})

//加载学院列表
const loadColleges = async () => {
  try {
    console.log('开始加载学院列表...')

    const response = await axios.get('/open/colleges')
    console.log('学院列表响应:', response.data)

    if (response.data.code === 200) {
      colleges.value = response.data.data || []
      console.log('学院列表加载完成')
    } else {
      errorMessage.value = '加载学院列表失败: ' + (response.data.message || '未知错误')
    }
  } catch (error: unknown) {
    console.error('加载学院列表失败:', error)
    if (error instanceof Error) {
      errorMessage.value = '加载学院列表失败: ' + error.message
    } else {
      errorMessage.value = '加载学院列表失败: 网络错误'
    }
  }
}

//根据学院加载专业
const loadMajors = async () => {
  if (!selectedCollegeId.value) {
    majors.value = []
    selectedMajorId.value = ''
    return
  }

  try {
    console.log('开始加载专业列表,学院ID:', selectedCollegeId.value)

    const response = await axios.get(`/open/colleges/${selectedCollegeId.value}/majors`)
    console.log('专业列表响应:', response.data)

    if (response.data.code === 200) {
      majors.value = response.data.data || []
      selectedMajorId.value = ''
      console.log('专业列表加载完成')
    } else {
      errorMessage.value = '加载专业列表失败: ' + (response.data.message || '未知错误')
      majors.value = []
    }
  } catch (error: unknown) {
    console.error('加载专业列表失败:', error)
    if (error instanceof Error) {
      errorMessage.value = '加载专业列表失败: ' + error.message
    } else {
      errorMessage.value = '加载专业列表失败: 网络错误'
    }
    majors.value = []
  }
}

//注册提交
const handleRegister = async () => {
  //验证表单
  if (
    !form.account.trim() ||
    !form.name.trim() ||
    !form.tel.trim() ||
    !form.password ||
    !form.collegeId ||
    !form.majorId
  ) {
    errorMessage.value = '请填写所有必填字段'
    return
  }

  //验证电话格式
  const telRegex = /^1[3-9]\d{9}$/
  if (!telRegex.test(form.tel)) {
    errorMessage.value = '请输入正确的手机号码'
    return
  }

  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    console.log('提交的数据:', form)

    const response = await axios.post('/open/register', {
      name: form.name,
      account: form.account,
      tel: form.tel,
      password: form.password,
      collegeId: form.collegeId,
      majorId: form.majorId
    })

    console.log('注册响应:', response.data)

    if (response.data.code === 200) {
      successMessage.value = '注册成功!3秒后跳转到登录页面...'

      //3秒后跳转到登录页面
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      errorMessage.value = '注册失败: ' + (response.data.message || '未知错误')
    }
  } catch (error: unknown) {
    console.error('注册失败:', error)
    if (error instanceof Error) {
      errorMessage.value = '注册失败: ' + error.message
    } else {
      errorMessage.value = '注册失败: 网络错误'
    }
  } finally {
    loading.value = false
  }
}

//页面加载时加载学院
onMounted(() => {
  console.log('页面加载完成，开始加载学院数据...')
  loadColleges()
})
</script>

<style scoped></style>
