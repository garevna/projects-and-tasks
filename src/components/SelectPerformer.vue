<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Task } from '@/types'
import { useTaskStore, usePerformerStore } from '@/stores'

// import { defaultAvatar } from '@/configs'

const performerStore = usePerformerStore()
const taskStore = useTaskStore()

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const expanded: Ref<boolean> = ref(false)

// const performerId = computed(() => props.task.performerId)

// const selectedAvatar = computed(() => performerStore.getPerformerAvatar(props.task as Task))
// const selectedName = computed(() => performerStore.getPerformerName(props.task as Task))
// const selectedSpeciality = computed(() => performerStore.getPerformerSpeciality(props.task as Task))

const selectedAvatar = ref(performerStore.getPerformerAvatar(props.task as Task))
const selectedName = ref(performerStore.getPerformerName(props.task as Task))
const selectedSpeciality = ref(performerStore.getPerformerSpeciality(props.task as Task))

const tooltipText = computed(() => `${selectedName.value}\n${selectedSpeciality.value}`)

function clickCallback(performerId: string) {
  if (!performerId) return
  taskStore.updatePerformerId(props.task.id, performerId)
  selectedAvatar.value = performerStore.getPerformerAvatar(props.task as Task)
  selectedName.value = performerStore.getPerformerName(props.task as Task)
  selectedSpeciality.value = performerStore.getPerformerSpeciality(props.task as Task)
  expanded.value = false
}
</script>

<template>
  <div class="performer-select" @blur="expanded = false">
    <div class="selected-performer" :class="{ open: expanded }" @click="expanded = !expanded">
      <img
        :src="selectedAvatar"
        width="64"
        height="64"
        v-tooltip="{ text: tooltipText }"
      />
    </div>
    <div class="options" :style="{ display: !expanded ? 'none' : 'block' }">
      <div
        v-for="(performer, i) of performerStore.records"
        :key="i"
        @click="clickCallback(performer.id)"
        class="performer-option"
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
