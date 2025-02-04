<script setup lang="ts">
import { getHeaders, getStore, injectionKeyForCurrent, injectionKeyForNext } from '@/composables'
import type { GoTo, Modified, Moved, Performer, Project, Record, Route } from '@/types'

import type { Reactive, Ref } from 'vue'
import { computed, inject, onBeforeUnmount, ref, useTemplateRef } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import AlertIcon from './AlertIcon.vue'
import IconSet from './IconSet.vue'
import SelectPerformer from './SelectPerformer.vue'
import SelectSimpleValue from './SelectSimpleValue.vue'
import TaskInfo from './TaskInfo.vue'

import EditField from './EditField.vue'
import ImageField from './ImageField.vue'

const current = inject(injectionKeyForCurrent) as Reactive<GoTo>
const next = inject(injectionKeyForNext) as Reactive<GoTo>
const store = computed(() => getStore(current.route))

const tableId = computed(() => current.route.toLowerCase() + '-table')

const headers = computed(() => getHeaders(current.route as Route))
const statusValues = computed(() => store.value.statusValues)

function moveCallback(arg: { moved: Moved }): void {
  getStore(current.route).moveItem(arg, current.subroute)
}

const modified: Ref<{ id: string; field: string } | null> = ref(null)

function changeSubroute(record: Project | Performer) {
  const [caption, subroute] =
    current.route === 'Project'
      ? [(record as Project).title, `?projectId=${record.id}`]
      : [(record as Performer).name, `?performerId=${record.id}`]
  Object.assign(next, { route: 'Task', subroute, caption })
}

function update(modified: Modified) {
  store.value.updateField(current.subroute, modified)
}

onBeforeUnmount(() => {
  const table = useTemplateRef('draggable-and-resizable-table') as Ref<HTMLTableElement>
  table.value?.dispatchEvent(new Event('before-unmount'))
})

function editClick(record: Record, field: string) {
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
          <th v-for="header of headers" :key="header.order">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <VueDraggableNext
        v-model="store.records"
        tag="tbody"
        item-key="order"
        @change="moveCallback"
        class="drag"
        :disabled="modified"
      >
        <tr v-for="element in store.records" :key="element.id">
          <td
            v-for="header of headers"
            :key="header.order"
            :style="{ textAlign: header.align || 'left' }"
            :class="header.type"
          >
            <template v-if="current.route === 'Task'">
              <AlertIcon :record="element" :header="header" />
            </template>

            <template v-if="header.type === 'text' || header.type === 'string'">
              <IconSet
                :icon-name="
                  element.id === modified?.id && header.field === modified?.field
                    ? 'submit'
                    : 'edit'
                "
                :icon-size="24"
                style="position: absolute; top: 0; right: 0"
                @click="editClick(element, header.field)"
              />
            </template>

            <template v-if="header.type === 'tasks'">
              <TaskInfo
                :recordId="element.id"
                @click="changeSubroute(element as Project | Performer)"
              />
            </template>

            <template v-if="header.type === 'avatar'">
              <SelectPerformer :subroute="current.subroute" :task="element" />
            </template>

            <template v-if="header.type === 'image'">
              <ImageField :record="element" :field="header.field" />
            </template>

            <template v-if="header.field === 'status'">
              <SelectSimpleValue :options="statusValues" v-model="element.status" />
            </template>

            <template v-if="['date', 'string', 'text'].includes(header.type)">
              <EditField
                :record="element"
                :edit="element.id === modified?.id && header.field === modified?.field"
                :header="header"
                @update="update"
              />
            </template>
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
  position: relative;
}

td.status {
  position: relative;
}

/* td.date::after {
  content: '⚠';
  position: absolute;
  bottom: 0;
  left: 0;
  color: #f00;
  font-size: 18px;
} */

td.text,
td.string {
  position: relative;
  padding: 4px 24px 4px 4px !important;
}

.behind-schedule .dp__input {
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
