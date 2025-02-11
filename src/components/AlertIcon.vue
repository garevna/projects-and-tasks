<script setup lang="ts">
import type { Header, Record, Task } from '@/types'
import { getAlertIcon, getAlertIconColor } from '@/utils'
import { computed } from 'vue'

import IconSet from './IconSet.vue'

interface Props {
  record: Record
  header: Header
}

const props = defineProps<Props>()

const icon = computed(
  () => getAlertIcon(props.record as Task, props.header.field as keyof Task) as string | undefined,
)
const iconColor = computed(() =>
  getAlertIconColor(props.record as Task, props.header.field as keyof Task),
)
const showIcon = computed(
  () => (props.header.field === 'status' || props.header.field === 'deadline') && icon.value,
)
</script>

<template>
  <IconSet
    v-if="showIcon"
    :icon-name="getAlertIcon(props.record as Task, props.header.field as keyof Task)"
    :icon-size="18"
    :icon-color="iconColor"
    style="position: absolute; bottom: 4px; left: 0px"
  />
</template>
