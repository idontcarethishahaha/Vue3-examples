//本地数据（store 管理）
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
//唯一的 store 对象
const store = { shopListS, shopMap, ordersS, clear }
//每次调用时都返回同一个对象引用
export const useShopstore = () => store
