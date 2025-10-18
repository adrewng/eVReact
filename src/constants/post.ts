export const postStatus = {
  all: 'all',
  pending: 'pending',
  published: 'published',
  rejected: 'rejected',
  certified: 'certified',
  certifying: 'certifying'
} as const

export const tabs = [
  { id: 'all', label: 'Tất cả', param: 'status', statusQuery: 'all' },
  { id: 'pending', label: 'Đang chờ', param: 'status', statusQuery: 'pending' },
  { id: 'approved', label: 'Đã đăng', param: 'status', statusQuery: 'approved' },
  { id: 'rejected', label: 'Từ chối', param: 'status', statusQuery: 'rejected' },
  { id: 'unverified', label: 'Chưa kiểm duyệt', param: 'status_verify', statusQuery: 'unverified' },
  { id: 'verifying', label: 'Đang kiểm duyệt', param: 'status_verify', statusQuery: 'verifying' },
  { id: 'verified', label: 'Đã kiểm duyệt', param: 'status_verify', statusQuery: 'verified' }
]
