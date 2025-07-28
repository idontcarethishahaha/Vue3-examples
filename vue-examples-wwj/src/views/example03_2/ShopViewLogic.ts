import type { Item, Shop } from '@/views/example03_2/data/dataSource2'
import { shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { getOrdersService, getShopService } from './service/index2'

export const shopR = shallowRef<Shop>()
export const orderS = getOrdersService()

//const params = useRoute().params
/*
getShopService(params.sid as string).then(sh => {
  shopR.value = sh
})
*/

//函数，手动调用
export const getShopData = () => {
  const params = useRoute().params

  return getShopService(params.sid as string).then(shop => {
    shopR.value = shop
    return shop
  })
}
export const addItem = (item: Item) => {
  const order = orderS.value.find(o => o.item.id === item.id)
  // 这里的三元表达式违反了ESLint 规则 @typescript-eslint/no-unused-expressions
  // 所以我在这里用这个注释禁用该 ESLint 规则​​
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  order ? order.quantity++ : orderS.value.push({ quantity: 1, item: item })
}

export const removeItem = (item: Item) => {
  const order = orderS.value.find(o => o.item.id === item.id)
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  order && --order.quantity == 0 && orderS.value.splice(orderS.value.indexOf(order), 1)
}

export const getItemQuantity = (item: Item) => {
  const order = orderS.value.find(o => o.item.id === item.id)
  return order?.quantity || 0
}
