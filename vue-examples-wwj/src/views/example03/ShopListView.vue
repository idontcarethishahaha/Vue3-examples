<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Shops } from './data/dataSource'
import { listShopsService } from './service'

const shopsR = shallowRef<Shops[]>([])

listShopsService().then(res => {
  shopsR.value = res.value
})
</script>

<template>
  <div class="shop-list">
    <div class="grid">
      <div v-for="shop of shopsR" :key="shop.id" class="card">
        <router-link :to="`/example03/shops/${shop.id}`">
          <div class="img-container">
            <img v-if="shop.img" :src="shop.img" :alt="shop.name" />
          </div>
          <div class="info">
            <h3>{{ shop.name }}</h3>
            <div>
              <div>⭐ {{ shop.score }}</div>
              <div v-if="shop.phone">📞 {{ shop.phone }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 1.5rem 0;
  color: #333;
  font-size: 1.8rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

a {
  text-decoration: none;
  color: inherit;
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

.img-container div {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
