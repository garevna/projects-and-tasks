import type { Project, Task } from '@/types'
import { useProjectStore } from '@/stores/projects'
import { useTaskStore } from '@/stores/tasks.ts'

type RecordTypeMapping = {
  Project: Project
  Task: Task
}

const isProjectArray = (data: unknown): data is Project[] => {
  return Array.isArray(data) && data.every((item) => !('projectId' in item))
}

const isTaskArray = (data: unknown): data is Task[] => {
  return Array.isArray(data) && data.every((item) => 'projectId' in item)
}

export function updateRecords<T extends keyof RecordTypeMapping>(data: RecordTypeMapping[T][]) {
  if (isProjectArray(data)) {
    useProjectStore().update(data)
  } else if (isTaskArray(data)) {
    useTaskStore().update(data)
  } else {
    throw new Error('Invalid data type')
  }
}
