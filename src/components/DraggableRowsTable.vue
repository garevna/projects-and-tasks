<script setup lang="ts">
import { onBeforeUnmount, useTemplateRef, computed, ref } from 'vue'
import type { PropType, Ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import type { Project, Task, ProjectHeader, TaskHeader, Modified } from '@/types'
import ProjectTaskInfo from './ProjectTaskInfo.vue'
import SelectPerformer from './SelectPerformer.vue'
import IconSet from './IconSet.vue'

import EditField from './EditField.vue'

const props = defineProps({
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

const modified: Ref<{ id: string; field: string } | null> = ref(null)

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

function editClick(record: Project | Task, field: keyof typeof record) {
  if (modified.value?.id === record.id) {
    modified.value = null
  } else {
    modified.value = { id: record.id, field }
  }
}
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
            :class="header.type"
          >
            <IconSet
              v-if="header.type === 'text' || header.type === 'string'"
              :icon-name="
                element.id === modified?.id && header.field === modified?.field ? 'submit' : 'edit'
              "
              :icon-size="24"
              style="position: absolute; top: 0; right: 0"
              @click="editClick(element, header.field as keyof typeof element)"
            />
            <ProjectTaskInfo
              v-if="header.type === 'tasks'"
              :projectId="element.id"
              @click="updateModel(element as Project)"
            />
            <SelectPerformer v-if="header.type === 'avatar'" :task="element" />
            <EditField
              v-else
              :element="element"
              :edit="element.id === modified?.id && header.field === modified?.field"
              :header="header"
              @update="update"
            />
          </td>
        </tr>
      </VueDraggableNext>
    </table>
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
  border: solid 1px #ddd;
}
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

td.date {
  padding: 0 !important;
  text-align: center;
}

td.text,
td.string {
  position: relative;
  padding: 4px 24px 4px 4px !important;
}

.behind-schedule {
  color: var(--vt-c-error);
  /* background: var(--vt-c-error-opacity); */
}
.must-be-finished-today {
  color: var(--vt-c-orange);
  /* background: var(--vt-c-orange-opacity); */
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
