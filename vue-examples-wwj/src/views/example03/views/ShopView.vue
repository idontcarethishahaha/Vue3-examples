<template>
  <div class="shop-view" v-if="shop">
    <h2>{{ shop.name }}</h2>
    <div class="shop-info">
      <img :src="shop.img" :alt="shop.name" class="shop-image" />
      <p>评分: {{ shop.score }} | 电话: {{ shop.phone }}</p>
    </div>

    <div class="item-list">
      <div v-for="item in shop.items" :key="item.id" class="item">
        <img :src="item.img" :alt="item.name" class="item-image" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>¥{{ item.price }} | 销量: {{ item.sales }}</p>
        </div>
        <div class="item-actions">
          <button @click="removeItem(item)">-</button>
          <span>{{ getQuantity(item.id) }}</span>
          <button @click="addItem(item)">+</button>
        </div>
      </div>
    </div>

    <OrderSummary :shopId="shop.id" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import OrderSummary from '../components/OrderSummary.vue'
import type { Item, Shops } from '../data/dataSource'
import {
  addOrderService,
  getItemQuantityService,
  getShopService,
  removeOrderService
} from '../service'

const route = useRoute()
const shop = ref<Shops | null>(null)

onMounted(async () => {
  const shopId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  shop.value = await getShopService(shopId)
})

const addItem = (item: Item) => {
  if (shop.value) {
    addOrderService(shop.value, item)
  }
}

const removeItem = (item: Item) => {
  if (shop.value) {
    removeOrderService(shop.value, item)
  }
}

const getQuantity = (itemId: string) => {
  return shop.value ? getItemQuantityService(shop.value.id, itemId) : 0
}
</script>

<style scoped>
.shop-view {
  padding: 20px;
}
.shop-image {
  max-width: 200px;
  max-height: 200px;
}
.item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #eee;
}
.item-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}
.item-info {
  flex-grow: 1;
}
.item-actions {
  display: flex;
  align-items: center;
}
.item-actions button {
  margin: 0 5px;
}
</style>
