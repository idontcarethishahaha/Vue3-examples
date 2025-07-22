<script setup lang="ts">
import { getTotalCostService } from '../service'

const totalCost = getTotalCostService()
</script>

<template>
  <div class="order-cost">
    <h3>订单总价: ¥{{ totalCost.toFixed(2) }}</h3>
    <router-link to="/example03/order" class="view-order">查看订单详情</router-link>
  </div>
</template>

<style scoped>
.order-cost {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.view-order {
  padding: 8px 15px;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
