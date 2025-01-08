import type { Task } from '@/types/task'

type ExcludedKeys = 'projectId'
type HeaderField = Exclude<keyof Task, ExcludedKeys>

export interface TaskHeader {
  order: number
  title: string
  type: string
  align?: 'center' | 'left' | 'right' | 'justify'
  width: number
  field: HeaderField
  edit?: boolean
}
