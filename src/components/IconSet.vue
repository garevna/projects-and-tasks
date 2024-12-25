<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
// import type { Ref } from 'vue'
import { getPropValue } from '@/utils/index'

const icons = reactive({
  date: '<path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z" />',
  edit: '<path d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.08 20.21,11.08 20.42,11.3L21.7,12.58C21.92,12.79 21.92,13.14 21.7,13.35M12,18.94L18.07,12.88L20.12,14.93L14.06,21H12V18.94M4,2H18A2,2 0 0,1 20,4V8.17L16.17,12H12V16.17L10.17,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V10H10V6H4M12,6V10H18V6H12M4,12V16H10V12H4Z" />',
  add: '<path d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.12 13.3 20.1 13 19 13C15.69 13 13 15.69 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />',
  save: '<path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />',
  'save-alert':
    '<path d="M13 9H3V5H13M10 19C8.3 19 7 17.7 7 16S8.3 13 10 13 13 14.3 13 16 11.7 19 10 19M15 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H17C18.1 21 19 20.1 19 19V7L15 3M23 13H21V7H23V13M23 17H21V15H23V17Z" />',
  'save-check':
    '<path d="M17 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.81C11.42 20.34 11.17 19.6 11.07 18.84C9.5 18.31 8.66 16.6 9.2 15.03C9.61 13.83 10.73 13 12 13C12.44 13 12.88 13.1 13.28 13.29C15.57 11.5 18.83 11.59 21 13.54V7L17 3M15 9H5V5H15V9M15.75 21L13 18L14.16 16.84L15.75 18.43L19.34 14.84L20.5 16.25L15.75 21" />',
  return:
    '<path d="M4,21H19A2,2 0 0,0 21,19V13H17V15L13,12L17,9V11H21V5A2,2 0 0,0 19,3H4A2,2 0 0,0 2,5V19A2,2 0 0,0 4,21M4,15H8V17H4V15M4,11H11V13H4V11M4,7H11V9H4V7M21,11H24V13H21V11Z" />',
})

const props = defineProps({
  iconName: {
    type: String,
    default: 'date',
  },
  iconSize: {
    type: Number,
    default: 32,
  },
})

const dynamicPath = computed(() => getPropValue(icons, props.iconName as 'date' | 'edit' | 'add'))
const id: string = Date.now() + Math.round(Math.random() * 1000) + ''

onMounted(() => {
  const svg = document.getElementById(id)

  if (svg && svg instanceof SVGElement) {
    svg.innerHTML = dynamicPath.value
  }
})
</script>

<template>
  <svg viewBox="0 0 24 24" :width="props.iconSize" :height="props.iconSize" :id="id"></svg>
</template>

<style scoped>
svg {
  fill: #687;
  vertical-align: middle;
  margin: 0 4px;
  cursor: pointer;
}
svg:hover {
  fill: #597;
}
</style>
