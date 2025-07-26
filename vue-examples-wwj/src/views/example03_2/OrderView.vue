<script setup lang="ts">
import { store } from './store'
</script>

<template>
  <div class="container">
    <h2>我的订单</h2>
    <div v-for="(order, index) of store.orders" :key="index" class="item">
      <img v-if="order.item.img" :src="order.item.img" class="image" />
      <div class="info">
        <h3>{{ order.item.name }}</h3>
        <p>单价: ¥{{ order.item.price }}</p>
        <p>数量: {{ order.quantity }}</p>
      </div>
      <div class="total">¥{{ order.item.price * order.quantity }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}
.item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  gap: 16px;
}
.image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.info {
  flex: 1;
}
.total {
  font-weight: bold;
  color: #4a90e2;
}
</style>
