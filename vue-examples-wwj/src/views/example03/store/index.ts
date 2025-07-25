import { createGlobalState } from '@vueuse/core'
import { ref, shallowRef } from 'vue'
import type { Order, Shops } from '../data/dataSource'

export const useStore = createGlobalState(() => {
  const shopListR = shallowRef<Shops[]>([])
  const shopMapR = new Map<string, Shops>()
  const ordersR = ref<Order[]>([])

  return {
    shopListR,
    shopMapR,
    ordersR
  }
})
