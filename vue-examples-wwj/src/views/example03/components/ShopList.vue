<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Shops } from '../data/dataSource'
import { listShopsService } from '../service'

const router = useRouter()
const shops = ref<Shops[]>([])

onMounted(async () => {
  const result = await listShopsService()
  shops.value = Array.isArray(result) ? result : []
})

const goToShop = (shopId: string) => {
  router.push(`/example03/shop/${shopId}`)
}
</script>

<template>
  <div class="shop-list">
    <div v-for="shop in shops" :key="shop.id" class="shop-item">
      <div @click="goToShop(shop.id)">
        <img :src="shop.img" :alt="shop.name" class="shop-image" />
        <div class="shop-info">
          <h3>{{ shop.name }}</h3>
          <p>评分: {{ shop.score }} | 配送费: ¥{{ shop.deliveryFee }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.shop-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}
.shop-item a {
  text-decoration: none;
  color: inherit;
}
.shop-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.shop-info {
  padding: 10px;
}
</style>
