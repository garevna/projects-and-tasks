<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed } from 'vue'
import type { Project, Task, ProjectHeader, TaskHeader, TaskStatus } from '@/types'
import { getFieldValue, getListOfStatusValues } from '@/utils'
import SelectSimpleValue from './SelectSimpleValue.vue'

const emit = defineEmits<{
  (e: 'update', payload: { id: string; field: string; value: string | number }): void
}>()

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  element: Project | Task
  header: ProjectHeader | TaskHeader
  edit: boolean
}

const props = defineProps<Props>()

const items = getListOfStatusValues(props.element)

const text = ref('')

const selected = computed({
  get: () => props.element.status,
  set: (data) => Object.assign(props.element as Task, { status: data as TaskStatus }),
})

if (props.header.type !== 'tasks') {
  text.value = getFieldValue(props.element, props.header.field as keyof typeof props.element)
}

function onInput($event: any): void {
  emit('update', { id: props.element.id, field: props.header.field, value: $event.target.value })
}

function dateClicked(date: any) {
  emit('update', { id: props.element.id, field: props.header.field, value: Date.parse(date) })
}

function format(date: Date) {
  return date.toISOString().slice(0, 10)
}

const editable = computed(() => props.header.type === 'text' || props.header.type === 'string')
</script>

<template>
  <div v-if="props.header.type === 'not-editable'" style="text-align: center">
    {{ text }}
  </div>
  <div v-if="props.header.type === 'date'">
    <VueDatePicker
      v-model="text"
      @date-update="dateClicked"
      :format="format"
      :clearable="false"
      auto-apply
      class="date-picker-class"
    />
  </div>

  <div v-if="!editable && props.header.field === 'status'">
    <SelectSimpleValue :options="items" v-model="selected" />
  </div>

  <div v-if="editable">
    <div v-if="props.edit">
      <div v-if="props.header.type === 'text'">
        <textarea v-model="text" @input="onInput"></textarea>
      </div>

      <div v-if="props.header.type === 'string'">
        <input v-model="text" @input="onInput" type="text" />
      </div>
    </div>
    <div v-else>
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.behind-schedule {
  border: solid 1px var(--vt-c-error);
}
.must-be-finished-today {
  border: solid 1px var(--vt-c-orange);
}
input,
textarea {
  padding: 8px 12px;
  border-radius: 4px;
  border: solid 1px var(--vt-c-white-mute);
  width: 100%;
  min-height: 160px;
  background: transparent;
}
input:focus,
textarea:focus {
  background-color: #dfe7;
  outline: none;
  border: solid 1px #798;
}

/* .not-edit-button,
.edit-button {
  cursor: pointer;
}

.not-edit-button:before,
.edit-button:before {
  color: #090;
  border: solid 1px var(--vt-c-green-light);
  border-radius: 50%;
  padding: 2px 4px;
  background: var(--vt-c-green-opacity);
} */

/* .not-edit-button:before {
  content: '✔';
}

.edit-button:before {
  content: '✎';
} */

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: var(--vt-c-white-soft);
  box-shadow: inset 0 0 1px var(--vt-c-black);
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  background: var(--vt-c-green);
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--vt-c-green-soft);
}
</style>

<style>
:root {
  --dp-input-padding: 4px;
  --dp-input-icon-padding: 32px;
  --dp-common-padding: 4px;
}
.dp__instance_calendar {
  background: #eee;
  padding: 8px 12px 12px 8px;
}
.dp__theme_light {
  --dp-background-color: var(--vt-c-white-light);
  --dp-text-color: var(--vt-c-black-soft);
  --dp-hover-color: var(--vt-c-white);
  --dp-hover-text-color: var(--vt-c-green-light) 7;
  --dp-hover-icon-color: var(--vt-c-green-light);
  --dp-primary-color: var(--vt-c-green);
  --dp-primary-disabled-color: var(--vt-c-text-light-1);
  --dp-border-color: var(--vt-c-white-light);
  --dp-menu-border-color: var(--vt-c-white-mute);
  --dp-border-color-hover: var(--vt-c-green-light);
  --dp-border-color-focus: var(--vt-c-green);
  --dp-disabled-color: var(--vt-c-white-light);
  --dp-scroll-bar-background: var(--vt-c-white-soft);
  --dp-scroll-bar-color: var(--vt-c-black-mute);
  --dp-success-color: var(--vt-c-green);
  --dp-success-color-disabled: var(--vt-c-green-dark);
  --dp-icon-color: var(--vt-c-green);
  --dp-danger-color: var(--vt-c-orange);
  --dp-marker-color: var(--vt-c-orange);
  --dp-tooltip-color: var(--vt-c-white-soft);
  --dp-disabled-color-text: var(--vt-c-text-light-1);
  --dp-highlight-color: var(--vt-c-green-dark);
  --dp-font-family: Montserrat, 'Segoe UI', roboto, oxygen, ubuntu, cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  --dp-font-size: 12px;
}

.dp__instance_calendar {
  box-shadow: var(--vt-c-box-shadow);
}
</style>
