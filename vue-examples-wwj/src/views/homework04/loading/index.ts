import { createApp, h } from 'vue'
import LoadingVue from './LoadingVue.vue'

interface LoadingInstance {
  close: () => void
}

let loadingInstance: LoadingInstance | null = null

export const createLoading = (): LoadingInstance => {
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
