import { reactive } from 'vue'
import type { Order } from '../data/dataSource'

export const store = reactive({
  orders: [] as Order[],

  addOrder(item: Order['item']) {
    const order = this.orders.find(o => o.item.id === item.id)
    if (order) order.quantity++
    else this.orders.push({ quantity: 1, item })
  },

  removeOrder(item: Order['item']) {
    const index = this.orders.findIndex(o => o.item.id === item.id)
    if (index !== -1 && --this.orders[index].quantity <= 0) {
      this.orders.splice(index, 1)
    }
  }
})
