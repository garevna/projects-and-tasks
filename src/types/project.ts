import type { ProjectStatus } from './project-status'

export type Project = {
  id: string
  date: number
  order: number
  chain: { [key: string]: number }
  title: string
  description: string
  status: ProjectStatus
}
