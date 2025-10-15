import Login from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login' //重定向到登录页
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/admin-colleges',
      name: 'AdminColleges',
      component: () => import('@/views/admin/CollegesView.vue')
    },
    {
      path: '/college-admins',
      name: 'CollegeAdmins',
      component: () => import('@/views/admin/CollegeAdminsView.vue')
    },
    {
      path: '/collegeadmin-welcome',
      name: 'CollegeAdminWelcome',
      component: () => import('@/views/collegeadmin/CollegeAdminWelcome.vue')
    },
    {
      path: '/counselor-welcome',
      name: 'CounselorWelcome',
      component: () => import('@/views/counselor/CounselorWelcome.vue')
    },
    {
      path: '/student-welcome',
      name: 'StudentWelcome',
      component: () => import('@/views/student/StudentWelcome.vue')
    }
  ]
})

export default router
