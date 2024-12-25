import type { TaskHeader } from '@/types'

export const taskHeaders: TaskHeader[] = [
  { order: 1, title: 'Task id', field: 'id', type: 'not-editable', align: 'center' },
  { order: 2, title: 'Title', field: 'title', type: 'string', align: 'left' },
  { order: 3, title: 'Started', field: 'date', type: 'date', align: 'center' },
  { order: 4, title: 'Deadline', field: 'deadline', type: 'date', align: 'center' },
  { order: 5, title: 'Task description', field: 'description', type: 'text' },
  { order: 6, title: 'Performer', field: 'performer', type: 'string', align: 'left' },
  { order: 7, title: 'Status', field: 'status', type: 'string', align: 'center' },
]
