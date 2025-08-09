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
<<<<<<< HEAD
    <div class="loading-content">
      <img src="@/assets/whitecat_3.gif" alt="loading" class="loading-image" />
      <p class="loading-text">加载中...</p>
    </div>
=======
    <img style="margin: 200px auto; display: block" src="@/assets/whitecat_3.gif" alt="" />
>>>>>>> a16da92fd63c060498901191156b8b582c2af417
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
<<<<<<< HEAD
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgba(172, 197, 248, 0.3), rgba(231, 168, 199, 0.3));
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-content {
  text-align: center;
}

.loading-image {
  width: 100px;
  height: 100px;
}

.loading-text {
  margin-top: 16px;
  color: #333;
  font-size: 16px;
=======
  background: linear-gradient(135deg, rgba(172, 197, 248, 0.3), rgba(231, 168, 199, 0.3));
  background-size: cover;
>>>>>>> a16da92fd63c060498901191156b8b582c2af417
}
</style>
