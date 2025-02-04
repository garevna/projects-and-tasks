import type { Project } from '@/types'

export const newProjectRecord: Project = {
  id: Date.now().toString(),
  order: 0,
  chain: {},
  date: Date.now(),
  title: 'New Project',
  description: '...',
  status: 'not-started-yet',
}
