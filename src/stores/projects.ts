import type { Modified, Moved, Project, ProjectTasksInfo } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getBackAPI } from './helpers/getBackAPI'
// import { getPropValue } from '@/utils'

import { modeHandler } from '@/configs'
import { calcTasksForProjects, getAllRecords, postRecord, putRecords } from '@/db'

export const useProjectStore = defineStore('projects', () => {
  const api = getBackAPI()

  type ProjectList = Awaited<ReturnType<typeof fetchRecords>>

  const rawList: ProjectList = []

  const records: ProjectList = reactive([])

  let tasksInfo: { [key: string]: ProjectTasksInfo } = reactive({})

  async function fetchRecords(): Promise<Array<Project>> {
    if (modeHandler() === 'local') {
      console.log('Get projects from local DB')
      const response: { data: Project[] | null; error: DOMException | null } =
        await getAllRecords('projects')
      if (!response.data) {
        console.error(response.error)
      } else {
        rawList.push(...response.data)
      }
      tasksInfo = reactive((await calcTasksForProjects()) || {})
      console.log('Task Info:\n', tasksInfo)
    } else {
      console.log('Get projects from json-server')
      const result: Project[] = await axios(`${api}projects`).then((res) => res.data)
      rawList.push(...result)
    }

    updateRecords()

    return rawList
  }

  function updateRecords() {
    records.length = 0
    records.push(
      ...rawList.sort((a: Project, b: Project) => {
        return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
      }),
    )
  }

  // function filter(field: string, value: string | number) {
  //   if (!field || !value) {
  //     updateRecords()
  //     return
  //   }
  //   const propName = field as keyof Project
  //   records.length = 0
  //   records.push(...rawList.filter((record: Project) => getPropValue(record, propName) === value))
  // }

  // function sort(field: string, value: string | number, ascending: boolean = true) {
  //   if (!field || !value) {
  //     updateRecords()
  //     return
  //   }
  //   const propName = field as keyof Project
  //   if (ascending) {
  //     records.sort((a, b) => {
  //       if (a[propName] < b[propName]) return 1
  //       else {
  //         if (a[propName] > b[propName]) return -1
  //         else return 0
  //       }
  //     })
  //   } else {
  //     records.sort((a, b) => {
  //       if (a[propName] < b[propName]) return -1
  //       else {
  //         if (a[propName] > b[propName]) return 1
  //         else return 0
  //       }
  //     })
  //   }
  // }

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
    const order = rawList.length ? Math.max(...rawList.map((item: Project) => item.order)) + 1 : 1
    // const id: string = rawList.length
    //   ? Math.max(...rawList.map((item: Project) => parseInt(item.id))) + 1 + ''
    //   : '1'
    const project = {
      // id,
      order,
      date: Date.now(),
      title: 'Unnomous Project',
      description: 'New project',
      status: 'not started yet',
    }

    let response: { data: string | null; error: DOMException | null }

    if (modeHandler() === 'local') {
      response = await postRecord('projects', project)
    } else {
      response = await axios.post(`${api}projects`, project)
    }

    console.log(response)

    if (response.data) {
      if (response.data) {
        Object.assign(project, { id: response.data })
        rawList.push(project as Project)
      }

      updateRecords()
    }
  }

  async function saveAll() {
    console.log(rawList)
    if (modeHandler() === 'local') {
      // const promises = rawList.map((record) => putRecord('projects', record))
      // await Promise.all(promises)
      await putRecords('projects', rawList)
    } else {
      const promises = rawList.map((project) => axios.put(`${api}projects/${project.id}`, project))
      await Promise.all(promises)
    }
  }

  return {
    records,
    fetchRecords,
    updateRecords,
    tasksInfo,
    moveItem,
    update,
    updateField,
    addNewRecord,
    saveAll,
    // filter,
    // sort,
  }
})
