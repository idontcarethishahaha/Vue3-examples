import { getShopMock, listShopsMock } from '../data/dataSource2'
import { useShopstore } from '../store/index2'

const store = useShopstore()

export const listShopsService = async () => {
  const shopListS = store.shopListS
  if (shopListS.value.length == 0) {
    shopListS.value = await listShopsMock()
  }
  return shopListS
}

export const getShopService = async (sid: string) => {
  const shopMap = store.shopMap
  let shop = shopMap.get(sid)
  if (shop) {
    return shop
  }
  shop = await getShopMock(sid)
  shopMap.set(sid, shop)
  return shop
}

export const getOrdersService = () => {
  return store.ordersS
}
