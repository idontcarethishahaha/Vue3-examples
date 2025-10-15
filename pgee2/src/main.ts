import { createMessageDialog } from '@/components/message'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.errorHandler = err => {
  const error = err as string
  console.error(error)
  createMessageDialog(error)
}

//全局promise异常处理
window.addEventListener('unhandledrejection', event => {
  event.preventDefault()
  console.error('Unhandled promise rejection:', event.reason)
  createMessageDialog(event.reason?.message || String(event.reason))
})
