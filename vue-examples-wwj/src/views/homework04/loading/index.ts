import { createApp, h } from 'vue'
import LoadingVue from './LoadingVue.vue'

// 1. 首先定义返回类型接口
interface LoadingInstance {
  close: () => void
}

// 2. 使用明确的类型替代ReturnType
let loadingInstance: LoadingInstance | null = null

export const createLoading = (): LoadingInstance => {
  // 如果已存在实例，直接返回
  if (loadingInstance) {
    return loadingInstance
  }

  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(LoadingVue)
    }
  })

  const close = () => {
    if (loadingInstance) {
      app.unmount()
      document.body.removeChild(container)
      loadingInstance = null
    }
  }

  app.mount(container)
  loadingInstance = { close }

  return loadingInstance
}
