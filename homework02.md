# 旧的，还没改
### 异步组件

```ts
import { defineAsyncComponent } from 'vue'

const DepartmentTeacherVue = defineAsyncComponent(() => import('./DepartmentTeacherVue.vue'))
const LoadingVue = defineAsyncComponent(() => import('@/components/LoadingVue.vue'))
```

[异步组件](https://cn.vuejs.org/guide/components/async.html)

### v-if 条件渲染

[条件渲染](https://cn.vuejs.org/guide/essentials/conditional.html)

### 生命周期钩子

src/views/homework02/DepartmentTeacherVue.vue

```ts
onMounted(() => {
  loadDepartments()
})
```

[生命周期钩子](https://cn.vuejs.org/guide/essentials/lifecycle.html)
