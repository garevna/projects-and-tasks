import type { InjectionKey, Reactive } from 'vue'

import type { GoTo } from '@/types'

export const injectionKeyForPrevious = Symbol.for('previous-route') as InjectionKey<Reactive<GoTo>>
