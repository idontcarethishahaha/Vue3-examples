<template>
  <div class="order-view">
    <div v-for="order in orders" :key="order.shopId" class="shop-order">
      <h2>{{ order.shopName }}</h2>

      <div v-for="{ item, quantity } in order.items" :key="item.id" class="order-item">
        <h3>{{ item.name }}</h3>
        <p>单价: ¥{{ item.price.toFixed(2) }}</p>
        <p>数量: {{ quantity }}</p>
        <p>小计: ¥{{ (item.price * quantity).toFixed(2) }}</p>
      </div>

      <div class="order-fee">
        <p>配送费: ¥{{ order.deliveryFee.toFixed(2) }}</p>
      </div>

      <div class="order-total">
        <p>
          店铺总计: ¥{{
            (
              order.items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0) +
              order.deliveryFee
            ).toFixed(2)
          }}
        </p>
      </div>
    </div>

    <div class="final-total">
      <h3>订单总价: ¥{{ totalCost.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getOrdersService, getTotalCostService } from '../service'

const orders = getOrdersService()
const totalCost = getTotalCostService()
</script>

<style scoped>
.shop-order {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.order-item {
  margin: 15px 0;
}
.order-fee {
  text-align: right;
  margin: 10px 0;
}
.order-total {
  text-align: right;
  font-weight: bold;
  margin: 15px 0;
}
.final-total {
  text-align: right;
  font-size: 1.2em;
  margin-top: 20px;
}
</style>
