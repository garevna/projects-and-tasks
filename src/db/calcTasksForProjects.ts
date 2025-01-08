import type { ProjectTasksInfo } from '@/types'
import { openDB } from './openDB'
import { getTaskInfoForProject } from '@/utils'

type Result = {
  [key: string]: ProjectTasksInfo
}

export async function calcTasksForProjects(): Promise<Result | null> {
  const { db, error } = await openDB()
  if (!db) {
    console.error(error)
    return null
  }
  const store = db.transaction(['tasks'], 'readonly').objectStore('tasks')

  const result: Result = {}

  return new Promise((resolve) => {
    const request = store.openCursor()
    request.onsuccess = () => {
      const cursor = request.result
      if (cursor) {
        const task = cursor.value
        getTaskInfoForProject(task, result)
        cursor.continue()
      } else {
        resolve(result)
      }
    }
  })
}
