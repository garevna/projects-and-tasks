import { defineStore } from 'pinia'

import { createProjectsRoute } from './createProjectsRoute'

import type { ProjectStatus } from '@/types'
import { getListOfStatusValues } from '@/utils'
import { reactive } from 'vue'

export const useProjectStore = defineStore('projects', () => {
  const statusValues: ProjectStatus[] = reactive(
    getListOfStatusValues('Project') as ProjectStatus[],
  )

  const {
    records,
    tasksInfo,
    updateRecords,
    updateOrder,
    fetchRecords,
    moveItem,
    updateField,
    addNewRecord,
    saveAll,
  } = createProjectsRoute()

  return {
    records,
    statusValues,
    fetchRecords,
    updateRecords,
    updateOrder,
    tasksInfo,
    moveItem,
    updateField,
    addNewRecord,
    saveAll,
  }
})
