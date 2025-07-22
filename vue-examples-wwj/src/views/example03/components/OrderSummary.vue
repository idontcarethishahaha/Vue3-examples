<script setup lang="ts">
import { computed } from 'vue'
import type { Order } from '../data/dataSource'
import { useStore } from '../store'

const props = defineProps<{
  shopId: string
}>()

const store = useStore()

const order = computed(() => store.orders.value.find((o: Order) => o.shopId === props.shopId))

const subtotal = computed(
  () => order.value?.items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0) || 0
)

const deliveryFee = computed(() => order.value?.deliveryFee || 0)
const total = computed(() => subtotal.value + deliveryFee.value)
</script>

<template>
  <div class="order-summary">
    <div class="summary-item">
      <span>商品小计:</span>
      <span>¥{{ subtotal.toFixed(2) }}</span>
    </div>
    <div class="summary-item">
      <span>配送费:</span>
      <span>¥{{ deliveryFee.toFixed(2) }}</span>
    </div>
    <div class="summary-total">
      <span>总计:</span>
      <span>¥{{ total.toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped>
.order-summary {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background: #f8f8f8;
  padding: 10px;
  border-top: 1px solid #eee;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}
</style>
