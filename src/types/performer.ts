export type Performer = {
  id: string
  order: number
  chain: { [key: string]: number }
  name: string
  avatar: string
  group: string
  speciality: string
  achievements: Array<string>
  status: string
}
