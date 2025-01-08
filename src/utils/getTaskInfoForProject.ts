import { initialProjectTasksInfo } from '@/configs'
import type { ProjectTasksInfo, Task } from '@/types'
import { dateToNumber } from '@/utils'

export function getTaskInfoForProject(task: Task, result: { [key: string]: ProjectTasksInfo }) {
  const currentDate = dateToNumber()
  if (!(task.projectId in result)) {
    result[task.projectId] = JSON.parse(JSON.stringify(initialProjectTasksInfo))
  }
  result[task.projectId].total++
  if (task.status === 'finished') {
    result[task.projectId].finished++
  } else {
    if (task.deadline < currentDate) {
      result[task.projectId].behindSchedule++
    }
    if (task.deadline === currentDate) {
      result[task.projectId].mustBeFinishedToday++
    }
  }
}
