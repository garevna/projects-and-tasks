import type { Project } from '@/types/project'

type HeaderField = keyof Project

export interface ProjectHeader {
  order: number
  title: string
  field: HeaderField
}
