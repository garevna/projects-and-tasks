<script setup lang="ts">
import type { GoTo, TasksInfoType } from '@/types'
import type { Reactive } from 'vue'
import { computed, inject } from 'vue'

import {
  injectionKeyForCurrent,
  injectionKeyTaskInfoForPerformers,
  injectionKeyTaskInfoForProjects,
} from '@/composables'
import { TaskInfo, TaskInfoClass, TaskInfoHeaders } from '@/configs'

const current: Reactive<GoTo> = inject(injectionKeyForCurrent) as Reactive<GoTo>
// const route = computed(() => current.route)
const taskInfoForProjects: { [key: string]: TasksInfoType } = inject(
  injectionKeyTaskInfoForProjects,
) as { [key: string]: TasksInfoType }
const taskInfoForPerformers: { [key: string]: TasksInfoType } = inject(
  injectionKeyTaskInfoForPerformers,
) as { [key: string]: TasksInfoType }

const props = defineProps({
  recordId: {
    type: String,
    required: true,
  },
})

const taskInfoSource = computed(() =>
  current.route === 'Project' ? taskInfoForProjects : taskInfoForPerformers,
)

const taskInfo = computed(() => {
  const res = taskInfoSource.value ? taskInfoSource.value[props.recordId] : null
  if (res) {
    const [one, two, three, four] = [TaskInfo[0], TaskInfo[1], TaskInfo[2], TaskInfo[3]] as Array<
      keyof TasksInfoType
    >
    return [res[one] || 0, res[two] || 0, res[three] || 0, res[four] || 0]
  } else {
    return [0, 0, 0, 0]
  }
})
</script>

<template>
  <div class="tasks-info-container">
    <span
      v-for="(value, index) in taskInfo"
      :key="index"
      v-tooltip="{ text: TaskInfoHeaders[index] }"
      :class="!index || value ? TaskInfoClass[index] : 'invisible-item'"
    >
      {{ value }}
    </span>
  </div>
</template>

<style scoped>
.tasks-info-container {
  cursor: pointer;
}

.invisible-item {
  display: none;
}

.total-tasks,
.finished-tasks,
.behind-schedule,
.must-be-finished-today {
  padding: 4px 8px;
  border-radius: 4px;
}

.total-tasks {
  border: solid 1px var(--vt-c-text-light-2);
  color: var(--vt-c-text-light-2);
  background: var(--vt-c-white-mute);
}
.finished-tasks {
  border: solid 1px var(--vt-c-green-light);
  color: var(--vt-c-green-light);
  background: var(--vt-c-green-light-opacity);
}
.behind-schedule {
  border: solid 1px var(--vt-c-error);
  color: var(--vt-c-error);
  background: var(--vt-c-error-opacity);
}
.must-be-finished-today {
  border: solid 1px var(--vt-c-orange-dark);
  color: var(--vt-c-orange-dark);
  background: var(--vt-c-orange-opacity);
}
</style>
