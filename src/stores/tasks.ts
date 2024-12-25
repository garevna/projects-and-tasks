import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { getBackAPI } from './helpers/getBackAPI'
import type { Task, Moved, Modified } from '@/types'
// import type { Moved } from '@/types/moved'
// import type { Modified } from '@/types/modified'

export const useTaskStore = defineStore('tasks', () => {
  const api = getBackAPI()
  type TaskList = Awaited<ReturnType<typeof fetchRecords>>

  const rawList: TaskList = []

  const records: TaskList = reactive([])

  const projectId: Ref<string | null> = ref(null)

  function updateProjectId(id: string) {
    projectId.value = id
    updateRecordsOrder()
  }

  async function fetchRecords(): Promise<Array<Task>> {
    const result: Task[] = await axios(`${api}tasks`).then((res) => res.data)
    rawList.push(...result)

    updateRecordsOrder()

    return result
  }

  function getProjectTasks(projectId: string) {
    return rawList.filter((task: Task) => task.projectId === projectId)
  }

  function calcTasksForProjects(): object {
    const keysIterator = new Set(rawList.map((task) => task.projectId)).values()
    const result = {}
    for (const key of keysIterator) {
      Object.assign(result, {
        [key]: rawList.filter((item) => item.projectId === key).length,
      })
    }

    return result
  }

  function updateRecordsOrder() {
    records.length = 0
    if (projectId.value) {
      records.push(...rawList.filter((record) => record.projectId === projectId.value))
      return
    }
    records.push(
      ...rawList.sort((a: Task, b: Task) => {
        return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
      }),
    )
  }

  function update(updated: TaskList): void {
    updated.forEach((item: Task, index: number) => Object.assign(item, { order: index }))
  }

  function moveItem(moved: Moved) {
    rawList[moved.oldIndex - 1].order = moved.newIndex
    rawList.forEach((task: Task, index: number) => {
      if (index !== moved.oldIndex - 1) {
        if (moved.oldIndex > moved.newIndex) {
          if (task.order >= moved.newIndex) {
            Object.assign(task, { order: task.order + 1 })
          }
        } else {
          if (index !== moved.oldIndex - 1 && task.order <= moved.newIndex) {
            Object.assign(task, { order: task.order - 1 })
          }
        }
      } else {
        Object.assign(task, { order: moved.newIndex })
      }
    })

    updateRecordsOrder()
  }

  function updateField(modified: Modified) {
    const { id, field, value } = modified
    const task: Task | undefined = rawList.find((item: Task) => item.id === id)
    if (task) {
      if (field === 'date' || field === 'deadline') {
        const data = value.toString()
        Object.assign(task, { [field]: Date.parse(data) })
      } else {
        Object.assign(task, { [field]: value })
      }
    }

    updateRecordsOrder()
  }

  async function addNewRecord(projectId: string) {
    const order = Math.max(...rawList.map((item: Task) => item.order)) + 1
    const id = Math.max(...rawList.map((item: Task) => parseInt(item.id)))
    const task: Task = {
      id: id + 1 + '',
      projectId,
      order,
      date: Date.now(),
      title: 'Unnomous Task',
      description: '...',
      status: 'new',
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 5,
      performer: '',
    }
    const result = await axios.post(`${api}tasks`, task)

    if (result.status === 201) {
      rawList.push(result.data)
      updateRecordsOrder()
    }
  }

  async function saveAll() {
    const promises = rawList.map((task: Task) => axios.put(`${api}tasks/${task.id}`, task))
    await Promise.all(promises)
  }

  return {
    records,
    fetchRecords,
    getProjectTasks,
    calcTasksForProjects,
    moveItem,
    update,
    updateField,
    addNewRecord,
    saveAll,
    updateProjectId,
  }
})
