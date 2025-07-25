import { getShopMock, listShopsMock } from '../data/dataSource'
import { useStore } from '../store/index'

export const listShopsService = async () => {
  const shopListS = useStore().shopListR
  if (shopListS.value.length == 0) {
    shopListS.value = await listShopsMock()
  }
  return shopListS
}

export const getShopService = async (sid: string) => {
  const shopMapR = useStore().shopMapR
  let shopItemsS = shopMapR.get(sid)
  if (shopItemsS) return shopItemsS
  // 异步加载数据，并更新store
  shopItemsS = await getShopMock(sid)
  shopMapR.set(sid, shopItemsS)
  return shopItemsS
}

export const getOrdersService = () => {
  return useStore().ordersR
}
