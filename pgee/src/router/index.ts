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
    }, //超级管理员页面
    {
      path: '/admin-colleges',
      name: 'AdminColleges',
      component: () => import('@/views/admin/CollegesView.vue')
    }, //超级管理员页面
    {
      path: '/college-admins',
      name: 'CollegeAdmins',
      component: () => import('@/views/admin/CollegeAdminsView.vue')
    },
    //学院管理员页面
    {
      path: '/collegeadmin-welcome',
      name: 'CollegeAdminWelcome',
      component: () => import('@/views/collegeadmin/CollegeAdminWelcome.vue')
    },
    //辅导员页面
    {
      path: '/counselor-welcome',
      name: 'CounselorWelcome',
      component: () => import('@/views/counselor/CounselorWelcome.vue')
    },
    //学生页面
    {
      path: '/student-welcome',
      name: 'StudentWelcome',
      component: () => import('@/views/student/StudentWelcome.vue')
    }
  ]
})

export default router
