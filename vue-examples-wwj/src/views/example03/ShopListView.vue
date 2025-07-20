<template>
  <div class="shop-list">
    <h2>附近的美食</h2>
    <div v-for="shop in shops" :key="shop.id" class="shop-card">
      <router-link :to="`/example03/shops/${shop.id}`">
        <h3>{{ shop.name }}</h3>
        <p>评分：{{ shop.point }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Shop } from './data/dataSource' // 导入 Shop 类型
import { listShopsService } from './service'

// 明确指定 ref 的类型为 Shop[]
const shops = ref<Shop[]>([])

listShopsService().then(res => {
  shops.value = res.value
})
</script>

<style scoped>
.shop-card {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
