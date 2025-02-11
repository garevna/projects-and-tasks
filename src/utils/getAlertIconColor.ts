import { alertIconColors } from '@/configs'
import type { Task } from '@/types'
import { getAlertIcon } from './getAlertIcon'

export function getAlertIconColor(record: Task, field: keyof Task) {
  const alertIcon = getAlertIcon(record, field) as string | undefined
  if (!alertIcon) {
    return undefined
  }
  if (alertIcon in alertIconColors) {
    return alertIconColors[alertIcon as keyof typeof alertIconColors]
  } else {
    return undefined
  }
}
