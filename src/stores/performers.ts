import { defineStore } from 'pinia'

import type { Performer, PerformerStatus } from '@/types'
import { getListOfStatusValues } from '@/utils'
import { reactive } from 'vue'
import { createPerformerRoute } from './createPerformerRoute'

export const usePerformerStore = defineStore('performers', () => {
  type PerformerList = Awaited<Performer[]>

  const statusValues: PerformerStatus[] = reactive(
    getListOfStatusValues('Performer') as PerformerStatus[],
  )

  function update(updated: PerformerList): void {
    updated.forEach((record, index) => Object.assign(record, { order: index }))
  }

  const {
    records,
    updateRecords,
    fetchRecords,
    moveItem,
    updateField,
    updateOrder,
    addNewRecord,
    saveAll,
  } = createPerformerRoute()

  return {
    records,
    statusValues,
    fetchRecords,
    updateRecords,
    moveItem,
    update,
    updateField,
    updateOrder,
    addNewRecord,
    saveAll,
  }
})
