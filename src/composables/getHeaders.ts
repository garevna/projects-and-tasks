import { performerHeaders, projectHeaders, taskHeaders } from '@/configs'
import type { PerformerHeader, ProjectHeader, Route, TaskHeader } from '@/types'

export function getHeaders(route: Route) {
  const headers =
    route === 'Project'
      ? (projectHeaders as ProjectHeader[])
      : route === 'Task'
        ? (taskHeaders as TaskHeader[])
        : (performerHeaders as PerformerHeader[])
  return headers
}
