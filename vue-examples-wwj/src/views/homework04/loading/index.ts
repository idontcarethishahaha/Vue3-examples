import { defineAsyncComponent, h, render } from 'vue'

export const createLoading = () => {
  const LoadingComponent = defineAsyncComponent(() => import('./LoadingVue.vue'))
  const vnode = h(LoadingComponent)

  render(vnode, document.body)

  const close = () => {
    const instance = vnode.component
    if (instance) {
      instance.exposed?.close()
    }
    render(null, document.body)
  }

  return { close }
}
