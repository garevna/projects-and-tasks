import { modeHandler } from '@/configs'
import { refreshLocalTasks } from '@/db'
import type { TasksInfoType } from '@/types'
import { refreshRemoteTasks } from './refreshRemoteTasks'

type TaskInfo = { [key: string]: TasksInfoType }

export async function refreshTasks(): Promise<{
  taskInfoForProjects: TaskInfo
  taskInfoForPerformers: TaskInfo
} | null> {
  return modeHandler() === 'local' ? await refreshLocalTasks() : await refreshRemoteTasks()
}
