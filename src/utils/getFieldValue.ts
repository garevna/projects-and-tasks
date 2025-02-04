import type { Performer, Project, Task } from '@/types'
import { dateToString } from './dateToString'

/* eslint-disable @typescript-eslint/no-explicit-any */

export function getFieldValue<T extends Project | Task | Performer>(
  object: T,
  field: keyof T,
  type?: string,
): any {
  if (object === null || !field || !type) return ''
  if (!(field in object)) return ''

  const value = object[field]

  if (!type) return value

  const result = type === 'date' ? dateToString(value as number | string) : value
  return result
}
