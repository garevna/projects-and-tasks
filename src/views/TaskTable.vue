<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  projectId: String,
})

const tableHeader = computed(() => props.projectId)
</script>

<template>
  <div class="main">
    <h1>{{ tableHeader }}</h1>
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
