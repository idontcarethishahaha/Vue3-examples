<script setup lang="ts">
import { computed } from 'vue'
import { store } from './store'

const totalC = computed(() => store.orders.reduce((sum, o) => sum + o.item.price * o.quantity, 0))
</script>

<template>
  <router-link v-if="store.orders.length > 0" to="/orders" class="total">
    合计: ¥{{ totalC }}
  </router-link>
</template>

<style scoped>
.total {
  display: inline-block;
  padding: 8px 12px;
  background: #4a90e2;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}
</style>
