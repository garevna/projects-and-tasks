<script setup lang="ts">
import { onBeforeMount } from 'vue'
import ComplexTable from '@/components/ComplexTable.vue'
// import { projectHeaders } from '@/configs/projectHeaders'
import { useProjectStore } from '@/stores/projects'

// const store = useProjectStore()

onBeforeMount(async () => {
  await useProjectStore().updateTasks()
})
</script>

<template>
  <main>
    <ComplexTable storeName="Project" />
  </main>
</template>
