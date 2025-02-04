import type { TaskState } from './task-state'
import type { TaskStatus } from './task-status'

export type Task = {
  id: string
  projectId: string
  date: number
  deadline: number
  order: number
  chain: { [key: string]: number }
  title: string
  description: string
  status: TaskStatus
  state: TaskState
  performerId: string
}
