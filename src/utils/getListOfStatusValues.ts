import { getListOfProjectStatusValues } from './getListOfProjectStatusValues'
import { getListOfTaskStatusValues } from './getListOfTaskStatusValues'
import type { Project, Task } from '@/types'
import { ProjectStatusValues, TaskStatusValues } from '@/configs'

const projectStatusList = getListOfProjectStatusValues()
const taskStatusList = getListOfTaskStatusValues()

export function getListOfStatusValues(
  record: Project | Task,
): ProjectStatusValues[] | TaskStatusValues[] | [] {
  if (record as Task) {
    return taskStatusList
  } else {
    if (record as Project) {
      return projectStatusList
    } else {
      return []
    }
  }
}
