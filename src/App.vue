<script setup lang="ts">
import ComplexTable from '@/components/ComplexTable.vue'
import { useProjectStore, usePerformerStore } from '@/stores/index'

import { projectHeaders, taskHeaders, modeHandler } from './configs'

import { onMounted, ref, watch } from 'vue'

import { initDemo } from '@/db/initDB/initDemo'

import PopupWindow from '@/components/PopupWindow.vue'

async function getData() {
  const [projectStore, performerStore] = [
    useProjectStore(),
    usePerformerStore(),
  ]

  const promises = [projectStore, performerStore].map((store) => store.fetchRecords())
  await Promise.all(promises)
}

onMounted(() => {
  if (!localStorage.getItem('project-table')) {
    const options = projectHeaders.map((header) => ({ [header.title]: header.width }))
    localStorage.setItem('project-table', JSON.stringify(options))
  }
  if (!localStorage.getItem('task-table')) {
    const options = taskHeaders.map((header) => ({ [header.title]: header.width }))
    localStorage.setItem('task-table', JSON.stringify(options))
  }
})

const jsonServer = ref(false)
const openFirstPopup = ref(true)
const sourceData = ref(false)
const openSecondPopup = ref(false)

watch(jsonServer, (val) => {
  if (!val) {
    modeHandler('local')
    openSecondPopup.value = true
  } else {
    modeHandler('server')
    getData()
  }
})

watch(sourceData, (val) => {
  if (val) {
    initDemo()
      .then(() => {
        console.log('Demo data loaded.')
        getData()
      })
  }
})

// const mode = inject(Symbol.for('app-data-access-mode') as InjectionKey<string>)
// console.log('MODE: ', mode)
</script>

<template>
  <PopupWindow v-if="openFirstPopup" :yes="true" header="json-server" text="Have you started json-server?" v-model:response="jsonServer" v-model:open="openFirstPopup" />
  <PopupWindow v-if="openSecondPopup" :yes="true" header="Data source" text="Do you want to get demo source data?" v-model:response="sourceData" v-model:open="openSecondPopup" />
  <ComplexTable />
</template>
