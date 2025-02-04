import type { PerformerHeader } from '@/types'

export const performerHeaders: PerformerHeader[] = [
  {
    order: 1,
    title: 'Avatar',
    field: 'avatar',
    type: 'image',
    align: 'center',
    width: 80,
  },
  { order: 2, title: 'Name', field: 'name', type: 'string', align: 'left', width: 160 },
  { order: 3, title: 'Speciality', field: 'speciality', type: 'string', align: 'left', width: 240 },
  { order: 4, title: 'Status', field: 'status', type: 'status', align: 'center', width: 120 },
  { order: 5, title: 'Tasks', field: 'tasks', type: 'tasks', align: 'center', width: 120 },
]
