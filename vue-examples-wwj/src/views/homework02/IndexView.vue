<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { Teacher } from './Types'

const DepartmentTeacherVue = defineAsyncComponent(() => import('./DepartmentTeacherVue.vue'))
const LoadingVue = defineAsyncComponent(() => import('@/components/LoadingVue.vue'))

const departExpose = ref<{
  teacher: Teacher
}>()
</script>

<template>
  <div>
    <h1>Homework - 封装暴露组件数据对象</h1>
    <p>
      选择的教师：
      <span v-if="departExpose?.teacher">
        {{ departExpose.teacher.name }} / {{ departExpose.teacher.id }}
      </span>
    </p>

    <div>
      <suspense>
        <template #default>
          <DepartmentTeacherVue ref="departExpose" />
        </template>
        <template #fallback>
          <LoadingVue />
        </template>
      </suspense>
    </div>
  </div>
</template>
