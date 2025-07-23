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

const currentComponent = computed(() => components[activeIndex.value].component)

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
