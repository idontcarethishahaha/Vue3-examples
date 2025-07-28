import { ref, shallowRef } from 'vue'
import type { Order, Shop } from '../data/dataSource2'

const shopListS = shallowRef<Shop[]>([])
const shopMap = new Map<string, Shop>()
const ordersS = ref<Order[]>([])
const clear = () => {
  shopListS.value = []
  shopMap.clear()
  ordersS.value = []
}
const store = { shopListS, shopMap, ordersS, clear }
export const useShopstore = () => store
