<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from './store'

const { ordersR } = useStore()

// 计算属性：订单总价
const totalCost = computed(() =>
  ordersR.value.reduce((sum, order) => sum + (order.item.price ?? 0) * order.quantity, 0)
)

// 计算属性：订单项数量
const orderCount = computed(() => ordersR.value.length)
</script>

<template>
  <router-link to="/example03/orders" class="notice" v-if="orderCount > 0">
    <span class="text">小计:</span>
    <span class="total">¥{{ totalCost.toFixed(2) }}</span>
    <span class="text">(点击查看订单详情)</span>
  </router-link>
</template>

<style scoped>
.notice {
  display: inline-block;
  padding: 10px 16px;
  background: #a0ceef;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin: 8px 0;
}

.text {
  margin-right: 6px;
  font-size: 14px;
}

.total {
  font-weight: bold;
  font-size: 16px;
}
</style>
