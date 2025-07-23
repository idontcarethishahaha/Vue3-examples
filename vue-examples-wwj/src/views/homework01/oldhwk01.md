旧版本

```
<script setup lang="ts">
import { defineAsyncComponent, ref, shallowRef, watch, type Component } from 'vue'

interface LabelStyle {
  color: string
  'text-decoration': string
  background: string
  padding: string
  'border-radius': string
}

const components: { name: string; component: Component }[] = [
  {
    name: '添加用户',
    component: defineAsyncComponent(() => import('./AddUser.vue'))
  },
  {
    name: '移除用户',
    component: defineAsyncComponent(() => import('./DelUser.vue'))
  },
  {
    name: '更新用户',
    component: defineAsyncComponent(() => import('./UpdateUser.vue'))
  }
]
const defaultIndex = 0
const currentIndexR = ref(defaultIndex)
const currentComponentR = shallowRef(components[defaultIndex].component)

const styles: LabelStyle[] = []

const activeStyle: LabelStyle = {
  color: 'white',
  'text-decoration': 'underline',
  background: '#1e88e5',
  padding: '8px 16px',
  'border-radius': '5px'
}
const inactiveStyle: LabelStyle = {
  color: 'black',
  'text-decoration': 'none',
  background: '#e3f2fd',
  padding: '8px 16px',
  'border-radius': '5px'
}
watch(
  currentIndexR,
  cIndex => {
    components.forEach((c, index) => {
      styles[index] = inactiveStyle
      if (cIndex === index) {
        currentComponentR.value = components[cIndex].component
        styles[index] = activeStyle
      }
    })
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <h1>Homework - 组件动态切换</h1>
    <p>
      <span
        v-for="(c, index) of components"
        :key="index"
        @click="currentIndexR = index"
        class="label"
        :style="{ ...styles[index] }">
        {{ c.name }}
      </span>
    </p>
    <component :is="currentComponentR" />
  </div>
</template>
<style scoped>
.label {
  cursor: pointer;
  margin-right: 10px;
}
</style>

```

2.0版本

```
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

const components = [
  { name: '添加用户', component: defineAsyncComponent(() => import('./AddUser.vue')) },
  { name: '移除用户', component: defineAsyncComponent(() => import('./DelUser.vue')) },
  { name: '更新用户', component: defineAsyncComponent(() => import('./UpdateUser.vue')) }
]

const activeIndex = ref(0)

const activeStyle = {
  color: 'white',
  'text-decoration': 'underline',
  background: '#1e88e5',
  padding: '8px 16px',
  'border-radius': '5px'
}

const inactiveStyle = {
  color: 'black',
  'text-decoration': 'none',
  background: '#e3f2fd',
  padding: '8px 16px',
  'border-radius': '5px'
}

// 计算当前活动组件
const currentComponent = computed(() => components[activeIndex.value].component)

// 计算每个标签的样式
const labelStyles = computed(() =>
  components.map((_, index) => (index === activeIndex.value ? activeStyle : inactiveStyle))
)
</script>

<template>
  <div>
    <h1>Homework - 组件动态切换</h1>
    <p>
      <span
        v-for="(comp, index) in components"
        :key="index"
        @click="activeIndex = index"
        class="label"
        :style="labelStyles[index]">
        {{ comp.name }}
      </span>
    </p>
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.label {
  cursor: pointer;
  margin-right: 10px;
}
</style>

```
