import type { Project } from '@/types/project'

type HeaderField = keyof Project

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProjectHeader {
  order: number
  title: string
  type: string
  action?: any
  align?: 'center' | 'left' | 'right' | 'justify'
  field: HeaderField
}
