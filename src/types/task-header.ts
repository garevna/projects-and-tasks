import type { Task } from '@/types/task'

type ExcludedKeys = 'projectId'
type HeaderField = Exclude<keyof Task, ExcludedKeys>

// type HeaderField = keyof Task

export interface TaskHeader {
  order: number
  title: string
  type: string
  align?: 'center' | 'left' | 'right' | 'justify'
  field: HeaderField
}
