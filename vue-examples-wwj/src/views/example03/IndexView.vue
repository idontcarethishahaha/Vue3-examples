<script lang="ts" setup>
import OrderCostVue from '@/views/example03/OrderCost.vue'
</script>

<template>
  <div class="container">
    <h2>Example 03</h2>
    <nav class="tab">
      <router-link to="/example03">附近店铺</router-link>
      |
      <router-link to="/example03/location">位置</router-link>
    </nav>
    <OrderCostVue />
    <router-view class="content"></router-view>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.tab {
  padding: 1rem;
  background: #f5f5f5;
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
