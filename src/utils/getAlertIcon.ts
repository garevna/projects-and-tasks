import { taskStatusAndDeadline, taskStatusIcons } from '@/configs'
import type { Task } from '@/types'
import { dateToNumber } from './dateToNumber'

export function getAlertIcon(record: Task, field: keyof Task): string | undefined {
  if (field === 'status') {
    if (record.status in taskStatusIcons) {
      return taskStatusIcons[record.status] as string | undefined
    }
  } else {
    if (
      field === 'deadline' &&
      record.status in taskStatusAndDeadline &&
      taskStatusAndDeadline[record.status]
    ) {
      return record.deadline < dateToNumber(new Date())
        ? 'error'
        : record.deadline === dateToNumber(new Date())
          ? 'warning'
          : undefined
    } else {
      return undefined
    }
  }
}
