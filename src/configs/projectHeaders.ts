import type { ProjectHeader } from '@/types'

export const projectHeaders: ProjectHeader[] = [
  // { order: 0, title: 'Project id', field: 'id', type: 'not-editable', align: 'center', width: 76 },
  { order: 1, title: 'Date', field: 'date', type: 'date', align: 'center', width: 106 },
  {
    order: 2,
    title: 'Project name',
    field: 'title',
    type: 'string',
    align: 'left',
    width: 140,
    edit: false,
  },
  { order: 3, title: 'Status', field: 'status', type: 'status', align: 'center', width: 134 },
  {
    order: 4,
    title: 'Project description',
    field: 'description',
    type: 'text',
    width: 448,
    edit: false,
  },
  { order: 5, title: 'Tasks', field: 'tasks', type: 'tasks', align: 'center', width: 120 },
]
