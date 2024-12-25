import type { ProjectHeader } from '@/types'

export const projectHeaders: ProjectHeader[] = [
  { order: 0, title: 'Project id', field: 'id', type: 'not-editable', align: 'center' },
  { order: 1, title: 'Date', field: 'date', type: 'date', align: 'center' },
  { order: 2, title: 'Project name', field: 'title', type: 'string', align: 'left' },
  { order: 3, title: 'Status', field: 'status', type: 'string', align: 'center' },
  {
    order: 4,
    title: 'Project description',
    field: 'description',
    type: 'text',
  },
  { order: 5, title: 'Tasks', field: 'tasks', type: 'action', align: 'center' },
]
