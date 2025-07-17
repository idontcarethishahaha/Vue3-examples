import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/example01/WelcomeView.vue')
  },
  {
    path: '/example02',
    component: () => import('@/views/example02/CreditJisuan.vue')
  },
  {
    path: '/homework01',
    component: () => import('@/views/homework01/IndexView.vue')
  },
  {
    path: '/homework01_2',
    component: () => import('@/views/homework01_2/WeekView.vue')
  },
  {
    path: '/homework02',
    component: () => import('@/views/homework02/IndexView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
