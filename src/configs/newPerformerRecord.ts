import type { Performer } from '@/types'
import { defaultAvatar } from './default-avatar'

export const newPerformerRecord: Performer = {
  id: Date.now().toString(),
  order: 0,
  chain: {},
  group: '',
  name: 'Unknown',
  avatar: defaultAvatar,
  speciality: '',
  status: 'available',
  achievements: [],
}
