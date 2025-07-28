<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Shop } from './data/dataSource2'
import { listShopsService } from './service/index2.ts'

const shopListR = shallowRef<Shop[]>([])

listShopsService().then(r => (shopListR.value = r.value))
</script>

<template>
  <div class="grid">
    <div v-for="shop of shopListR" :key="shop.id" class="card">
      <router-link :to="`/example03_2/shops2/${shop.id}`">
        <div class="img-container">
          <img v-if="shop.img" :src="shop.img" :alt="shop.name" />
        </div>
        <div class="info">
          <h3>{{ shop.name }}</h3>
          <div>⭐ {{ shop.score }}</div>
          <div v-if="shop.phone">📞 {{ shop.phone }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.img-container {
  height: 180px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05);
}

.info {
  padding: 1rem;
}

.info h3 {
  margin: 0 0 0.5rem;
}
</style>
