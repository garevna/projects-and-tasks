import type { TaskHeader } from '@/types'

export const taskHeaders: TaskHeader[] = [
  // { order: 1, title: 'Task id', field: 'id', type: 'not-editable', align: 'center', width: 74 },
  {
    order: 1,
    title: 'Title',
    field: 'title',
    type: 'string',
    align: 'left',
    width: 198,
    edit: false,
  },
  { order: 2, title: 'Started', field: 'date', type: 'date', align: 'center', width: 140 },
  { order: 3, title: 'Deadline', field: 'deadline', type: 'date', align: 'center', width: 140 },
  {
    order: 4,
    title: 'Task description',
    field: 'description',
    type: 'text',
    width: 340,
    edit: false,
  },
  {
    order: 5,
    title: 'Performer',
    field: 'performerId',
    type: 'avatar',
    align: 'left',
    width: 120,
  },
  { order: 6, title: 'Status', field: 'status', type: 'status', align: 'center', width: 104 },
]
