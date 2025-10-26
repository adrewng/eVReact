import type { Order } from '~/types/order.type'

export type OrderType = 'post' | 'package' | 'topup' | 'auction' | 'deposit'

/** Trạng thái CHUẨN HOÁ theo bảng mới */
export type OrderStatus =
  | 'PENDING' // chờ thanh toán / chờ cọc
  | 'PROCESSING' // đã thanh toán & đang xử lý / đợi liên hệ
  | 'VERIFYING' // kiểm duyệt / kiểm định / nhận xe
  | 'SUCCESS' // hoàn tất
  | 'FAILED' // thất bại
  | 'CANCELLED' // đã huỷ
  | 'REFUND' // hoàn tiền (nếu có)
  | 'AUCTION_PROCESSING'
  | 'AUCTION_SUCCESS'
  | 'AUCTION_FAILED'

export const ORDERSTATUS: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: 'Chờ thanh toán', className: 'bg-amber-100 text-amber-700 ring-amber-200' },
  PROCESSING: { label: 'Đang xử lý', className: 'bg-sky-100 text-sky-700 ring-sky-200' },
  VERIFYING: { label: 'Đang kiểm duyệt', className: 'bg-indigo-100 text-indigo-700 ring-indigo-200' },
  SUCCESS: { label: 'Thành Công', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  FAILED: { label: 'Thất bại', className: 'bg-rose-100 text-rose-700 ring-rose-200' },
  CANCELLED: { label: 'Đã huỷ', className: 'bg-zinc-100 text-zinc-700 ring-zinc-200' },
  REFUND: { label: 'Hoàn tiền', className: 'bg-gray-100 text-gray-700 ring-gray-200' },
  AUCTION_PROCESSING: { label: 'Đang tham gia', className: 'bg-blue-100 text-blue-700 ring-blue-200' },
  AUCTION_SUCCESS: { label: 'Đấu giá thành công', className: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  AUCTION_FAILED: { label: 'Đấu giá thất bại', className: 'bg-rose-100 text-rose-700 ring-rose-200' }
} as const

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  post: 'Đăng tin',
  package: 'Gói',
  topup: 'Nạp ví',
  auction: 'Yêu cầu đấu giá',
  deposit: 'Đặt cọc đấu giá'
} as const

type StepKey = 'PENDING' | 'PROCESSING' | 'VERIFYING' | 'AUCTION_PROCESSING' | 'RESULT' | 'REFUND'

type Step = { key: StepKey; title: string }

const STEP_TITLES: Record<StepKey, string> = {
  PENDING: 'Chờ thanh toán',
  PROCESSING: 'Đang xử lý',
  VERIFYING: 'Kiểm duyệt/nhận xe',
  AUCTION_PROCESSING: 'Đang tham gia',
  RESULT: 'Kết quả',
  REFUND: 'Hoàn tiền'
}

export function getStepsByType(type?: Order['type'], status?: OrderStatus): Step[] {
  switch (type) {
    case 'topup':
      return [
        { key: 'PENDING', title: STEP_TITLES.PENDING },
        { key: 'PROCESSING', title: STEP_TITLES.PROCESSING },
        { key: 'RESULT', title: STEP_TITLES.RESULT }
      ]
    case 'post':
      return [
        { key: 'PENDING', title: 'Chuẩn bị & thanh toán' },
        { key: 'PROCESSING', title: 'Đang duyệt bài' },
        { key: 'RESULT', title: STEP_TITLES.RESULT }
      ]
    case 'package':
      return [
        { key: 'PENDING', title: STEP_TITLES.PENDING },
        { key: 'PROCESSING', title: 'Kích hoạt gói' },
        { key: 'RESULT', title: STEP_TITLES.RESULT }
      ]
    case 'auction':
      return [
        { key: 'PENDING', title: 'Thanh toán phí' },
        // { key: 'PROCESSING', title: 'Đợi Admin liên hệ' },
        { key: 'VERIFYING', title: STEP_TITLES.VERIFYING },
        { key: 'RESULT', title: STEP_TITLES.RESULT }
      ]
    case 'deposit':
      if (status === 'REFUND') {
        return [
          { key: 'PENDING', title: 'Thanh toán cọc' },
          { key: 'AUCTION_PROCESSING', title: STEP_TITLES.AUCTION_PROCESSING },
          { key: 'RESULT', title: STEP_TITLES.RESULT },
          { key: 'REFUND', title: STEP_TITLES.REFUND }
        ]
      }
      return [
        { key: 'PENDING', title: 'Thanh toán cọc' },
        { key: 'AUCTION_PROCESSING', title: STEP_TITLES.AUCTION_PROCESSING },
        { key: 'RESULT', title: STEP_TITLES.RESULT }
      ]
    default:
      return []
  }
}
export function mapStatusToStepKey(_type: Order['type'], status: OrderStatus): StepKey {
  if (
    status === 'SUCCESS' ||
    status === 'FAILED' ||
    status === 'CANCELLED' ||
    status === 'AUCTION_SUCCESS' ||
    status === 'AUCTION_FAILED'
  ) {
    return 'RESULT'
  }
  if (
    status === 'PENDING' ||
    status === 'PROCESSING' ||
    status === 'VERIFYING' ||
    status === 'AUCTION_PROCESSING' ||
    status === 'REFUND'
  ) {
    return status
  }
  return 'RESULT'
}
