interface Project {
  id: number
  date: number
  order: number
  title: string
  description: string
  status: string
}

type HeaderField = keyof Project

interface Header {
  order: number
  title: string
  field: HeaderField
}

export const projectHeaders: Header[] = [
  { order: 0, title: 'Project id', field: 'id' },
  { order: 1, title: 'Date', field: 'date' },
  { order: 2, title: 'Project name', field: 'title' },
  { order: 2, title: 'Status', field: 'status' },
  { order: 3, title: 'Project description', field: 'description' },
]
