import type { TaskStatus } from '@/types'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { createTasksRoute } from './createTasksRoute'

import { getListOfStatusValues } from '@/utils'

export const useTaskStore = defineStore('tasks', () => {
  const {
    records,
    updateRecords,
    updateOrder,
    fetchRecords,
    moveItem,
    updateField,
    addNewRecord,
    saveAll,
  } = createTasksRoute()

  const statusValues: TaskStatus[] = reactive(getListOfStatusValues('Task') as TaskStatus[])

  return {
    records,
    statusValues,
    fetchRecords,
    updateRecords,
    updateOrder,
    moveItem,
    updateField,
    addNewRecord,
    saveAll,
  }
})
