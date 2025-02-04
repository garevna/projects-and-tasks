import type { Task } from '@/types'
import { dateToNumber } from './dateToNumber'

export function getAlertIcon(record: Task, field: keyof Task) {
  if (record.status === 'finished') {
    return ''
  }

  if (field === 'status') {
    return record.status === 'problem' ? 'error' : ''
  }

  if (field === 'deadline') {
    if (record.deadline < dateToNumber(new Date())) {
      return 'error'
    }
    if (record.deadline === dateToNumber(new Date())) {
      return 'warning'
    }
  }

  return ''
}
