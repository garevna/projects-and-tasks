import { ProjectStatusValues } from '@/configs'
import { statusValuesGenerator } from './statusValuesGenerator'

export function getListOfProjectStatusValues() {
  const iterator = statusValuesGenerator(ProjectStatusValues)
  return [...iterator]
}
