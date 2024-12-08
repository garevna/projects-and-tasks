import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { getBackAPI } from './helpers/getBackAPI'
import type { Project } from '@/types/project'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Moved {
  element: any
  newIndex: number
  oldIndex: number
}

export const useProjectStore = defineStore('projects', () => {
  const api = getBackAPI()
  type ProjectList = Awaited<ReturnType<typeof getProjects>>

  const rawProjects: ProjectList = []

  const projects: ProjectList = reactive([])

  async function getProjects(): Promise<Array<Project>> {
    const result: Project[] = await axios(`${api}projects`).then((res) => res.data)
    rawProjects.push(...result)

    updateProjects()

    return result
  }

  function updateProjects() {
    projects.length = 0
    projects.push(
      ...rawProjects.sort((a, b) => {
        return a.order < b.order ? -1 : a.order > b.order ? 1 : 0
      }),
    )
  }

  function update(updated: ProjectList): void {
    updated.forEach((item, index) => Object.assign(item, { order: index }))
  }

  function moveItem(moved: Moved) {
    rawProjects[moved.oldIndex - 1].order = moved.newIndex
    rawProjects.forEach((project, index) => {
      if (index !== moved.oldIndex - 1) {
        if (moved.oldIndex > moved.newIndex) {
          if (project.order >= moved.newIndex) {
            Object.assign(project, { order: project.order + 1 })
          }
        } else {
          if (index !== moved.oldIndex - 1 && project.order <= moved.newIndex) {
            Object.assign(project, { order: project.order - 1 })
          }
        }
      } else {
        Object.assign(project, { order: moved.newIndex })
      }
    })

    updateProjects()
  }

  function updateField(id: number, field: string, value: string | number) {
    const project: Project | undefined = rawProjects.find((item) => item.id === id)
    if (project) {
      if (field === 'date' || field === 'deadline') {
        const data = value.toString()
        Object.assign(project, { [field]: Date.parse(data) })
      } else {
        Object.assign(project, { [field]: value })
      }
    }

    updateProjects()
  }

  async function addNewProject() {
    const order = Math.max(...rawProjects.map((item) => item.order)) + 1
    const id = Math.max(...rawProjects.map((item) => item.id)) + 1
    const project: Project = {
      id,
      order,
      date: Date.now(),
      title: 'Unnomous Project',
      description: '...',
      status: 'new',
    }
    const result = await axios.post(`${api}projects`, project)

    if (result.status === 201) {
      rawProjects.push(result.data)
      updateProjects()
    }
  }

  async function saveAll() {
    const promises = rawProjects.map((project) =>
      axios.put(`${api}projects/${project.id}`, project),
    )
    await Promise.all(promises)
  }

  return { projects, getProjects, moveItem, update, updateField, addNewProject, saveAll }
})
