import type { Project } from '@/types/project'

type ExcludedKeys = 'id'
type HeaderField = Exclude<keyof Project, ExcludedKeys>

// type HeaderField = keyof Project

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProjectHeader {
  order: number
  title: string
  type: string
  action?: any
  align?: 'center' | 'left' | 'right' | 'justify'
  width: number
  field: HeaderField | 'tasks'
  edit?: boolean
}
