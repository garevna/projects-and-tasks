import type { Task } from '@/types'
import { getAlertIcon } from './getAlertIcon'

export function getAlertIconColor(record: Task, field: keyof Task) {
  return getAlertIcon(record, field) === 'error' ? '#d44' : '#fa4'
}
