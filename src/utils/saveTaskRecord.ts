import { api, modeHandler } from '@/configs'
import { putRecord } from '@/db'
import type { Task } from '@/types'
import axios from 'axios'

export async function saveTaskRecord(task: Task) {
  if (modeHandler() === 'local') {
    await putRecord('projects', task)
  } else {
    await axios.put(`${api}tasks/${task.id}`, task)
  }
}
