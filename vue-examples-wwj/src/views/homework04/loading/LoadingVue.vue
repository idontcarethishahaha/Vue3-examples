<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'relative'
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.style.position = ''
})
</script>

<template>
  <div class="loading">
    <div class="loading-text">
      <img src="@/assets/whitecat_3.gif" alt="loading" class="loading-image" />
      <p>全力加载中...</p>
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgba(172, 197, 248, 0.3), rgba(231, 168, 199, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-text {
  text-align: center;
}

.loading-image {
  width: 100px;
}
</style>
