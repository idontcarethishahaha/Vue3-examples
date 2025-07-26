<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { useShopLogic } from './ShopViewLogic'
import type { Shops } from './data/dataSource'

const route = useRoute()
const shop = shallowRef<Shops>()
const { loadShop } = useShopLogic(route.params.id as string)

loadShop().then(data => {
  shop.value = data
})
</script>

<template>
  <div class="grid">
    <div class="card">
      <router-link :to="`/shops/${shop?.id}`">
        <img :src="shop?.img" :alt="shop?.name" class="image" />
        <div class="info">
          <h3>{{ shop?.name }}</h3>
          <div>⭐ {{ shop?.score }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.info {
  padding: 12px;
}
</style>
