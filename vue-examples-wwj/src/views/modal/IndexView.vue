<template>
  <div class="modal" :class="{ active: isActiveR }" @click="handleBackdropClick">
    <div class="modal-backdrop"></div>
    <div class="modal-dialog" @click.stop>
      <!--dialog对话框，stop阻止事件冒泡-->
      <div class="modal-content">
        <p class="loading-text">我是一个模态框</p>
        <img src="@/assets/whitecat_3.gif" alt="loading" class="loading-image" />
        <div>
          <button class="close-btn" @click="handleClose">close</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h1>Modal 示例</h1>
    <p>点击下方的"click me"按钮即可开启模态框,这里提供三种关闭方式:</p>
    <ol>
      <li>点击内容区的close按钮</li>
      <li>点击背景层部分(点击dialog部分不会关闭)</li>
      <li>按下键盘的"Esc"</li>
    </ol>
    <button class="open-btn" @click="openModal">click me</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isActiveR = ref(false)

const openModal = () => {
  isActiveR.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isActiveR.value = false
  document.body.style.overflow = ''
}

const handleBackdropClick = () => closeModal() //点击背景遮罩层(冒泡到外层.modal)关闭
const handleClose = () => closeModal() //点击close按钮关闭
//按Esc关闭
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isActiveR.value) {
    closeModal()
  }
}
</script>

<style scoped>
.open-btn {
  display: block;
  margin: auto auto;
  height: 40px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.open-btn:hover {
  background-color: #46a7e9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  display: none; /*隐藏*/
}

/*激活时显示*/
.modal.active {
  display: block;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 192, 203, 0.3), rgba(173, 216, 230, 0.3));
  cursor: pointer;
}

.modal-dialog {
  position: relative;
  width: auto;
  max-width: 280px;
  margin: 100px auto;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-image {
  height: 150px;
  display: block;
  margin: 0 auto 12px;
}

.loading-text {
  text-align: center;
  margin: 0 0 15px 0;
}

.close-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
