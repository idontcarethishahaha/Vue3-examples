import { getShopMock, listShopsMock, type Shops } from '../data/dataSource'

const shopCache = new Map<string, Shops | Shops[]>()

export const shopService = {
  async getShopList() {
    const cached = shopCache.get('shopList')
    if (cached) return cached as Shops[]

    const data = await listShopsMock()
    shopCache.set('shopList', data)
    return data
  },

  async getShop(id: string) {
    if (shopCache.has(id)) {
      return shopCache.get(id) as Shops
    }

    const data = await getShopMock(id)
    shopCache.set(id, data)
    return data
  }
}
