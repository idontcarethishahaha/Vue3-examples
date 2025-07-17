<script setup lang="ts">
import LoadingVue from '@/components/LoadingVue.vue'
import { onMounted, ref, watch, type Ref } from 'vue'
import { listDepartmentsService, listTeachersService } from './dataServices'
import type { Department, Teacher } from './Types'

const departmentR = ref<Department>({})
const teacherR = ref<Teacher>({})
const departmentsR = ref<Department[]>([])
const teachersR = ref<Teacher[]>([])
const isLoadingR = ref(false)

defineExpose<{
  teacher: Ref<Teacher>
}>({
  teacher: teacherR
})

const loadDepartments = async () => {
  isLoadingR.value = true
  const result = await listDepartmentsService()
  departmentsR.value = result
  isLoadingR.value = false
}

watch(departmentR, async newDep => {
  teacherR.value = {}
  teachersR.value = []

  if (newDep) {
    isLoadingR.value = true
    const result = await listTeachersService(newDep.id!)
    teachersR.value = result
    isLoadingR.value = false
  }
})

onMounted(() => {
  loadDepartments()
})
</script>

<template>
  <div>
    <select style="margin-right: 10px" v-model="departmentR">
      <option :value="{}">请选择部门</option>
      <option v-for="d in departmentsR" :key="d.id" :value="d">{{ d.name }}</option>
    </select>

    <select v-if="teachersR.length > 0" v-model="teacherR">
      <option :value="{}">请选择教师</option>
      <option v-for="t in teachersR" :key="t.id" :value="t">{{ t.name }}</option>
    </select>

    <div v-else-if="isLoadingR">
      <LoadingVue />
    </div>

    <div v-else-if="departmentR && !teachersR.length" class="text-muted">该部门下暂无教师数据</div>
  </div>
</template>

<style scoped>
select {
  border: 1px solid #ccc;
  padding: 5px;
}
.text-muted {
  color: #666;
  margin: 5px;
}
</style>
