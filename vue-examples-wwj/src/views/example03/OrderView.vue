<script lang="ts" setup>
//import { computed } from 'vue'
import { getOrdersService } from './service'
// 这里可以不使用computed，因为getOrdersService()返回的是一个ref对象，而ref对象本身就是响应式的
//const ordersS = computed(() => getOrdersService().value)
const ordersS = getOrdersService()
</script>

<template>
  <div class="container">
    <h2 class="title">我的订单</h2>
    <div class="list">
      <div v-for="(o, index) of ordersS" :key="index" class="item">
        <img v-if="o.item.img" :src="o.item.img" class="image" />
        <div>
          <h3>{{ o.item.name }}</h3>
          <div>
            <span>单价: ¥{{ o.item.price }}</span>
            <span>× {{ o.quantity }}</span>
          </div>
        </div>
        <div class="total">¥{{ (o.item.price * o.quantity).toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.list {
  border-top: 1px solid #eee;
}

.item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  gap: 1rem;
}

.image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.total {
  font-weight: bold;
  color: #7baad7;
}
</style>
