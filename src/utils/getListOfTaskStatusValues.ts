import { TaskStatusValues } from '@/configs'
import { statusValuesGenerator } from './statusValuesGenerator'

export function getListOfTaskStatusValues() {
  const iterator = statusValuesGenerator(TaskStatusValues)
  return [...iterator]
}
