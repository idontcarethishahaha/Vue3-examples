import { defineAsyncComponent, h, render } from 'vue'

export const createLoading = () => {
  const LoadingComponent = defineAsyncComponent(() => import('./LoadingVue.vue'))
  const vnode = h(LoadingComponent)

  render(vnode, document.body)

  const close = () => {
    render(null, document.body)
  }
  return { close }
}
