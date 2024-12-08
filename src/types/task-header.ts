import type { Task } from '@/types/task'

type HeaderField = keyof Task

export interface TaskHeader {
  order: number
  title: string
  field: HeaderField
}
