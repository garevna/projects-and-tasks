<script setup lang="ts">
import type { Header, Record } from '@/types'
import { dateToNumber, dateToString, getFieldValue } from '@/utils'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'

const emit = defineEmits<{
  (e: 'update', payload: { id: string; field: string; value: string | number }): void
}>()

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  record: Record
  header: Header
  edit: boolean
}

const props = defineProps<Props>()

const content = computed({
  get: () => {
    const value = getFieldValue(
      props.record,
      props.header.field as keyof typeof props.record,
      props.header.type,
    )
    return props.header.type !== 'text'
      ? value
      : props.edit
        ? value.split('<br>').join('\n')
        : value.split('\n').join('<br>')
  },
  set: (newVal: string) =>
    emit('update', { id: props.record.id, field: props.header.field, value: newVal }),
})

function onInput($event: any): void {
  Object.assign(props.record, {
    [props.header.field]: $event.target.value,
  })
  emit('update', { id: props.record.id, field: props.header.field, value: $event.target.value })
}

function dateClicked(date: any) {
  Object.assign(props.record, { [props.header.field]: dateToNumber(date) })
  emit('update', { id: props.record.id, field: props.header.field, value: dateToNumber(date) })
}
</script>

<template>
  <template v-if="props.header.type === 'not-editable'">
    <div style="text-align: center">{{ content }}</div>
  </template>

  <template v-if="props.header.type === 'date'">
    <VueDatePicker
      v-model="content"
      @date-update="dateClicked"
      :format="dateToString"
      :clearable="false"
      auto-apply
    />
  </template>

  <template v-if="props.header.type === 'text' || props.header.type === 'string'">
    <template v-if="props.edit">
      <template v-if="props.header.type === 'text'">
        <textarea v-model="content" @input="onInput"></textarea>
      </template>

      <template v-if="props.header.type === 'string'">
        <input v-model="content" @input="onInput" type="text" />
      </template>
    </template>
    <template v-else>
      <span v-html="content"></span>
    </template>
  </template>
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
  background-color: var(--vt-c-white-mute);
  outline: none;
  border: solid 1px var(--vt-c-green-soft);
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
:root {
  --dp-input-padding: 4px;
  --dp-input-icon-padding: 32px;
  --dp-common-padding: 4px;
}
.dp__instance_calendar {
  background: var(--vt-c-white-soft);
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
