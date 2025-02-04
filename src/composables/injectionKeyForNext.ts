import type { InjectionKey, Reactive } from 'vue'

import type { GoTo } from '@/types'

export const injectionKeyForNext = Symbol.for('next-route') as InjectionKey<Reactive<GoTo>>
