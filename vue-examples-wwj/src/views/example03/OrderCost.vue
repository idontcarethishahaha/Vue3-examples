<!-- OrderCost.vue -->
<script setup lang="ts">
import { useH2Store } from './store'

const { totalCost, orderCount } = useH2Store()
</script>

<template>
  <router-link to="/example03/orders" class="order-notice" v-if="orderCount > 0">
    <span class="order-text">小计:</span>
    <span class="order-amount">¥{{ totalCost.toFixed(2) }}</span>
  </router-link>
</template>

<style scoped>
.order-notice {
  display: inline-block;
  padding: 10px 16px;
  background: linear-gradient(135deg, #a0ceef, #81b1e8);
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  box-shadow: 0 3px 6px rgba(155, 201, 223, 0.2);
  transition: all 0.3s ease;
  margin: 8px 0;
}

.order-notice:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(179, 216, 246, 0.3);
}

.order-text {
  margin-right: 6px;
  font-size: 14px;
}

.order-amount {
  font-weight: bold;
  font-size: 16px;
}
</style>
