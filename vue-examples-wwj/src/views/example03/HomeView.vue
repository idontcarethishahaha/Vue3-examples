<script lang="ts" setup>
import OrderCostVue from '@/views/example03/OrderCostVue.vue'
</script>

<template>
  <div class="container">
    <h1>Experiment</h1>
    <nav class="tabs">
      <router-link to="/example03">美食</router-link>
      |
      <router-link to="/example03/location">本地</router-link>
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
.tabs {
  padding: 1rem;
  background: #f5f5f5;
}
.content {
  flex: 1;
  padding: 1rem;
}
</style>
