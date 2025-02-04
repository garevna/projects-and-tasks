export enum TaskInfo {
  'total',
  'finished',
  'mustBeFinishedToday',
  'behindSchedule',
}

export enum TaskInfoHeaders {
  'Total',
  'Finished',
  'Must be finished today',
  'Behind schedule',
}

export enum TaskInfoClass {
  'total-tasks',
  'finished-tasks',
  'must-be-finished-today',
  'behind-schedule',
}

export type TasksInfoType = {
  total: number
  behindSchedule: number
  mustBeFinishedToday: number
  finished: number
}

export const initialTasksInfo = {
  total: 0,
  behindSchedule: 0,
  mustBeFinishedToday: 0,
  finished: 0,
}
