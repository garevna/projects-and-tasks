<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  options: Array,
})
const model = defineModel()

const expanded: Ref<boolean> = ref(false)

function clickCallback(event: MouseEvent) {
  console.log('CLICK!')
  const target: HTMLDivElement | null = event.target as HTMLDivElement
  if (!target) return
  if (!target.innerText) return
  model.value = target.innerText
  expanded.value = false
}
</script>

<template>
  <div class="simple-select" @blur="expanded = false">
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
  font-family: Arial;
  max-width: 360px;
  width: max-content;
  min-width: 120px;
}

.custom-select select {
  display: none;
}

.selected {
  background-color: #687;
  border-radius: 4px;
}

.selected:after {
  position: absolute;
  content: '';
  top: 40%;
  right: -12px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #0539 transparent transparent transparent;
}

.selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

.options div,
.selected {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
  user-select: none;
}

.selected {
  color: #eee;
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
}

.select-hide {
  display: none;
}

.options div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
