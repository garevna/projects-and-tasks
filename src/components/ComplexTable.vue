<script setup lang="ts">
import ToggleSwitch from './ToggleSwitch.vue'
import IconSet from './IconSet.vue'

import { useProjectStore, useTaskStore } from '@/stores'
import { computed, onBeforeMount, ref, watch } from 'vue'

import type { ProjectHeader, TaskHeader, Modified } from '@/types'

import { updateRecords } from '@/utils'

import { projectHeaders, taskHeaders } from '@/configs/index'

import DraggableRowsTable from './DraggableRowsTable.vue'

const route = ref('')

const projectId = ref('')
const projectTitle = ref('')

const projectStore = useProjectStore()
const taskStore = useTaskStore()

watch(projectId, (newVal: string, oldVal: string) => {
  console.log(newVal, oldVal)
  if (!newVal) {
    route.value = 'Project'
  } else {
    route.value = 'Task'
    taskStore.updateProjectId(newVal)
  }
  mode.value = 'Drag'
})

const moveCallback = computed(
  () =>
    (route.value === 'Project' ? projectStore.moveItem : taskStore.moveItem) as (
      arg: object,
    ) => void,
)
const updateField = computed(
  () =>
    (route.value === 'Project' ? projectStore.updateField : taskStore.updateField) as (
      modified: Modified,
    ) => void,
)

const items = computed(() => (route.value === 'Project' ? projectStore.records : taskStore.records))

function getHeaders() {
  if (route.value === 'Project') {
    return projectHeaders as ProjectHeader[]
  } else {
    if (route.value === 'Task') {
      return taskHeaders as TaskHeader[]
    }
  }
}

const headers = computed(getHeaders)

const computedItems = computed({
  get: () => items.value,
  set: (data) => updateRecords(data),
})

function save() {
  if (route.value === 'Project') {
    projectStore.saveAll()
  } else if (route.value === 'Task') {
    taskStore.saveAll()
  }
}

function create() {
  if (route.value === 'Project') {
    projectStore.addNewRecord()
  } else if (route.value === 'Task' && projectId.value) {
    console.log(projectId.value)
    taskStore.addNewRecord(projectId.value)
  }
}

const mode = ref('Drag')

function switchMode() {
  mode.value = mode.value === 'Drag' ? 'Edit' : 'Drag'
}

onBeforeMount(() => {
  const tmp = localStorage.getItem('route')
  if (!tmp) route.value = 'Project'
  else {
    const id = localStorage.getItem('project-id')
    const title = localStorage.getItem('project-title')
    if (id && title) {
      projectId.value = id
      projectTitle.value = title
    }
  }
})
</script>

<template>
  <h3 v-if="projectId">
    <IconSet iconName="return" :iconSize="32" v-tooltip="{ text: 'Back to projects' }" />
    {{ projectTitle }}
  </h3>
  <div class="flex-caption">
    <ToggleSwitch v-model="mode" @click="switchMode" />
    <div>
      <button
        v-if="mode === 'Edit'"
        @click="create"
        class="add-new-record"
        v-tooltip="{ text: 'Create new one' }"
      >
        <IconSet iconName="add" :iconSize="36" />
      </button>
    </div>
    <div @click="save" class="save-button" v-tooltip="{ text: 'Save | Update' }">
      <IconSet iconName="save" :iconSize="36" />
    </div>
  </div>
  <DraggableRowsTable
    :mode="mode"
    v-model:project-id="projectId"
    v-model:project-title="projectTitle"
    :items="computedItems"
    :headers="headers"
    :moveCallback="moveCallback"
    :modifyCallback="updateField"
    :tableId="route.toLowerCase() + '-table'"
  />
</template>

<style scoped>
h3 {
  color: var(--vt-c-green);
  font-weight: bold;
  text-align: center;
}

.save-button {
  display: block;
  cursor: pointer;
  justify-self: end;
  align-self: center;
}
button.add-new-record {
  border: none;
  font-size: 32px;
  font-weight: bold;
  color: var(--vt-c-green);
  cursor: pointer;
  width: 36px;
  justify-self: center;
}
.flex-caption {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 960px;
  margin: 16px auto;
}
.flex-caption > div {
  text-align: center;
}
</style>
