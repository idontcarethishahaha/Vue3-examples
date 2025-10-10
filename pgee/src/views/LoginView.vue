<template>
  <div class="login-container">
    <div class="login-header">
      <h1>推免系统</h1>
      <p>欢迎登录，请填写您的账号信息</p>
    </div>

    <div v-if="errorMessage" class="alert alert-error">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="account">账号</label>
        <input
          v-model="form.account"
          type="text"
          id="account"
          class="form-control"
          placeholder="请输入账号"
          required
          ref="accountInput" />
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="form-control"
          placeholder="请输入密码"
          required
          @keypress.enter="handleLogin" />
      </div>

      <button type="submit" class="btn-login" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>

    <div class="register-link">
      <router-link to="/register">学生注册</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api'
import type { LoginRequest } from '@/api/loginApi'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const accountInput = ref<HTMLInputElement>()

const form = reactive<LoginRequest>({
  account: '',
  password: ''
})

const handleLogin = async () => {
  if (!form.account.trim() || !form.password.trim()) {
    errorMessage.value = '请输入账号和密码'
    return
  }

  errorMessage.value = ''
  loading.value = true

  try {
    const response = await axios.post('/open/login', {
      account: form.account,
      password: form.password
    })

    console.log('登录响应:', response)

    if (response.data.code === 200) {
      // 从响应头获取token和role
      const token = response.headers.token
      const role = response.headers.role

      console.log('登录成功:', { token, role })

      if (!token) {
        errorMessage.value = '登录失败：未获取到token'
        return
      }

      // 保存到localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('user', JSON.stringify(response.data.data))

      console.log('用户信息已保存到localStorage')

      // 根据角色跳转到不同页面
      switch (role) {
        case 'Fr5g': // 超级管理员
          await router.push('/admin-colleges')
          break
        case 'yHJ7': // 学院管理员
          await router.push('/collegeadmin-dashboard')
          break
        case 'Ca24': // 辅导员
          await router.push('/counselor-welcome')
          break
        case 'dA5q': // 学生
          await router.push('/student-welcome')
          break
        default:
          errorMessage.value = '未知用户角色: ' + role
      }
    } else {
      errorMessage.value = response.data.message || '登录失败'
    }
  } catch (error: unknown) {
    console.error('登录错误:', error)
    if (error instanceof Error) {
      errorMessage.value = error.message || '登录失败，请检查网络连接'
    } else {
      errorMessage.value = '登录失败，请检查网络连接'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 自动聚焦到账号输入框
  if (accountInput.value) {
    accountInput.value.focus()
  }
})
</script>

<style scoped>
.login-container {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 100px auto;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 10px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #409eff;
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover:not(:disabled) {
  background: #337ecc;
}

.btn-login:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}

.alert {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.alert-error {
  background: #fee;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.register-link {
  text-align: center;
  margin-top: 15px;
}

.register-link a {
  color: #409eff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
