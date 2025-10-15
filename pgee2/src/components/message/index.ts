import { ElNotification } from 'element-plus'
import { defineAsyncComponent, h, render } from 'vue'

//创建消息对话框
export const createMessageDialog = (msg: string, close: () => void = () => {}) => {
  //导入对话框组件
  const node = h(
    defineAsyncComponent(() => import('./ConfirmMessage.vue')),
    { message: msg, close }
  )
  //渲染到body
  render(node, document.body)
}

//创建成功通知
export const createElNotificationSuccess = (msg: string) => {
  ElNotification({
    title: 'Success',
    message: msg,
    type: 'success'
  })
}
