import type { TaskStatus } from './task-status'

export interface Task {
  id: string
  projectId: string
  date: number
  deadline: number
  order: number
  title: string
  description: string
  status: TaskStatus
  performerId: string
}
