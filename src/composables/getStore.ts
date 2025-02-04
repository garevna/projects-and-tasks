import { usePerformerStore, useProjectStore, useTaskStore } from '@/stores'
// import type { Route } from '@/types'

export function getStore(route: string) {
  return route === 'Project'
    ? useProjectStore()
    : route === 'Task'
      ? useTaskStore()
      : usePerformerStore()
}
