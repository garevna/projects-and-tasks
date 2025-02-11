<script setup lang="ts">
import IconSet from './IconSet.vue'

import { injectionKeyForCurrent, injectionKeyForNext, injectionKeyForPrevious } from '@/composables'
import type { Reactive } from 'vue'
import { computed, inject } from 'vue'

import type { GoTo } from '@/types'

import DraggableRowsTable from './DraggableRowsTable.vue'

const current = inject(injectionKeyForCurrent) as Reactive<GoTo>
const next = inject(injectionKeyForNext) as Reactive<GoTo>
const previous = inject(injectionKeyForPrevious) as Reactive<GoTo>

// const store = computed(() => getStore(current.route))

function goBack() {
  Object.assign(next, previous)
  Object.assign(previous, current)
}

const from = computed(
  () => current.subroute.startsWith('?projectId') || current.subroute.startsWith('?performerId'),
)
</script>

<template>
  <h3 class="flex-caption">
    <template v-if="from">
      <IconSet iconName="return" :iconSize="32" v-tooltip="{ text: 'Back' }" @click="goBack" />
    </template>
    {{ current.caption }}
  </h3>
  <DraggableRowsTable />
</template>

<style scoped>
h3 {
  color: var(--vt-c-green);
  font-weight: bold;
  text-align: center;
}

.flex-caption {
  max-width: 960px;
  margin: 16px auto;
  text-align: center;
}
</style>
