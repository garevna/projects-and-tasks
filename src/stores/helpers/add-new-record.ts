import { api, modeHandler, newPerformerRecord, newProjectRecord, newTaskRecord } from '@/configs'
import { postRecord } from '@/db'
import type { Record, Route } from '@/types'
import axios from 'axios'
import { parseSubroute } from './parse-subroute'

export async function addNewRecord<T extends Record>(
  route: Route,
  records: Array<T>,
  subroute: string,
) {
  const record: Record | null =
    route === 'Project'
      ? newProjectRecord
      : route === 'Task'
        ? newTaskRecord
        : route === 'Performer'
          ? newPerformerRecord
          : null

  if (!record) {
    return false
  }

  const { key, value } = parseSubroute(subroute)

  const order = records.length ? Math.max(...records.map((item: T) => item.order)) + 1 : 1

  if (key && value) {
    Object.assign(record, { [key]: value, order })
    Object.assign(record.chain, { [subroute]: order })
  }

  let response: { data: string | null; error: DOMException | null }

  if (modeHandler() === 'local') {
    response = await postRecord(route.toLowerCase() + 's', record)
  } else {
    Object.assign(record, {
      id: Date.now().toString(),
    })
    response = await axios.post(`${api}${route.toLowerCase() + 's'}`, record)
  }

  if (response.data) {
    if (response.data) {
      Object.assign(record, { id: response.data })
      records.push(record as T)
    }
  }
}
