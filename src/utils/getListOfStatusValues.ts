import { PerformerStatusValues, ProjectStatusValues, TaskStatusValues } from '@/configs'
import { statusValuesGenerator } from './statusValuesGenerator'

export function getListOfStatusValues(route: 'Project' | 'Task' | 'Performer') {
  const sourceData =
    route === 'Project'
      ? ProjectStatusValues
      : route === 'Task'
        ? TaskStatusValues
        : route === 'Performer'
          ? PerformerStatusValues
          : null
  if (sourceData) {
    const iterator = statusValuesGenerator(sourceData)
    return [...iterator]
  } else return null
}
