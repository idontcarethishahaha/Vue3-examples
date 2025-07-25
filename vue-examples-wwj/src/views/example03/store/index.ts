// views/example03/store/index.ts
import { createGlobalState } from '@vueuse/core'
import { computed, ref, shallowRef } from 'vue'
import type { Order, Shops } from '../data/dataSource'

export const useH2Store = createGlobalState(() => {
  // 使用 R 后缀表示响应式数据
  const shopListR = shallowRef<Shops[]>([])
  const shopMapR = new Map<string, Shops>()
  const ordersR = ref<Order[]>([])

  // 计算属性：订单总价
  const totalCost = computed(() =>
    ordersR.value.reduce((sum, order) => sum + (order.item.price ?? 0) * order.quantity, 0)
  )

  // 计算属性：订单项数量
  const orderCount = computed(() => ordersR.value.length)

  return {
    shopListR,
    shopMapR,
    ordersR,
    totalCost,
    orderCount
  }
})
