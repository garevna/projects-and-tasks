import { api } from '@/configs'
import type { Task, TasksInfoType } from '@/types'
import axios from 'axios'

import { reactive } from 'vue'
import { refreshTaskInfo } from './refreshTaskInfo'

type TaskInfo = { [key: string]: TasksInfoType }

/* eslint-disable no-var */

export async function refreshRemoteTasks() {
  const taskInfoForProjects: TaskInfo = reactive({})
  const taskInfoForPerformers: TaskInfo = reactive({})
  let page = 1
  const recordsPerPage = 50
  do {
    var result: { data: { next: number | null; data: Task[] } } = await axios(
      `${api}tasks?_page=${page++}&_per_page=${recordsPerPage}`,
    )
    var { next, data } = result.data

    for (const task of data) {
      refreshTaskInfo('projectId', task, taskInfoForProjects)
      refreshTaskInfo('performerId', task, taskInfoForPerformers)
    }
  } while (next)

  return { taskInfoForProjects, taskInfoForPerformers }
}
