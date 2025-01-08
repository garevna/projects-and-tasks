import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { getBackAPI } from './helpers/getBackAPI'
import type { Task, Performer } from '@/types'
import { defaultAvatar } from '@/configs'

import { modeHandler } from '@/configs'
import { getAllRecords /* postRecord, putRecords */ } from '@/db'

export const usePerformerStore = defineStore('performer', () => {
  const api = getBackAPI()
  type PerformerList = Awaited<ReturnType<typeof fetchRecords>>

  const rawList: PerformerList = []
  const records: PerformerList = reactive([])

  async function fetchRecords(): Promise<Performer[]> {
    if (modeHandler() === 'local') {
      const response: { data: Performer[] | null; error: DOMException | null } =
        await getAllRecords('performers')
      console.log(response)
      if (response.data) {
        rawList.push(...response.data)
      }
    } else {
      const result: Performer[] = await axios(`${api}performers`).then((res) => res.data)
      rawList.push(...result)
    }
    return rawList
  }

  function getPerformerAvatar(source: Task) {
    const performer = rawList.find((record) => record.id === source.performerId)
    if (performer) {
      return performer.avatar
    } else {
      console.error('Performer does not exist.')
      return defaultAvatar
    }
  }

  function getPerformerName(source: Task) {
    const performer = rawList.find((record) => record.id === source.performerId)
    if (performer) {
      return performer.name
    } else {
      return 'Performer name not specified'
    }
  }

  function getPerformerSpeciality(source: Task) {
    const performer = rawList.find((record) => record.id === source.performerId)
    if (performer) {
      return performer.speciality || ''
    } else {
      return 'Speciality not specified'
    }
  }

  function updateRecords() {
    records.length = 0
    records.push(...rawList)
  }

  return {
    records,
    fetchRecords,
    updateRecords,
    getPerformerAvatar,
    getPerformerName,
    getPerformerSpeciality,
  }
})
