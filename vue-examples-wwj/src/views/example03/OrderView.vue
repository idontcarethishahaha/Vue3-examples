<script lang="ts" setup>
import { computed } from 'vue'
import { getOrdersService } from './service'
const orders = computed(() => getOrdersService().value)
</script>

<template>
  <div class="order-container">
    <h2 class="order-title">我的订单</h2>
    <div class="order-list">
      <div v-for="(o, index) of orders" :key="index" class="order-item">
        <img v-if="o.item.img" :src="o.item.img" class="item-image" />
        <div class="item-info">
          <h3>{{ o.item.name }}</h3>
          <div class="item-meta">
            <span>单价: ¥{{ o.item.price.toFixed(2) }}</span>
            <span>× {{ o.quantity }}</span>
          </div>
        </div>
        <div class="item-total">¥{{ (o.item.price * o.quantity).toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.order-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.order-list {
  border-top: 1px solid #eee;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  gap: 1rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.item-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.item-total {
  font-weight: bold;
  color: #7baad7;
}
</style>
