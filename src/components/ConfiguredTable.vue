<script setup lang="ts">
import ToggleSwitch from './ToggleSwitch.vue'
import EditField from './EditField.vue'
import { useProjectStore } from '@/stores/projects'
import { computed, ref } from 'vue'
import { getFieldValue } from '@/utils/getFieldValue'
import { VueDraggableNext } from 'vue-draggable-next'
import type { Project } from '@/types/project.ts'
import type { ProjectHeader } from '@/types/project-header'

const store = useProjectStore()
const projects = computed({
  get: () => store.projects.map((project) => project),
  set: (data) => {
    store.update(data)
  },
})

const props = defineProps({
  headers: Array<ProjectHeader>,
  items: Array<Project>,
})

/* eslint-disable @typescript-eslint/no-explicit-any */

const mode = ref('Drag')

function switchMode() {
  mode.value = mode.value === 'Drag' ? 'Edit' : 'Drag'
}

function log(e: any) {
  const { moved } = e
  if (moved.oldIndex === 0) {
    console.warn('Stop moving header of table!')
    return
  }
  store.moveItem(moved)
}

function update(modified: { id: number; field: string; value: string | number }) {
  const { id, field, value } = modified
  store.updateField(id, field, value)
}

function create() {
  store.addNewProject()
}

function save() {
  store.saveAll()
}
</script>

<template>
  <div class="flex-caption">
    <ToggleSwitch @click="switchMode" />
    <button v-if="mode === 'Edit'" @click="create" class="add-new-record">+</button>
  </div>
  <table>
    <tbody v-if="mode === 'Drag'" class="drag">
      <VueDraggableNext :list="projects" @change="log">
        <tr class="not-drag">
          <th v-for="header of props.headers" :key="header.order">
            {{ header.title }}
          </th>
        </tr>
        <tr v-for="(element, index) in projects" :key="index">
          <td v-for="header of props.headers" :key="header.order">
            {{ getFieldValue(element, header) }}
          </td>
        </tr>
      </VueDraggableNext>
    </tbody>
    <tbody v-else class="edit">
      <tr>
        <th v-for="header of props.headers" :key="header.order">
          {{ header.title }}
        </th>
      </tr>
      <tr v-for="(element, index) in projects" :key="index">
        <td v-for="header of props.headers" :key="header.order">
          <EditField :element="element" :header="header" @update="update" />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <button @click="save" class="save">SAVE</button>
    </tfoot>
  </table>
</template>

<style scoped>
button.add-new-record {
  border-radius: 50%;
  border: solid 1px #097;
  padding: 4px 12px;
  font-size: 32px;
  font-weight: bold;
  color: #097;
  cursor: pointer;
}
button.save {
  border-radius: 4px;
  border: solid 1px #097;
  background: #0979;
  color: #075;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 16px;
}
table {
  margin: 16px auto;
}
tbody.drag {
  cursor: all-scroll;
}
tbody.edit {
  cursor: grabbing;
}
tfoot {
  text-align: center;
}
.flex-caption {
  max-width: 960px;
  margin: 0 auto 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.not-drag {
  cursor: not-allowed;
}
table th,
td {
  border: solid 1px #ddd;
  max-width: 320px;
}
.drag td {
  padding: 8px 12px;
}
.edit td {
  padding: 0;
  width: fit-content;
}
</style>
