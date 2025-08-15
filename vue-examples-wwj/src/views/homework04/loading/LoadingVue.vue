<template>
<<<<<<< HEAD
  <dialog class="loading-modal" ref="dialogRef">
    <div class="loading-content">
      <img :src="loadingImage" alt="loading" class="loading-image" />
      <p class="loading-text">努力加载中...</p>
=======
  <div class="loading">
    <div class="loading-content">
      <img src="@/assets/whitecat_3.gif" alt="loading" class="loading-image" />
      <p class="loading-text">加载中...</p>
>>>>>>> 8cb4115fa6cd7edb43a37e1362f181d3ee016cfd
    </div>
  </dialog>
</template>

<script setup lang="ts">
import loadingImage from '@/assets/whitecat_3.gif' // 确保路径正确
import { onMounted, ref } from 'vue'

const dialogRef = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  dialogRef.value?.showModal()
})

const close = () => {
  dialogRef.value?.close()
}

defineExpose({ close })
</script>

<style scoped>
.loading-modal {
  position: fixed;
<<<<<<< HEAD
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  /* 缩小模态框宽度，可根据实际需求调整，比如改成 300px 等固定值 */
  width: 280px;
  padding: 16px; /* 减少内边距，让模态框更紧凑 */
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15); /* 阴影适度缩小，更精致 */
  z-index: 9999;
}

.loading-image {
  /*width: 80px;*/
  height: 150px;
  display: block;
  margin: 0 auto 12px;
=======
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgba(172, 197, 248, 0.3), rgba(231, 168, 199, 0.3));
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
>>>>>>> 8cb4115fa6cd7edb43a37e1362f181d3ee016cfd
}

.loading-content {
  text-align: center;
  color: #333;
  margin: 0;
}

<<<<<<< HEAD
.loading-modal::backdrop {
  background: linear-gradient(45deg, pink, lightblue);
=======
.loading-image {
  width: 100px;
  height: 100px;
}

.loading-text {
  margin-top: 16px;
  color: #333;
  font-size: 16px;
>>>>>>> 8cb4115fa6cd7edb43a37e1362f181d3ee016cfd
}
</style>
