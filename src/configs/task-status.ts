export enum TaskStatusValues {
  'not-started-yet',
  'in-process',
  'problem',
  'canceled',
  'finished',
}

export const taskStatusIcons = {
  'not-started-yet': 'not-started-yet',
  'in-process': null,
  problem: 'error',
  canceled: 'canceled',
  finished: 'finished',
}

export const taskStatusAndDeadline = {
  'not-started-yet': true,
  'in-process': true,
  problem: true,
  canceled: false,
  finished: false,
}
