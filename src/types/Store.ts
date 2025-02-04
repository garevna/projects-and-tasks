import { usePerformerStore, useProjectStore, useTaskStore } from '@/stores'

export type ProjectStore = ReturnType<typeof useProjectStore>
export type TaskStore = ReturnType<typeof useTaskStore>
export type PerformerStore = ReturnType<typeof usePerformerStore>

export type Store = ProjectStore | TaskStore | PerformerStore
