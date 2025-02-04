import type { Reactive } from 'vue'
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

import type { Task } from '@/types'

export function createTasksRoute() {
  const records: Reactive<Array<Task>> = reactive([])

  const saveAll = save.bind(null, 'Task', records)

  return {
    records,
    updateRecords,
    updateOrder: updateOrder.bind(null, records),
    fetchRecords: fetchRecords.bind(null, 'Task', records),
    moveItem: getMoveItemMethod(records),
    updateField: updateField.bind(null, 'Task', records),
    addNewRecord: addNewRecord.bind(null, 'Task', records),
    saveAll,
  }
}
