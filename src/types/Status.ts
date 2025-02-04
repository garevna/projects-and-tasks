import type { PerformerStatus } from './performer-status'
import type { ProjectStatus } from './project-status'
import type { TaskStatus } from './task-status'

export type Status = ProjectStatus | TaskStatus | PerformerStatus
