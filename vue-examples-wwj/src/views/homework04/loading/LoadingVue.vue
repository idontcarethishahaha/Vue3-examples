<template>
  <dialog class="loading-modal" ref="dialogRef">
    <div class="loading-content">
      <img :src="loadingImage" alt="loading" class="loading-image" />
      <p class="loading-text">全力加载中...</p>
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
}

.loading-text {
  text-align: center;
  color: #333;
  margin: 0;
}

.loading-modal::backdrop {
  background: linear-gradient(45deg, pink, lightblue);
}
</style>
