import type { Item } from './data/dataSource'
import { shopService } from './service'
import { store } from './store'

export const useShopLogic = (shopId: string) => {
  // 店铺数据
  const loadShop = async () => {
    return shopService.getShop(shopId)
  }

  // 订单操作
  const addToOrder = (item: Item) => store.addOrder(item)
  const removeFromOrder = (item: Item) => store.removeOrder(item)

  // 商品数量
  const getItemQuantity = (itemId: string) => {
    return store.orders.find(o => o.item.id === itemId)?.quantity || 0
  }

  return {
    loadShop,
    addToOrder,
    removeFromOrder,
    getItemQuantity
  }
}
