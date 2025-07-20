<script setup lang="ts">
import { useH2Store } from './store'

const { totalCost, orderCount } = useH2Store()
</script>

<template>
  <router-link to="/example03/orders" class="order" v-if="orderCount > 0">
    订单：¥{{ totalCost.toFixed(2) }}
  </router-link>
</template>
<style scoped>
.order {
  text-decoration: none;
  display: inline-block;
  padding: 5px;
  background: sandybrown;
  border-radius: 5px;
}
</style>
