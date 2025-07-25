<template>
  <div class="shop-list">
    <h2 class="title">附近的美食</h2>
    <div class="shop-grid">
      <div v-for="shop in shops" :key="shop.id" class="shop-card">
        <router-link :to="`/example03/shops/${shop.id}`" class="shop-link">
          <div class="shop-image-container">
            <img v-if="shop.img" :src="shop.img" :alt="shop.name" class="shop-image" />
            <div v-else class="image-placeholder">
              <span>暂无图片</span>
            </div>
          </div>
          <div class="shop-info">
            <h3 class="shop-name">{{ shop.name }}</h3>
            <div class="shop-meta">
              <div class="rating">
                <span>⭐</span>
                <span>{{ shop.score }}</span>
              </div>
              <div v-if="shop.phone" class="phone">
                <span class="icon">📞</span>
                <span>{{ shop.phone }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import type { Shops } from './data/dataSource'
import { listShopsService } from './service'

const shops = shallowRef<Shops[]>([])

listShopsService().then(res => {
  shops.value = res.value
})
</script>

<style scoped>
.title {
  text-align: center;
  margin: 1.5rem 0;
  color: #333;
  font-size: 1.8rem;
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.shop-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.shop-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.shop-link {
  text-decoration: none;
  color: inherit;
}

.shop-image-container {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.shop-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.shop-card:hover .shop-image {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.shop-info {
  padding: 1rem;
}

.shop-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shop-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rating,
.phone {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #666;
}

.icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .shop-grid {
    grid-template-columns: 1fr;
  }

  .shop-image-container {
    height: 150px;
  }
}
</style>
