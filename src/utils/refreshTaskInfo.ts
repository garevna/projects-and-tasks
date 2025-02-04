import { initialTasksInfo } from '@/configs'
import { saveTaskRecord } from './saveTaskRecord'
import type { Task, TasksInfoType } from '@/types'
import { dateToNumber } from '@/utils'

export function refreshTaskInfo(
  searchKey: 'projectId' | 'performerId',
  task: Task,
  result: { [key: string]: TasksInfoType },
): void {
  const currentDate = dateToNumber()
  const value = task[searchKey]
  if (!(value in result)) {
    result[value] = JSON.parse(JSON.stringify(initialTasksInfo))
  }
  result[value].total++
  if (task.status === 'finished') {
    result[value].finished++
  } else {
    if (task.deadline < currentDate) {
      result[value].behindSchedule++
      Object.assign(task, { state: 'behind-schedule' })
      saveTaskRecord(task)
    }
    if (task.deadline === currentDate) {
      result[value].mustBeFinishedToday++
      Object.assign(task, { state: 'must-be-finished-today' })
      saveTaskRecord(task)
    }
  }
}
