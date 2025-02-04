import type { Task } from '@/types'

export const newTaskRecord: Task = {
  id: Date.now().toString(),
  order: 0,
  chain: {},
  date: Date.now(),
  deadline: Date.now() + 1000 * 60 * 60 * 24 * 10,
  projectId: '',
  performerId: '',
  title: 'New Task',
  description: '...',
  status: 'not-started-yet',
  state: '',
}
