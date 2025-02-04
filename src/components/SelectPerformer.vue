<script setup lang="ts">
import { usePerformerStore, useTaskStore } from '@/stores'
// import type { Task } from '@/types'
import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

const performerStore = usePerformerStore()
const taskStore = useTaskStore()

const performers = reactive(performerStore.records)

const props = defineProps({
  subroute: {
    type: String,
    required: true,
  },
  task: {
    type: Object,
    required: true,
  },
})

const expanded: Ref<boolean> = ref(false)

const selectedAvatar = ref('')
const selectedName = ref('')
const selectedSpeciality = ref('')
const tooltipText = ref('')

setSelected(props.task.performerId)

function getTooltipText() {
  return `${selectedName.value}\n${selectedSpeciality.value}`
}

function setSelected(performerId: string) {
  const performer = performers.find((record) => record.id === performerId)
  if (performer) {
    selectedAvatar.value = performer.avatar
    selectedName.value = performer.name
    selectedSpeciality.value = performer.speciality
    tooltipText.value = `${selectedName.value}\n${selectedSpeciality.value}`
  }
}

function clickCallback(performerId: string) {
  if (!performerId) return
  taskStore.updateField(props.subroute, {
    id: props.task.id,
    field: 'performerId',
    value: performerId,
  })
  setSelected(performerId)
  expanded.value = false
}

function expand() {
  expanded.value = !expanded.value
}

function close() {
  expanded.value = false
}
</script>

<template>
  <div class="performer-select" @blur="expanded = false" v-click-outside="close">
    <div class="selected-performer" :class="{ open: expanded }" @click="expand">
      <img :src="selectedAvatar" width="64" height="64" v-tooltip="{ text: getTooltipText() }" />
    </div>
    <div class="options" :style="{ display: !expanded ? 'none' : 'block' }">
      <div
        v-for="(performer, i) of performers"
        :key="i"
        @click="clickCallback(performer.id)"
        class="performer-option"
        v-tooltip="{ text: `${performer.name}<br />{{ performer.speciality }}` }"
      >
        <img :src="performer.avatar" width="48" height="48" />
        <span>{{ performer.name }}<br />{{ performer.speciality }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.performer-select {
  position: relative;
  width: max-content;
  cursor: pointer;
  width: max-content;
}

.performer-select select {
  display: none;
}

.selected-performer {
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  width: max-content;
}

.selected-performer img {
  border-radius: 50%;
}

.selected-performer:hover:after {
  position: absolute;
  content: '▼';
  color: var(--vt-c-green-opacity);
  bottom: 0;
  left: calc(100% - 12px);
}

.options {
  position: absolute;
  width: fit-content;
  background-color: var(--vt-c-black);
  color: var(--vt-c-white-soft);
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 2px 2px 4px #0005;
  border-radius: 4px;
}

.performer-option {
  display: grid;
  grid-template-columns: var(--avatar-width) 130px;
  border-bottom: solid 1px var(--vt-c-white-mute);
  padding: 4px;
}

.performer-option img {
  margin-right: 4px;
  border-radius: 50%;
}
.performer-option span {
  align-self: center;
  font-size: 12px;
}

.select-hide {
  display: none;
}

.options div:hover,
.same-as-selected {
  background-color: #fff5;
}
</style>
