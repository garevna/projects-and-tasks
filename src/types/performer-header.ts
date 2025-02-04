import type { Performer } from '@/types/performer'

type ExcludedKeys = 'id, order, chain'
type HeaderField = Exclude<keyof Performer, ExcludedKeys>

export interface PerformerHeader {
  order: number
  title: string
  type: string
  align?: 'center' | 'left' | 'right' | 'justify'
  width: number
  field: HeaderField | 'tasks'
  edit?: boolean
}
