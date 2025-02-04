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

import type { Performer } from '@/types'
import type { Reactive } from 'vue'

export function createPerformerRoute() {
  const records: Reactive<Performer[]> = reactive([])

  const saveAll = save.bind(null, 'Performer', records)

  const updatePerformerRecords = updateRecords.bind(null, records)

  const moveItem = getMoveItemMethod(records)

  return {
    records,
    updateRecords: updatePerformerRecords,
    updateOrder: updateOrder.bind(null, records),
    fetchRecords: fetchRecords.bind(null, 'Performer', records),
    moveItem,
    updateField: updateField.bind(null, 'Performer', records),
    addNewRecord: addNewRecord.bind(null, 'Performer', records),
    saveAll,
  }
}
