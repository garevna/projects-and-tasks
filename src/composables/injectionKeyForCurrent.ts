import type { InjectionKey, Reactive } from 'vue'

import type { GoTo } from '@/types'

export const injectionKeyForCurrent = Symbol.for('current-route') as InjectionKey<Reactive<GoTo>>
