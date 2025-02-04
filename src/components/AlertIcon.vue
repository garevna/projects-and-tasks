<script setup lang="ts">
import type { Header, Record, Task } from '@/types'
import { getAlertIcon, getAlertIconColor } from '@/utils'

import IconSet from './IconSet.vue'

interface Props {
  record: Record
  header: Header
}

const props = defineProps<Props>()

const icon = getAlertIcon(props.record as Task, props.header.field as keyof Task)
</script>

<template v-if="header.field === 'status' || header.field === 'deadline'">
  <IconSet
    v-if="icon"
    :icon-name="icon"
    :icon-size="18"
    :icon-color="getAlertIconColor(props.record as Task, header.field as keyof Task)"
    style="position: absolute; bottom: 4px; left: 0px"
  />
</template>
