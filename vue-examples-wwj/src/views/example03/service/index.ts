import type { Item, Shops } from '../data/dataSource'
import { getShopMock, listShopsMock } from '../data/dataSource'
import { useStore } from '../store'

export const listShopsService = async (): Promise<Shops[]> => {
  const { shopList } = useStore()
  if (shopList.value.length === 0) {
    const mockData = await listShopsMock()
    shopList.value = mockData || [] // 确保总是返回数组
  }
  return [...shopList.value] // 返回新数组
}

export const getShopService = async (sid: string): Promise<Shops | null> => {
  const { shopMap } = useStore()
  let shop = shopMap.value.get(sid)
  if (shop) return shop

  // 异步加载数据，并更新store
  shop = await getShopMock(sid)
  if (shop) {
    shopMap.value.set(sid, shop)
    return shop
  }
  return null
}

export const getOrdersService = () => {
  return useStore().orders
}

export const addOrderService = (shop: Shops, item: Item) => {
  return useStore().addOrder(shop, item)
}

export const removeOrderService = (shop: Shops, item: Item) => {
  return useStore().removeOrder(shop, item)
}

export const getItemQuantityService = (shopId: string, itemId: string) => {
  return useStore().getItemQuantity(shopId, itemId)
}

export const getTotalCostService = () => {
  return useStore().totalCost
}
