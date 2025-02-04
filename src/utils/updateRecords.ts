import type { Project, Task, Performer } from '@/types'
import { useProjectStore } from '@/stores/projects'
import { useTaskStore } from '@/stores/tasks'
import { usePerformerStore } from '@/stores/performers'

type RecordTypeMapping = {
  Project: Project
  Task: Task
  Performer: Performer
}

const isProjectArray = (data: unknown): data is Project[] => {
  return Array.isArray(data) && data.every((item) => !('projectId' in item) && !('avatar' in item))
}

const isTaskArray = (data: unknown): data is Task[] => {
  return Array.isArray(data) && data.every((item) => 'projectId' in item)
}

const isPerformerArray = (data: unknown): data is Performer[] => {
  return Array.isArray(data) && data.every((item) => 'avatar' in item)
}

export function updateRecords<T extends keyof RecordTypeMapping>(data: RecordTypeMapping[T][]) {
  if (isProjectArray(data)) {
    useProjectStore().update(data)
  } else if (isTaskArray(data)) {
    useTaskStore().update(data)
  } else {
    if (isPerformerArray(data)) {
      usePerformerStore().update(data)
    } else {
      throw new Error('Invalid data type')
    }
  }
}
