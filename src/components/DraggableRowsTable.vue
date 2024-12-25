<script setup lang="ts">
import { onBeforeUnmount, useTemplateRef, computed } from 'vue'
import type { PropType, Ref } from 'vue'
import { getFieldValue } from '@/utils/getFieldValue'
import { VueDraggableNext } from 'vue-draggable-next'
import type { Project, Task, ProjectHeader, TaskHeader, Modified } from '@/types'

import EditField from './EditField.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'Drag',
  },
  items: Array<Project | Task>,
  headers: Array<ProjectHeader | TaskHeader>,
  moveCallback: {
    type: Function as PropType<(arg: Modified) => void>,
    required: true,
  },
  modifyCallback: {
    type: Function as PropType<(arg: Modified) => void>,
    required: true,
  },
  tableId: String,
})

const projectId = defineModel('projectId', { type: String, default: '' })
const projectTitle = defineModel('projectTitle', { type: String, default: '' })

function updateModel(record: Project) {
  projectId.value = record?.id || ''
  projectTitle.value = record?.title || ''
}

const list = computed({
  get() {
    return props.items?.map((item) => item)
  },
  set(/* data */) {
    // console.log(data)
  },
})

function update(modified: { id: string; field: string; value: string | number }) {
  props.modifyCallback(modified)
}

onBeforeUnmount(() => {
  const table = useTemplateRef('draggable-and-resizable-table') as Ref<HTMLTableElement>
  table.value?.dispatchEvent(new Event('before-unmount'))
})
</script>

<template>
  <div id="resizible-table-container">
    <table v-columns-resizable ref="draggable-and-resizable-table" :id="tableId">
      <thead>
        <tr class="not-drag">
          <th v-for="header of props.headers" :key="header.order">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <VueDraggableNext
        v-if="props.mode === 'Drag'"
        v-model="list"
        tag="tbody"
        item-key="order"
        @change="props.moveCallback"
        class="drag"
      >
        <tr v-for="(element, index) in items" :key="index">
          <td
            v-for="header of props.headers"
            :key="header.order"
            :style="{ textAlign: header.align || 'left' }"
          >
            {{ getFieldValue(element, header.field as keyof typeof element) }}
          </td>
        </tr>
      </VueDraggableNext>
      <tbody v-else class="edit">
        <tr v-for="(element, index) in items" :key="index">
          <td v-for="header of props.headers" :key="header.order">
            <button
              v-if="header.type === 'action'"
              @click="updateModel(element as Project)"
              v-tooltip="{ text: 'Show project tasks' }"
            >
              <img src="@/assets/table-edit.svg" width="32" height="32" />
            </button>
            <EditField v-else :element="element" :header="header" @update="update" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  margin: 16px auto;
  max-width: 100%;
}
tbody.drag {
  cursor: all-scroll;
}
.not-drag {
  user-select: none;
}
table th,
td {
  border: solid 1px var(--vt-c-white-mute);
  max-width: 320px;
}
.drag td {
  padding: 8px 12px;
}
.edit td {
  padding: 0;
  width: fit-content;
}
button {
  border: none;
  width: 100%;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
}
</style>
