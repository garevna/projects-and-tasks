import { putRecords } from '../putRecords'

export async function initDemo() {
  const { demo } = await import('../store/demo')
  const { projects, tasks, performers } = JSON.parse(demo)

  putRecords('projects', projects)
  putRecords('tasks', tasks)
  putRecords('performers', performers)
}
