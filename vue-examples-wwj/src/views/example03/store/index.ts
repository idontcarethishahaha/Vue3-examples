import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'
import type { Item, Order, Shops } from '../data/dataSource'

export const useStore = createGlobalState(() => {
  // 店铺列表
  const shopList = ref<Shops[]>([])

  // 店铺详情
  const shopMap = ref<Map<string, Shops>>(new Map())

  // 订单列表
  const orders = ref<Order[]>([])

  // 总花费
  const totalCost = computed(() => {
    return orders.value.reduce((total, order) => {
      const itemsCost = order.items.reduce(
        (sum, { item, quantity }) => sum + item.price * quantity,
        0
      )
      return total + itemsCost + order.deliveryFee
    }, 0)
  })

  // 添加订单项
  const addOrder = (shop: Shops, item: Item) => {
    let order = orders.value.find(o => o.shopId === shop.id)

    if (!order) {
      order = {
        shopId: shop.id,
        shopName: shop.name,
        deliveryFee: shop.deliveryFee || 0,
        items: []
      }
      orders.value.push(order)
    }

    const existingItem = order.items.find(i => i.item.id === item.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      order.items.push({ item, quantity: 1 })
    }
  }

  // 减少订单项
  const removeOrder = (shop: Shops, item: Item) => {
    const orderIndex = orders.value.findIndex(o => o.shopId === shop.id)

    if (orderIndex !== -1) {
      const order = orders.value[orderIndex]
      const itemIndex = order.items.findIndex(i => i.item.id === item.id)

      if (itemIndex !== -1) {
        if (order.items[itemIndex].quantity > 1) {
          order.items[itemIndex].quantity--
        } else {
          order.items.splice(itemIndex, 1)
          // 订单没有商品，移除整个订单
          if (order.items.length === 0) {
            orders.value.splice(orderIndex, 1)
          }
        }
      }
    }
  }

  // 获取商品在订单中的数量
  const getItemQuantity = (shopId: string, itemId: string) => {
    const order = orders.value.find(o => o.shopId === shopId)
    if (!order) return 0

    const item = order.items.find(i => i.item.id === itemId)
    return item ? item.quantity : 0
  }

  return {
    shopList,
    shopMap,
    orders,
    totalCost,
    addOrder,
    removeOrder,
    getItemQuantity
  }
})
