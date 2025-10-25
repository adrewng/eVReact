import type { SessionStatus } from '~/types/auction.type'

export const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  DRAFT: 'Nháp',
  SCHEDULED: 'Lên lịch',
  LIVE: 'Đang diễn ra',
  ENDED: 'Kết thúc',
  CANCELLED: 'Hủy'
}

export const SESSION_STATUS_CLASS: Record<SessionStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 ring-gray-200',
  SCHEDULED: 'bg-sky-100 text-sky-700 ring-sky-200',
  LIVE: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  ENDED: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  CANCELLED: 'bg-rose-100 text-rose-700 ring-rose-200'
}
