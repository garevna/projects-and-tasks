import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import type { ProjectHeader } from '@/types/project-header'
import type { TaskHeader } from '@/types/task-header'

function getProjectFieldValue(project: Project, header: ProjectHeader): string | number {
  const value = project[header.field]
  return header.field === 'date' ? new Date(value).toISOString().slice(0, 10) : value
}

function getTaskFieldValue(task: Task, header: TaskHeader) {
  const value = task[header.field]
  return header.field === 'date' || header.field === 'deadline'
    ? new Date(value).toISOString().slice(0, 10)
    : value
}

export function getFieldValue(object: object, header: object): string | number {
  if (!object) return ''
  const isProject = !Object.keys(object).includes('deadline')

  if (isProject) {
    const sourceData = object as Project
    const sourceHeader = header as ProjectHeader
    return getProjectFieldValue(sourceData, sourceHeader)
  } else {
    const sourceData = object as Task
    const sourceHeader = header as TaskHeader
    return getTaskFieldValue(sourceData, sourceHeader)
  }
}
