// src/constants/notification.ts
import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  Bell,
  CheckCircle,
  CircleDollarSign,
  Gavel,
  MessageSquare,
  PackageCheck,
  ShieldCheck,
  ShieldX,
  Trash2,
  Trophy,
  Wallet,
  XCircle
} from 'lucide-react'

export const NOTIFICATION_TYPES = [
  'post_approved',
  'post_rejected',
  'post_resubmitted',
  'post_sold',
  'post_deleted',
  'post_auctioning',
  'post_auctioned',
  'package_success',
  'topup_success',
  'auction_verified',
  'auction_rejected',
  'deposit_success',
  'deposit_win',
  'deposit_fail',
  'message',
  'system'
] as const

export type NotificationType = (typeof NOTIFICATION_TYPES)[number]

export type ToneNotification = 'success' | 'info' | 'warning' | 'danger'

export const notificationConfig = {
  post_approved: { icon: CheckCircle, tone: 'success' },
  post_rejected: { icon: XCircle, tone: 'danger' },
  post_resubmitted: { icon: AlertCircle, tone: 'warning' },
  post_sold: { icon: Trophy, tone: 'success' },
  post_deleted: { icon: Trash2, tone: 'danger' },

  post_auctioning: { icon: Gavel, tone: 'info' },
  post_auctioned: { icon: Trophy, tone: 'info' },
  auction_verified: { icon: ShieldCheck, tone: 'success' },
  auction_rejected: { icon: ShieldX, tone: 'danger' },

  package_success: { icon: PackageCheck, tone: 'success' },
  topup_success: { icon: Wallet, tone: 'success' },

  deposit_success: { icon: CircleDollarSign, tone: 'success' },
  deposit_win: { icon: Trophy, tone: 'success' },
  deposit_fail: { icon: CircleDollarSign, tone: 'warning' },

  message: { icon: MessageSquare, tone: 'info' },
  system: { icon: Bell, tone: 'info' }
} satisfies Record<NotificationType, { icon: LucideIcon; tone: ToneNotification }>
