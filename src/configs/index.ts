import { api } from './api-host'

import { performerHeaders } from './performer-headers'
import { projectHeaders } from './project-headers'
import { taskHeaders } from './task-headers'

import { defaultAvatar } from './default-avatar'
import { modeHandler } from './mode'

import { PerformerStatusValues } from './performer-status'
import { ProjectStatusValues } from './project-status'
import { TaskStatusValues, taskStatusAndDeadline, taskStatusIcons } from './task-status'

import { TaskInfo, TaskInfoClass, TaskInfoHeaders, initialTasksInfo } from './task-info'

import { newPerformerRecord } from './newPerformerRecord'
import { newProjectRecord } from './newProjectRecord'
import { newTaskRecord } from './newTaskRecord'

import { mainMenuItems, submenuItems } from './config-main-menu'

import { popupJsonServer } from './popup-json-server'
import { popupLocalDBDemo } from './popup-local-db-demo'
import { popupSaveData } from './popup-save-data'

import { alertIconColors, alertIcons } from './alertIcons'

export {
  PerformerStatusValues,
  ProjectStatusValues,
  TaskInfo,
  TaskInfoClass,
  TaskInfoHeaders,
  TaskStatusValues,
  alertIconColors,
  alertIcons,
  api,
  defaultAvatar,
  initialTasksInfo,
  mainMenuItems,
  modeHandler,
  newPerformerRecord,
  newProjectRecord,
  newTaskRecord,
  performerHeaders,
  popupJsonServer,
  popupLocalDBDemo,
  popupSaveData,
  projectHeaders,
  submenuItems,
  taskHeaders,
  taskStatusAndDeadline,
  taskStatusIcons,
}
