<template>
  <div class="index-view">
    <nav>
      <router-link to="/example03">店铺列表</router-link>
      <router-link to="/example03/location">位置</router-link>
    </nav>

    <router-view></router-view>

    <OrderCost />
  </div>
</template>

<script setup lang="ts">
import OrderCost from '../components/OrderCost.vue'
</script>

<style scoped>
.index-view {
  padding: 20px;
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
}
</style>
