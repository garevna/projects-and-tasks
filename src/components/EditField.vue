<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import type { ProjectHeader } from '@/types/project-header'
import type { TaskHeader } from '@/types/task-header'
import { getFieldValue } from '@/utils/getFieldValue'
import { tableFieldsWidth } from '@/configs/tableFieldsWidth'

const emit = defineEmits<{
  (e: 'update', payload: { id: number; field: string; value: string | number }): void
}>()

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  element: Project | Task
  header: ProjectHeader | TaskHeader
}

const props = defineProps<Props>()

const text = ref(getFieldValue(props.element, props.header))
const description = props.header.field === 'description'
const id = props.header.field === 'id'
const other = props.header.field !== 'id' && props.header.field !== 'description'

const type = props.header.field === 'date' || props.header.field === 'deadline' ? 'date' : 'text'

const cellWidth = computed(() => {
  type Key = keyof typeof tableFieldsWidth

  const key: Key = props.header.field

  return tableFieldsWidth[key] + 'px'
})

function onInput($event: any) {
  emit('update', { id: props.element.id, field: props.header.field, value: $event.target.value })
}
</script>

<template>
  <div v-if="id" style="text-align: center">
    {{ text }}
  </div>
  <div v-if="other">
    <input v-model="text" @input="onInput" :type="type" />
  </div>
  <div v-if="description">
    <textarea v-model="text" @input="onInput"></textarea>
  </div>
</template>

<style scoped>
input,
textarea {
  padding: 8px 12px;
  border-radius: 4px;
  border: solid 1px #ddd;
  width: v-bind(cellWidth);
}
textarea {
  max-width: 100%;
  min-height: 160px;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #eef;
  box-shadow: inset 0 0 1px #00000070;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  background: #097;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
  background: #09b;
}
</style>
