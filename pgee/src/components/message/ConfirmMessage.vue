<template>
  <div class="message-dialog">
    <div class="dialog-content">
      <p>{{ message }}</p>
      <button @click="handleClose">确认</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { render } from 'vue'

// 定义组件接收的参数
const props = defineProps<{
  message: string
  close: () => void
}>()

// 关闭对话框
const handleClose = () => {
  // 调用外部传入的close回调
  props.close()
  // 清除当前组件渲染的DOM（假设组件根元素有唯一标识）
  const dialogEl = document.querySelector('.message-dialog')
  if (dialogEl) {
    render(null, dialogEl.parentElement!)
  }
}
</script>

<style scoped></style>
