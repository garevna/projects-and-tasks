import { api, modeHandler } from '@/configs'
import { putRecord } from '@/db'
import type { Record, Route } from '@/types'
import axios from 'axios'

export async function saveRecord<T extends Record>(route: Route, record: T) {
  if (!record) {
    return false
  }

  let response: { data: T | null; error: DOMException | null }

  if (modeHandler() === 'local') {
    response = await putRecord(route.toLowerCase() + 's', record)
  } else {
    response = await axios.put(`${api}${route.toLowerCase() + 's'}`, record)
  }
  return response
}
