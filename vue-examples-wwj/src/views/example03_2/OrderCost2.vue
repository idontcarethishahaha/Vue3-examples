<script setup lang="ts">
import { computed } from 'vue'
import { getOrdersService } from './service/index2.ts'
/*
直接从 useShopstore 解构 ordersS,TS 需要直接分析 useShopstore 的返回值类型
const { ordersS } = useShopstore()
从自定义的store获取数据，要显式定义类型

view找service要数据
*/
// 无需显式类型,TS间接推断类型
const ordersS = getOrdersService()
const totalCostC = computed(() =>
  ordersS.value.reduce((sum, cur) => sum + cur.quantity * (cur.item.price ?? 0), 0)
)
const orderCountC = computed(() => ordersS.value.length)
</script>

<template>
  <router-link to="/example03_2/orders2" class="notice" v-if="orderCountC > 0">
    <span class="text">小计:</span>
    <!--会有精度问题，要使用toFixed(2)保留两位小数-->
    <span class="total">¥{{ totalCostC.toFixed(2) }}</span>
    <span class="text">(点击查看订单详情)</span>
  </router-link>
</template>

<style scoped>
.notice {
  display: inline-block;
  padding: 10px 16px;
  background: #a0ceef;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  margin: 8px 0;
}

.text {
  margin-right: 6px;
  font-size: 14px;
}

.total {
  font-weight: bold;
  font-size: 16px;
}
</style>
