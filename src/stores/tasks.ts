import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { getBackAPI } from './helpers/getBackAPI'
import type { Task, Moved, Modified, TaskStatus } from '@/types'
import { dateToNumber } from '@/utils'
import { modeHandler } from '@/configs'
import { getRecordsByKey, postRecord, putRecords } from '@/db'

export const useTaskStore = defineStore('tasks', () => {
  const api = getBackAPI()
  type TaskList = Awaited<ReturnType<typeof fetchRecords>>

  const rawList: TaskList = []

  const records: TaskList = reactive([])

  // const tasksInfo: { [key: string]: ProjectTasksInfo } = reactive({})

  const ready: Ref<boolean> = ref(false)

  const projectId: Ref<string | null> = ref(null)

  function updateProjectId(id: string) {
    projectId.value = id
    updateRecords()
  }

  async function getTasksByStatus(status: TaskStatus) {
    const response: { data: Task[] | null; error: DOMException | null } = await getRecordsByKey(
      'tasks',
      'status',
      status,
    )
    if (response.data) {
      rawList.length = 0
      rawList.push(...response.data)
      updateRecords()
    } else {
      console.error(response.error)
    }
  }

  async function getTasksByPerformer(performerId: string) {
    const response: { data: Task[] | null; error: DOMException | null } = await getRecordsByKey(
      'tasks',
      'performerId',
      performerId,
    )
    if (response.data) {
      rawList.length = 0
      rawList.push(...response.data)
      updateRecords()
    } else {
      console.error(response.error)
    }
    updateRecords()
  }

  async function getTasksByProject(projectId: string) {
    const response: { data: Task[] | null; error: DOMException | null } = await getRecordsByKey(
      'tasks',
      'projectId',
      projectId,
    )
    if (response.data) {
      rawList.length = 0
      rawList.push(...response.data)
      updateRecords()
    } else {
      console.error(response.error)
    }
    updateRecords()
  }

  async function fetchRecords(
    projectId: string | undefined,
    performerId: string | undefined,
    status: TaskStatus | undefined,
  ): Promise<Array<Task>> {
    if (modeHandler() === 'local') {
      if (projectId) {
        getTasksByProject(projectId)
      } else {
        if (performerId) {
          getTasksByPerformer(performerId)
        } else {
          if (status) {
            getTasksByStatus(status)
          } else {
            console.warn('Illegal invocation!')
          }
        }
      }
    } else {
      const result: Task[] = await axios(`${api}tasks`).then((res) => res.data)
      rawList.length = 0
      if (projectId) {
        rawList.push(...result.filter((task) => task.projectId === projectId))
      } else {
        if (performerId) {
          rawList.push(...result.filter((task) => task.performerId === performerId))
        } else {
          if (status) {
            rawList.push(...result.filter((task) => task.status === status))
          } else {
            console.warn('Illegal invocation!')
          }
        }
      }
      updateRecords()
    }

    ready.value = true

    return rawList
  }

  function updatePerformerId(recordId: string, performerId: string) {
    console.log(recordId, performerId)
    const task = rawList.find((record) => record.id === recordId)
    if (task) {
      Object.assign(task, { performerId })
    }
    updateRecords()
  }

  function calcTasksForProjects() {

  }

  async function updateRecords() {
    // const response = await calcTasksForProjects()
    // console.log(response)
    // if (!response) {
    //   console.warn('Failed to calculate tasks for projects.')
    // } else {
    //   tasksInfo = reactive(response)
    // }
    records.length = 0
    if (projectId.value) {
      records.push(
        ...rawList
          .filter((record) => record.projectId === projectId.value)
          .sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0))
          .map((record: Task, index: number) => Object.assign(record, { order: index + 1 })),
      )
    } else {
      records.push(
        ...rawList.sort((a, b) =>
          a.projectId < b.projectId
            ? -1
            : a.projectId > b.projectId
              ? 1
              : a.order < b.order
                ? -1
                : a.order > b.order
                  ? 1
                  : 0,
        ),
      )
    }
  }

  function update(updated: TaskList): void {
    updated.forEach((item: Task, index: number) => Object.assign(item, { order: index }))
  }

  function moveItem(arg: { moved: Moved }) {
    const {
      moved: { oldIndex, newIndex },
    } = arg

    if (newIndex === oldIndex) return

    rawList.splice(newIndex, 0, rawList.splice(oldIndex, 1)[0])
    rawList.forEach((item, index) => Object.assign(item, { order: index + 1 }))
    updateRecords()
  }

  function updateField(modified: Modified) {
    const { id, field, value } = modified
    const task: Task | undefined = rawList.find((item: Task) => item.id === id)
    if (task) Object.assign(task, { [field]: value })

    updateRecords()
  }

  async function addNewRecord(projectId: string) {
    const tasks = rawList.filter((item) => item.projectId === projectId)

    const order = tasks.length ? Math.max(...tasks.map((item: Task) => item.order)) + 1 : 1

    const record = {
      projectId,
      order,
      date: Date.now(),
      title: 'Unnomous Task',
      description: '...',
      status: 'not started yet',
      deadline: dateToNumber(undefined, 10),
      performerId: '',
    }

    if (modeHandler() === 'local') {
      const response: { data: string | null; error: DOMException | null } = await postRecord(
        'tasks',
        record,
      )
      console.log(response)
      if (response.data) {
        const task = Object.assign({}, record, { id: response.data }) as Task
        rawList.push(task)
        updateRecords()
      }
    } else {
      const response = await axios.post(`${api}tasks`, record)
      console.log(response)
      if (response.status === 201) {
        rawList.push(response.data)
        updateRecords()
      }
    }
  }

  async function saveAll() {
    if (modeHandler() === 'local') {
      // const promises = rawList.map((record) => putRecordByKey('tasks', record))
      // await Promise.all(promises)
      await putRecords('tasks', rawList)
    } else {
      const promises = rawList.map((task: Task) => axios.put(`${api}tasks/${task.id}`, task))
      await Promise.all(promises)
    }
  }

  return {
    ready,
    records,
    fetchRecords,
    getTasksByProject,
    getTasksByStatus,
    getTasksByPerformer,
    moveItem,
    update,
    updateField,
    addNewRecord,
    saveAll,
    updateProjectId,
    updatePerformerId,
    calcTasksForProjects,
  }
})
