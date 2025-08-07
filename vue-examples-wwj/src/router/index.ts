import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import IndexView from '../views/example03/IndexView.vue'
import IndexView2 from '../views/example03_2/IndexView2.vue'
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
    component: IndexView,
    children: [
      {
        path: '', // 默认子路由
        component: () => import('../views/example03/ShopListView.vue')
      },
      {
        path: 'shops/:sid',
        component: () => import('../views/example03/ShopView.vue')
      },
      {
        path: 'location',
        component: () => import('../views/example03/LocationView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/example03/OrderView.vue')
      }
    ]
  },
  {
    path: '/example03_2',
    component: IndexView2,
    children: [
      {
        path: '', // 默认子路由
        component: () => import('../views/example03_2/ShopListView2.vue')
      },
      {
        path: 'shops2/:sid',
        component: () => import('../views/example03_2/ShopView2.vue')
      },
      {
        path: 'location2',
        component: () => import('../views/example03_2/LocationView2.vue')
      },
      {
        path: 'orders2',
        component: () => import('../views/example03_2/OrderView2.vue')
      }
    ]
  },
  {
    path: '/homework03',
    component: () => import('../views/homework03/IndexView.vue')
  },
  {
    path: '/homework04',
    component: () => import('../views/homework04/IndexView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
