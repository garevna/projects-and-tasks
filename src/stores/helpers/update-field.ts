import type { Modified, Record, Route } from '@/types'
import { dateToNumber } from '@/utils'
import { parseSubroute } from './parse-subroute'

export function updateField(
  route: Route,
  records: Array<Record>,
  subroute: string,
  modified: Modified,
) {
  const { id, field, value } = modified
  const { key, value: val } = parseSubroute(subroute)

  const record: Record | undefined = records.find((item: Record) => item.id === id)

  if (record) {
    Object.assign(record, { [field]: value instanceof Date ? dateToNumber(value) : value })

    if (route === 'Task' && field === 'deadline' && key === 'state') {
      const state =
        dateToNumber(value) < dateToNumber(new Date())
          ? 'behind-schedule'
          : dateToNumber(value) === dateToNumber(new Date())
            ? 'must-be-finished-today'
            : ''
      Object.assign(record, { state })
      if (state !== val) {
        return { subroute: state ? `?state=${state}` : '/' }
      }
    }

    if (key && val && field === key && value !== val) {
      return { subroute: `?${key}=${value}` }
    } else {
      //
    }
  }
}
