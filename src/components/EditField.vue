<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import IconSet from '@/components/IconSet.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import type { Project, Task, ProjectHeader, TaskHeader } from '@/types'
import { getFieldValue } from '@/utils/getFieldValue'

const emit = defineEmits<{
  (e: 'update', payload: { id: string; field: string; value: string | number }): void
}>()

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  element: Project | Task
  header: ProjectHeader | TaskHeader
}

const props = defineProps<Props>()

const text = ref(getFieldValue(props.element, props.header.field as keyof typeof props.element))

function onInput($event: any): void {
  emit('update', { id: props.element.id, field: props.header.field, value: $event.target.value })
}

function dateClicked(date: any) {
  emit('update', { id: props.element.id, field: props.header.field, value: Date.parse(date) })
}

function format(date: Date) {
  return date.toISOString().slice(0, 10)
}
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
  <div v-if="props.header.type === 'text'">
    <textarea v-model="text" @input="onInput"></textarea>
  </div>
  <div v-if="props.header.type === 'action'">
    <IconSet icon-name="add" :icon-size="32" />
  </div>
  <div v-if="props.header.type === 'string'">
    <input v-model="text" @input="onInput" type="text" />
  </div>
</template>

<style scoped>
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
.dp__theme_light {
  --dp-background-color: var(--vt-c-white-soft);
  --dp-text-color: var(--vt-c-black-soft);
  --dp-hover-color: var(--vt-c-white);
  --dp-hover-text-color: var(--vt-c-green-light) 7;
  --dp-hover-icon-color: var(--vt-c-green-light);
  --dp-primary-color: var(--vt-c-green);
  --dp-primary-disabled-color: var(--vt-c-text-light-1);
  --dp-border-color: var(--vt-c-white-mute);
  --dp-menu-border-color: var(--vt-c-white-mute);
  --dp-border-color-hover: var(--vt-c-green-light);
  --dp-border-color-focus: var(--vt-c-green);
  --dp-disabled-color: var(--vt-c-white-mute);
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
  --dp-font-size: 14px;
}

.dp__instance_calendar {
  box-shadow: var(--vt-c-box-shadow);
}
</style>
