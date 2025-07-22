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
  },
  {
    path: '/example03',
    component: () => import('@/views/example03/views/IndexView.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/example03/components/ShopList.vue')
      },
      {
        path: 'location',
        component: () => import('@/views/example03/components/LocationView.vue')
      }
    ]
  },
  {
    path: '/example03/order',
    component: () => import('@/views/example03/views/OrderView.vue')
  },
  {
    path: '/example03/shop/:id',
    component: () => import('@/views/example03/views/ShopView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
