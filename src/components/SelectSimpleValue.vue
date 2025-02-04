<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  options: Array,
})
const model = defineModel()

const expanded: Ref<boolean> = ref(false)

function clickCallback(event: MouseEvent) {
  const target: HTMLDivElement | null = event.target as HTMLDivElement
  if (!target) return
  if (!target.innerText) return
  model.value = target.innerText
  expanded.value = false
}

function close() {
  expanded.value = false
}
</script>

<template>
  <div class="simple-select" @blur="expanded = false" v-click-outside="close">
    <div class="selected" :class="{ open: expanded }" @click="expanded = !expanded">
      {{ model }}
    </div>
    <div class="options" :style="{ display: !expanded ? 'none' : 'block' }">
      <div v-for="(option, i) of props.options" :key="i" @click="clickCallback">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style>
.simple-select {
  position: relative;
  max-width: 360px;
  width: max-content;
  min-width: 120px;
}

.custom-select select {
  display: none;
}

.selected {
  padding: 0;
  cursor: pointer;
  color: var(--vt-c-text-light-2);
  width: max-content;
}

.selected:after {
  content: '▼';
  margin-left: 4px;
  color: var(--vt-c-green-opacity);
}

.options div {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}

.options {
  position: absolute;
  background-color: #eee;
  color: #465;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 2px 2px 4px #0005;
  text-align: left;
}

.select-hide {
  display: none;
}

.options div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
