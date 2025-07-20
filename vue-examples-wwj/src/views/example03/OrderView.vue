<template>
  <div>
    <div v-for="(o, index) of orders" :key="index">{{ o.item.name }} / {{ o.quantity }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getOrdersService } from './service'
const orders = computed(() => getOrdersService().value)
</script>
