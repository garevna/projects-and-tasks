import type { TasksInfoType } from '@/types'
import type { InjectionKey } from 'vue'

type TaskInfo = { [key: string]: TasksInfoType }

export const injectionKeyTaskInfoForPerformers = Symbol.for(
  'task-info-for-performers',
) as InjectionKey<TaskInfo>
