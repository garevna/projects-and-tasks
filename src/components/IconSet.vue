<script setup lang="ts">
import { alertIcons } from '@/configs'
import { computed, onMounted, onUpdated } from 'vue'

// type Props = {
//   iconName: string | null | undefined
//   iconSize: number | undefined
//   iconColor: string | undefined
// }

const props = defineProps({
  iconName: {
    type: String,
    default: null,
  },
  iconSize: {
    type: Number,
    default: 32,
  },
  iconColor: {
    type: String,
    default: '#687',
  },
})

// const props = defineProps<Props>()

const dynamicPath = computed(() => {
  const key = props.iconName as keyof typeof alertIcons
  return alertIcons[key]
})
const id: string = Date.now() + Math.round(Math.random() * 1000) + ''

function setPath() {
  const svg = document.getElementById(id)
  if (svg && svg instanceof SVGElement) {
    svg.innerHTML = dynamicPath.value
    svg.style.fill = props.iconColor || '#687'
  }
}

onMounted(() => setPath())
onUpdated(() => setPath())
</script>

<template>
  <svg
    v-if="props.iconName"
    viewBox="0 0 24 24"
    :width="props.iconSize"
    :height="props.iconSize"
    :id="id"
  ></svg>
</template>

<style scoped>
svg {
  vertical-align: middle;
  margin: 0 4px;
  cursor: pointer;
}
svg:hover {
  filter: brightness(0.8);
}
</style>
