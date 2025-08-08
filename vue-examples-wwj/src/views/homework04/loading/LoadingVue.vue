<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => (document.body.style.overflow = 'hidden'))
onUnmounted(() => (document.body.style.overflow = ''))
</script>
<template>
  <div class="loading">
    <img style="margin: 200px auto; display: block" src="@/assets/whitecat_3.gif" alt="" />
  </div>
</template>
<style scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(135deg, rgba(172, 197, 248, 0.3), rgba(231, 168, 199, 0.3));
  background-size: cover;
}
</style>
