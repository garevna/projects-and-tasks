<script setup lang="ts">
// import ProjectTable from './views/ProjectTable.vue'
import ComplexTable from '@/components/ComplexTable.vue'
import { useProjectStore, useTaskStore } from '@/stores/index'

import { onBeforeMount /* ref, computed */ } from 'vue'

onBeforeMount(async () => {
  const [projectStore, taskStore] = [useProjectStore(), useTaskStore()]

  const promises = [projectStore, taskStore].map((store) => store.fetchRecords())
  await Promise.all(promises)
  taskStore.calcTasksForProjects()
  projectStore.updateTasks()
})

// const route = ref('Project')
// const project = ref(null)
// const route = computed(() => (project.value ? 'Task' : 'Project'))

// const key = Symbol('api') as InjectionKey<string>

// provide(key, 'http://localhost:3000/')
</script>

<template>
  <ComplexTable />
</template>
