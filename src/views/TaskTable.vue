<script setup lang="ts">
import ComplexTable from '@/components/ComplexTable.vue'
// import { computed } from 'vue'
const props = defineProps({
  projectId: String,
  projectTitle: String,
})

// const tableHeader = computed(() => props.projectTitle)
</script>

<template>
  <div class="main">
    <h1>{{ props.projectTitle }}</h1>
    <ComplexTable storeName="Task" filter="props.projectId" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
