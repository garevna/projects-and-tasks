import { performerHeaders, projectHeaders, taskHeaders } from '@/configs'

export function setupTables() {
  if (!localStorage.getItem('project-table')) {
    const options = projectHeaders.map((header) => ({ [header.title]: header.width }))
    localStorage.setItem('project-table', JSON.stringify(options))
  }
  if (!localStorage.getItem('task-table')) {
    const options = taskHeaders.map((header) => ({ [header.title]: header.width }))
    localStorage.setItem('task-table', JSON.stringify(options))
  }
  if (!localStorage.getItem('performer-table')) {
    const options = performerHeaders.map((header) => ({ [header.title]: header.width }))
    localStorage.setItem('performer-table', JSON.stringify(options))
  }
}
