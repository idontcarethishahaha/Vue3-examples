<script setup lang="ts">
import type { LoginRequest } from '@/api/loginApi'
import axios from '@/axios'
import { reactive, ref } from 'vue'
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
      const token = response.headers.token
      const role = response.headers.role

      console.log('登录成功:', { token, role })

      if (!token) {
        errorMessage.value = '登录失败:未获取到token'
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('user', JSON.stringify(response.data.data))

      console.log('用户信息已保存到localStorage')

      switch (role) {
        case 'Fr5g':
          await router.push('/admin-colleges')
          break
        case 'yHJ7':
          await router.push('/collegeadmin-welcome')
          break
        case 'Ca24':
          await router.push('/counselor-welcome')
          break
        case 'dA5q':
          await router.push('/student-welcome')
          break
        default:
          errorMessage.value = '未知用户角色: ' + role
      }
    } else {
      errorMessage.value = response.data.message || '登录失败'
    }
  } catch {
    errorMessage.value = '登录失败，请检查网络连接'
  } finally {
    loading.value = false
  }
}
</script>

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

<style scoped></style>
