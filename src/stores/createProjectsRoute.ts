import { reactive } from 'vue'
import {
  addNewRecord,
  fetchRecords,
  getMoveItemMethod,
  save,
  updateField,
  updateOrder,
  updateRecords,
} from './helpers'

import type { Project, TasksInfoType } from '@/types'
import type { Reactive } from 'vue'

export function createProjectsRoute() {
  const records: Reactive<Array<Project>> = reactive([])

  const tasksInfo: Reactive<{ [key: string]: TasksInfoType }> = reactive({})

  const moveItem = getMoveItemMethod(records)

  const saveAll = save.bind(null, 'Project', records)

  return {
    records,
    tasksInfo,
    updateRecords,
    fetchRecords: fetchRecords.bind(null, 'Project', records),
    moveItem,
    updateField: updateField.bind(null, 'Project', records),
    updateOrder: updateOrder.bind(null, records),
    addNewRecord: addNewRecord.bind(null, 'Project', records),
    saveAll,
  }
}
