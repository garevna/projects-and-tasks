<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useProjectStore } from '@/stores'
import type { ProjectTasksInfo } from '@/types'

import { TaskInfo, TaskInfoHeaders, TaskInfoClass } from '@/configs'

const { tasksInfo: sourceTaskInfo } = storeToRefs(useProjectStore())
console.log('TASK INFO:\n', sourceTaskInfo)
// const { ready, tasksInfo } = storeToRefs(taskStore)

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
})

const taskInfo = computed(() => {
  if (!sourceTaskInfo) return []
  const res = sourceTaskInfo.value[props.projectId]
  if (res) {
    const [one, two, three, four] = [TaskInfo[0], TaskInfo[1], TaskInfo[2], TaskInfo[3]] as Array<
      keyof ProjectTasksInfo
    >
    return [res[one] || 0, res[two] || 0, res[three] || 0, res[four] || 0]
  } else {
    return [0, 0, 0, 0]
  }
})
watch(sourceTaskInfo, () => {
  console.log('TASK INFO BEFORE UPDATE:\n', sourceTaskInfo)
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
.current-tasks {
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
.current-tasks {
  border: solid 1px var(--vt-c-orange-dark);
  color: var(--vt-c-orange-dark);
  background: var(--vt-c-orange-opacity);
}
</style>
