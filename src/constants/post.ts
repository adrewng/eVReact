export const postStatus = {
  all: 'all',
  pending: 'pending',
  published: 'published',
  auctioning: 'auctioning',
  auctioned: 'auctioned',
  sold: 'sold'
} as const

export const tabs = [
  { id: 'all', label: 'Tất cả', param: 'status', statusQuery: 'all' },
  { id: 'pending', label: 'Đang chờ', param: 'status', statusQuery: 'pending' },
  { id: 'approved', label: 'Đã đăng', param: 'status', statusQuery: 'approved' },
  { id: 'rejected', label: 'Từ chối', param: 'status', statusQuery: 'rejected' },
  { id: 'auctioning', label: 'Đang đấu giá', param: 'status', statusQuery: 'auctioning' },
  { id: 'auctioned', label: 'Đã đấu gia', param: 'status', statusQuery: 'auctioned' },
  { id: 'sold', label: 'Đã bán', param: 'status', statusQuery: 'sold' }
]
