import { api, modeHandler } from '@/configs'
import { putRecords } from '@/db'
import type { Record, Route } from '@/types'
import axios from 'axios'

export async function save(route: Route, records: Array<Record>) {
  let response = {}
  if (modeHandler() === 'local') {
    response = await putRecords(route.toLowerCase() + 's', records)
  } else {
    const promises = records.map(
      (record) => (response = axios.put(`${api}${route.toLowerCase() + 's'}/${record.id}`, record)),
    )
    await Promise.all(promises)
  }

  return response
}
