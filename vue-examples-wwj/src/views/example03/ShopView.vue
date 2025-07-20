<!-- views/example03/ShopView.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Item, Shop } from './data/dataSource'
import { getOrdersService, getShopService } from './service'

const route = useRoute()
const shopR = ref<Shop>()
const orders = getOrdersService()

// 加载店铺数据
getShopService(route.params.sid as string).then(shop => {
  shopR.value = shop
})

// 添加商品到订单
const add = (item: Item) => {
  const existingOrder = orders.value.find(o => o.item.id === item.id)
  if (existingOrder) {
    existingOrder.quantity++
  } else {
    orders.value.push({ quantity: 1, item })
  }
}

// 从订单中移除商品
const remove = (item: Item) => {
  const index = orders.value.findIndex(o => o.item.id === item.id)
  if (index !== -1) {
    if (orders.value[index].quantity > 1) {
      orders.value[index].quantity--
    } else {
      orders.value.splice(index, 1)
    }
  }
}

// 获取商品在订单中的数量
const orderQ = computed(() => (item: Item) => {
  const order = orders.value.find(o => o.item.id === item.id)
  return order?.quantity || 0
})
</script>

<template>
  <div>
    <h3 style="margin: 0">{{ shopR?.name }}</h3>
    <div v-for="(item, index) of shopR?.items" :key="index" class="item-container">
      <img :src="item.url" :alt="item.name" class="item-image" />
      <div class="card">
        <h4>{{ item.name }}</h4>
        <p>价格：¥{{ item.price?.toFixed(2) }}</p>
        <p>月销量：{{ item.sales }}</p>
        <div class="quantity-control">
          <button @click="remove(item)">-</button>
          <span class="quantity">{{ orderQ(item) }}</span>
          <button @click="add(item)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.card {
  flex: 1;
}

.quantity-control {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.quantity-control button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

.quantity-control button:hover {
  background: #e0e0e0;
}

.quantity {
  display: inline-block;
  min-width: 20px;
  text-align: center;
}

h4 {
  margin: 5px 0;
  color: #333;
}

p {
  margin: 5px 0;
  color: #666;
}
</style>
