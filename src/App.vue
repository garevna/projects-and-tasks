<script setup lang="ts">
import ComplexTable from '@/components/ComplexTable.vue'
import { usePerformerStore, useProjectStore } from '@/stores'

import type { GoTo, TasksInfoType } from '@/types'
import { modeHandler, popupJsonServer, popupLocalDBDemo, popupSaveData } from './configs'
import { initDemo } from './db/initDB/initDemo'

import type { Reactive } from 'vue'
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'

import {
  getStore,
  injectionKeyForCurrent,
  injectionKeyForNext,
  injectionKeyForPrevious,
  injectionKeyTaskInfoForPerformers,
  injectionKeyTaskInfoForProjects,
} from '@/composables'

import PopupWindow from '@/components/PopupWindow.vue'
import MainMenuPanel from './components/MainMenuPanel.vue'

import { refreshTasks, setupTables } from '@/utils'

type TaskInfo = { [key: string]: TasksInfoType }
type ReturnInfoType = { taskInfoForProjects: TaskInfo; taskInfoForPerformers: TaskInfo }

const taskInfoForProjects: TaskInfo = reactive({})
const taskInfoForPerformers: TaskInfo = reactive({})

const previous = reactive({
  route: '',
  subroute: '/',
  caption: '',
})
const current = reactive({
  route: 'Project',
  subroute: '/',
  caption: 'Projects',
})
const next = reactive({
  route: '',
  subroute: '/',
  caption: '',
})

const save = ref(false)
const create = ref(false)

const store = computed(() => getStore(current.route))

async function changeRoute() {
  if (!next.route || !next.subroute) {
    return
  }
  if (next.route === current.route && next.subroute === current.subroute) {
    return
  }

  if (
    !next.subroute.includes('projectId') &&
    !next.subroute.includes('performerId') &&
    next.subroute !== '/'
  ) {
    next.caption = next.route + 's: ' + next.subroute.split('=')[1].split('-').join(' ')
  }

  Object.assign(previous, current)

  store.value.updateOrder(previous.subroute)

  Object.assign(current, next)

  await store.value.fetchRecords(current.subroute)
  Object.assign(next, { route: '', subroute: '/', caption: '' })
}

watch(next, changeRoute)

watch(save, (value) => {
  if (value) {
    store.value.saveAll().then(() => {
      save.value = false
      popupHeader.value = popupSaveData.header
      popupText.value = popupSaveData.text
      popupYesNoButtons.value = false
      popupOkButton.value = true
      open.value = true
    })
  }
})

watch(create, (value) => {
  if (value) {
    store.value.addNewRecord(current.subroute)
    create.value = false
  }
})

const ready = ref(false)

async function getData() {
  const [projectStore, performerStore] = [useProjectStore(), usePerformerStore()]
  const promises = [projectStore, performerStore].map((store) => store.fetchRecords(''))
  await Promise.all(promises)
  ready.value = true
}

async function refresh() {
  const result = (await refreshTasks()) as ReturnInfoType
  Object.keys(taskInfoForProjects).forEach((key) => delete taskInfoForProjects[key])
  Object.keys(taskInfoForPerformers).forEach((key) => delete taskInfoForPerformers[key])
  Object.assign(taskInfoForProjects, result.taskInfoForProjects)
  Object.assign(taskInfoForPerformers, result.taskInfoForPerformers)
}

onMounted(() => {
  setupTables()
})

provide(injectionKeyForCurrent, current as Reactive<GoTo>)
provide(injectionKeyForNext, next as Reactive<GoTo>)
provide(injectionKeyForPrevious, previous as Reactive<GoTo>)

provide(injectionKeyTaskInfoForProjects, taskInfoForProjects)
provide(injectionKeyTaskInfoForPerformers, taskInfoForPerformers)

const popupHeader = ref(popupJsonServer.header)
const popupText = ref(popupJsonServer.text)
const popupYesNoButtons = ref(true)
const popupOkButton = ref(false)
const popupConfirmButtons = ref(false)

const response = ref(false)
const open = ref(true)

watch(open, () => {
  if (!modeHandler()) {
    if (!response.value) {
      modeHandler('local')
      const { header, text } = popupLocalDBDemo
      popupHeader.value = header
      popupText.value = text
      open.value = true
    } else {
      modeHandler('server')
      refresh().then(() => getData())
    }
  } else {
    if (response.value) {
      initDemo().then(() => refresh().then(() => getData()))
    } else {
      refresh().then(() => getData())
    }
  }
})
</script>

<template>
  <PopupWindow
    :header="popupHeader"
    :text="popupText"
    :yes="popupYesNoButtons"
    :confirm="popupConfirmButtons"
    :ok="popupOkButton"
    v-model:response="response"
    v-model:open="open"
  />
  <template v-if="ready">
    <MainMenuPanel v-model:create="create" v-model:save="save" />
    <ComplexTable />
  </template>
</template>
