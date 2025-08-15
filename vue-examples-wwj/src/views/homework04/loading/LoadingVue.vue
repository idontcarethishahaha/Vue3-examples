<template>
  <dialog class="loading-modal" ref="dialogRef">
    <div class="loading-content">
      <img :src="loadingImage" alt="loading" class="loading-image" />
      <p class="loading-text">全力加载中...</p>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import loadingImage from '@/assets/whitecat_3.gif'
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
  width: 280px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
}

.loading-image {
  height: 150px;
  display: block;
  margin: 0 auto 12px;
}

.loading-text {
  text-align: center;
  margin: 0;
}

.loading-modal::backdrop {
  background: linear-gradient(45deg, rgba(255, 192, 203, 0.3), rgba(173, 216, 230, 0.3));
}
</style>
