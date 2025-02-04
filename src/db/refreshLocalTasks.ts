import { openDB } from './openDB'

import type { TasksInfoType } from '@/types'
import { refreshTaskInfo } from '@/utils'

import { reactive } from 'vue'

type TaskInfo = { [key: string]: TasksInfoType }

export async function refreshLocalTasks(): Promise<{
  taskInfoForProjects: TaskInfo
  taskInfoForPerformers: TaskInfo
} | null> {
  const taskInfoForProjects = reactive({})
  const taskInfoForPerformers = reactive({})
  const { db, error } = await openDB()
  if (!db) {
    console.error(error)
    return null
  }
  const store = db.transaction(['tasks'], 'readonly').objectStore('tasks')

  return new Promise((resolve) => {
    const request = store.openCursor()
    request.onsuccess = async () => {
      const cursor = request.result
      if (cursor) {
        const task = cursor.value
        refreshTaskInfo('projectId', task, taskInfoForProjects)
        refreshTaskInfo('performerId', task, taskInfoForPerformers)
        cursor.continue()
      } else {
        resolve({ taskInfoForProjects, taskInfoForPerformers })
      }
    }
  })
}
