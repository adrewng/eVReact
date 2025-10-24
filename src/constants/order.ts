export type OrderType = 'post' | 'package' | 'topup' | 'auction_request' | 'auction_bid'
export type OrderStatus =
  | 'awaiting_payment'
  | 'processing'
  | 'shipping' //Nhận báo giá
  | 'delivered'
  | 'cancelled'
  | 'refund'

export const ORDERSTATUS: Record<OrderStatus, { label: string; className: string }> = {
  awaiting_payment: { label: 'Chờ thanh toán', className: 'bg-amber-100 text-amber-700 ring-amber-200' },
  processing: { label: 'Đang xử lý', className: 'bg-sky-100 text-sky-700 ring-sky-200' },
  shipping: { label: 'Đang nhận báo giá', className: 'bg-indigo-100 text-indigo-700 ring-indigo-200' },
  delivered: { label: 'Hoàn tất', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  cancelled: { label: 'Đã hủy', className: 'bg-rose-100 text-rose-700 ring-rose-200' },
  refund: { label: 'Hoàn tiền / Trả', className: 'bg-gray-100 text-gray-700 ring-gray-200' }
}

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  post: 'Đăng tin',
  package: 'Gói',
  topup: 'Nạp ví',
  auction_request: 'Yêu cầu đấu giá',
  auction_bid: 'Tham gia đấu giá'
} as const
