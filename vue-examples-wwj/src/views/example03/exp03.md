# 实验三 单一数据源实验

### 创建全局状态

views/example03/store/index.ts

```ts
import { createGlobalState } from '@vueuse/core'
import { ref, computed } from 'vue'

//createGlobalState() 创建全局共享状态
export const useStore = createGlobalState(() => {
  const shopList = ref<Shop[]>([])
  const orders = ref<Order[]>([])

  const totalPrice = computed(() =>
    orders.value.reduce((sum, order) => sum + order.item.price * order.quantity, 0)
  )

  return { shopList, orders, totalPrice }
})
```

使用状态

```ts
import { useStore } from './store'

const { shopList, orders } = useStore()

// 添加订单
function addOrder(item: Item) {
  const existing = orders.value.find(o => o.item.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    orders.value.push({ item, quantity: 1 })
  }
}
```
