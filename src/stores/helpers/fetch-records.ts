import { api, modeHandler } from '@/configs'
import { getAllRecords, getRecordsByKey } from '@/db'
import type { Route } from '@/types'
// import type { Reactive } from 'vue'
import axios from 'axios'
import { parseSubroute } from './parse-subroute'

export async function fetchRecords<T extends { order: number; chain: { [key: string]: number } }>(
  route: Route,
  records: Array<T>,
  subroute: string,
): Promise<void> {
  const dbname = route.toLowerCase() + 's'
  const remote = `${api}${dbname}${subroute}`

  const { key, value } = parseSubroute(subroute)

  records.length = 0

  if (modeHandler() === 'local') {
    const response: { data: Array<T> | null; error: DOMException | null } =
      key && value ? await getRecordsByKey(dbname, key, value) : await getAllRecords(dbname)
    if (!response.data) {
      console.error(response.error)
    } else {
      records.push(...response.data)
    }
  } else {
    const result: Array<T> = await axios(remote).then((res) => res.data)
    records.push(...result)
  }

  records.forEach((record, index) => {
    if (!record.chain) {
      Object.assign(record, { chain: {} })
    }
    if (!record.chain[subroute]) {
      Object.assign(record.chain, {
        [subroute]: index + 1,
      })
    }

    Object.assign(record, { order: record.chain[subroute] })

    records.sort((a, b) => (a.order < b.order ? 1 : a.order > b.order ? -1 : 0))
  })
}
