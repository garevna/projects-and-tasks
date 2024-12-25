import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { getBackAPI } from './helpers/getBackAPI'
import type { Project, Moved, Modified } from '@/types'
import { useTaskStore } from './tasks'
import { getPropValue } from '@/utils'

export const useProjectStore = defineStore('projects', () => {
  const api = getBackAPI()
  type ProjectList = Awaited<ReturnType<typeof fetchRecords>>

  const { calcTasksForProjects } = useTaskStore()

  const rawList: ProjectList = []

  const records: ProjectList = reactive([])

  async function fetchRecords(): Promise<Array<Project>> {
    const result: Project[] = await axios(`${api}projects`).then((res) => res.data)
    rawList.push(...result)

    updateRecords()

    return result
  }

  type TasksOfProjects = {
    [key: string]: number
  }

  function updateRecords() {
    records.length = 0
    records.push(
      ...rawList.sort((a: Project, b: Project) => {
        return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
      }),
    )
  }

  function updateTasks() {
    const tasks: TasksOfProjects = calcTasksForProjects() as TasksOfProjects
    Object.keys(tasks).forEach((key) => {
      const project = rawList.find((project) => project.id === key)
      if (project) project.tasks = tasks[key]
    })
    rawList.forEach((project) =>
      Object.assign(project, {
        tasks: getPropValue(tasks, project.id),
      }),
    )

    updateRecords()
    console.log(rawList)
    console.log(records)
  }

  function filter(field: string, value: string | number) {
    if (!field || !value) {
      updateRecords()
      return
    }
    const propName = field as keyof Project
    records.length = 0
    records.push(...rawList.filter((record: Project) => getPropValue(record, propName) === value))
  }

  function sort(field: string, value: string | number, ascending: boolean = true) {
    if (!field || !value) {
      updateRecords()
      return
    }
    const propName = field as keyof Project
    if (ascending) {
      records.sort((a, b) => {
        if (a[propName] < b[propName]) return 1
        else {
          if (a[propName] > b[propName]) return -1
          else return 0
        }
      })
    } else {
      records.sort((a, b) => {
        if (a[propName] < b[propName]) return -1
        else {
          if (a[propName] > b[propName]) return 1
          else return 0
        }
      })
    }
  }

  function update(updated: ProjectList): void {
    updated.forEach((item, index) => Object.assign(item, { order: index }))
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
    const project: Project | undefined = rawList.find((item: Project) => item.id === id)
    if (project) {
      Object.assign(project, { [field]: value })
    }

    updateRecords()
  }

  async function addNewRecord() {
    const order = Math.max(...rawList.map((item) => item.order))
    const id = Math.max(...rawList.map((item: Project) => parseInt(item.id))) + 1 + ''
    const project: Project = {
      id,
      order,
      date: Date.now(),
      title: 'Unnomous Project',
      description: '...',
      status: 'new',
      tasks: 0,
    }
    const result = await axios.post(`${api}projects`, project)

    if (result.status === 201) {
      rawList.push(result.data)
      updateRecords()
    }
  }

  async function saveAll() {
    const promises = rawList.map((project) => axios.put(`${api}projects/${project.id}`, project))
    await Promise.all(promises)
  }

  return {
    records,
    fetchRecords,
    updateRecords,
    updateTasks,
    moveItem,
    update,
    updateField,
    addNewRecord,
    saveAll,
    filter,
    sort,
  }
})
