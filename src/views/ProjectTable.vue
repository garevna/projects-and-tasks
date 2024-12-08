<script setup lang="ts">
import { onBeforeMount } from 'vue'
import ConfiguredTable from '@/components/ConfiguredTable.vue'
import { projectHeaders } from '@/configs/projectHeaders'
import { useProjectStore } from '@/stores/projects'

const store = useProjectStore()

onBeforeMount(async () => {
  await store.getProjects()
})
</script>

<template>
  <main>
    <ConfiguredTable :headers="projectHeaders" />
  </main>
</template>
