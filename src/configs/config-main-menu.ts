import { getListOfStatusValues } from '@/utils'

const mainMenuItems = ['Project', 'Task', 'Performer']
const submenuItems = [
  getListOfStatusValues('Project'),
  getListOfStatusValues('Task'),
  getListOfStatusValues('Performer'),
].map((submenu) => submenu?.map((item) => item.replace('-', ' ')))

submenuItems[0]?.unshift('All projects')
submenuItems[1]?.unshift('Behind schedule', 'Must be finished today')
submenuItems[2]?.unshift('All performers')

export { mainMenuItems, submenuItems }
