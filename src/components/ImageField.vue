<script setup lang="ts">
import { defaultAvatar } from '@/configs'
import type { Record } from '@/types'
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'

import PopupWindow from './PopupWindow.vue'

interface Props {
  record: Record
  field: string
  width?: number
  height?: number
  size?: number | 50000
}
const props = defineProps<Props>()

const field: ComputedRef<keyof typeof props.record> = computed(
  () => props.field as keyof typeof props.record,
)
const src = ref(props.record[field.value] as string)

const inputId = 'select-file-' + props.record.id

watch(src, (value) => {
  Object.assign(props.record, {
    [field.value]: value || defaultAvatar,
  })
})

function activate() {
  const el = document.getElementById(inputId)
  el?.dispatchEvent(new PointerEvent('click'))
}

async function uploadImage(event: PointerEvent) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length) {
    const file: File = target.files[0]
    if (!file.type.startsWith('image/')) {
      popupText.value = 'It is not an image!'
      openPopup.value = true
      src.value = defaultAvatar
    }

    if (file.size > (props.size || 50000)) {
      popupText.value = 'File is too large!'
      openPopup.value = true
      src.value = defaultAvatar
    }

    const reader = new FileReader()
    reader.onload = function () {
      src.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const openPopup = ref(false)
const response = ref('')
const popupHeader = ref('Error loading file')
const popupText = ref('')
</script>

<template>
  <img :src="src" :width="props.width || 48" :height="props.height || 48" @click="activate" />
  <input type="file" :id="inputId" :onchange="uploadImage" />
  <PopupWindow
    v-model:open="openPopup"
    v-model:response="response"
    :header="popupHeader"
    :text="popupText"
    :ok="true"
  />
</template>

<style scoped>
img {
  cursor: pointer;
}

input[type='file'] {
  color: rgba(0, 0, 0, 0);
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
