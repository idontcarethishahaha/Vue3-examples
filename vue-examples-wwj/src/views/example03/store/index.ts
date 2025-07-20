// views/example03/store/index.ts
import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Order, Shop } from '../data/dataSource'

export const useH2Store = createGlobalState(() => {
  const shopListS = ref<Shop[]>([])
  const shopMapS = ref<Map<string, Shop>>(new Map())
  const ordersS = ref<Order[]>([])

  // 计算属性：订单总价
  const totalCost = computed(() =>
    ordersS.value.reduce((sum, order) => sum + (order.item.price ?? 0) * order.quantity, 0)
  )

  // 计算属性：订单项数量
  const orderCount = computed(() => ordersS.value.length)

  return {
    shopListS,
    shopMapS,
    ordersS,
    totalCost,
    orderCount
  }
})
