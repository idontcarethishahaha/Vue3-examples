<script setup lang="ts">
import { addItem, getItemQuantity, getShopData, removeItem, shopR } from './ShopViewLogic.ts'
getShopData().then(shop => {
  console.log('店铺数据加载完成~', shop)
})
</script>

<template>
  <div>
    <h3 style="margin: 0">{{ shopR?.name }}</h3>
    <div v-for="(item, index) of shopR?.items" :key="index" class="item">
      <img :src="item.img" :alt="item.name" />
      <div>
        <h4>{{ item.name }}</h4>
        <p>价格：¥{{ item.price }}</p>
        <p>月销量：{{ item.sales }}</p>
        <div>
          <button @click="removeItem(item)">-</button>
          <span>{{ getItemQuantity(item) }}</span>
          <button @click="addItem(item)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.item > div {
  flex: 1;
}

.item > div > div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #e0e0e0;
}
</style>
