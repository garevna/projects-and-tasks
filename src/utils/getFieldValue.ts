import { projectHeaders, taskHeaders } from '@/configs'
import type { Project, Task } from '@/types'

/* eslint-disable @typescript-eslint/no-explicit-any */

export function getFieldValue<T extends Project | Task>(object: T, field: keyof T): any {
  if (object === null || field === undefined) return ''
  if (!(field in object)) return ''

  const value = object[field]

  const projectFieldType = projectHeaders.find((project) => project.field === field)?.type
  const taskFieldType = taskHeaders.find((task) => task.field === field)?.type

  const type = projectFieldType || taskFieldType

  if (!type) return value

  const result =
    type === 'date' && typeof value === 'number'
      ? new Date(value).toISOString().slice(0, 10)
      : value
  return result
}
