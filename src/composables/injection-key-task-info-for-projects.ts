import type { TasksInfoType } from '@/types'
import type { InjectionKey } from 'vue'

type TaskInfo = { [key: string]: TasksInfoType }

export const injectionKeyTaskInfoForProjects = Symbol.for(
  'task-info-for-projects',
) as InjectionKey<TaskInfo>
