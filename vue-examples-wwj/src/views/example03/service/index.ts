import { getShopMock, listShopsMock } from '../data/dataSource'
import { useH2Store } from '../store/index'

export const listShopsService = async () => {
  const shopListS = useH2Store().shopListR
  if (shopListS.value.length == 0) {
    shopListS.value = await listShopsMock()
  }
  return shopListS
}

export const getShopService = async (sid: string) => {
  const shopMapR = useH2Store().shopMapR
  let shopItemsS = shopMapR.get(sid)
  if (shopItemsS) return shopItemsS
  // 异步加载数据，并更新store
  shopItemsS = await getShopMock(sid)
  shopMapR.set(sid, shopItemsS)
  return shopItemsS
}

export const getOrdersService = () => {
  return useH2Store().ordersR
}
