import type { Task, TaskState } from '@/types'

const toBeIgnored = ['finished', 'canceled']

export function getTaskStateValue(task: Task): TaskState {
  const currentDate = Date.parse(new Date().toISOString().slice(0, 10))
  return toBeIgnored.includes(task.status)
    ? ''
    : task.deadline < currentDate
      ? 'Behind schedule'
      : task.deadline === currentDate
        ? 'Must be finished today'
        : ''
}
