import { defineAsyncComponent, h, render } from 'vue'

export const createLoading = () => {
  // 异步导入 Loading 组件
  const LoadingComponent = defineAsyncComponent(() => import('./LoadingVue.vue'))
  const vnode = h(LoadingComponent)

  // 渲染到 body（或其他容器）
  render(vnode, document.body)

  // 获取组件实例，调用暴露的 close 方法
  const close = () => {
    const instance = vnode.component
    if (instance) {
      instance.exposed?.close()
    }
    // 清空渲染
    render(null, document.body)
  }

  return { close }
}
