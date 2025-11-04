import type { User } from './user.type'

export interface FeedbackType {
  id: number
  text: string
  title?: string
  start: number
  user: User
  createdAt: string
}
