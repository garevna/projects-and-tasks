import type { ProjectStatus } from './project-status'

export interface Project {
  id: string
  date: number
  order: number
  title: string
  description: string
  status: ProjectStatus
}
