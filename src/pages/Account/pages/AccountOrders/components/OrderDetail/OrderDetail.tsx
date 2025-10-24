import { AnimatePresence, motion } from 'framer-motion'
import { Phone, UserRound, X } from 'lucide-react'
import type { JSX } from 'react'
import { formatCurrencyVND } from '~/utils/util'
import StepLine from '../StepLine'

import { ORDERSTATUS } from '~/constants/order'
import type { Order } from '~/types/order.type'

function DetailRow({ label, value }: { label: string; value?: string | number | JSX.Element | null }) {
  return (
    <div className='flex items-start justify-between gap-4 py-1.5'>
      <div className='text-sm text-gray-500'>{label}</div>
      <div className='text-right text-sm font-medium text-gray-800'>{value ?? '—'}</div>
    </div>
  )
}

const fmtDate = (s?: string) => (s ? new Date(s).toLocaleString('vi-VN') : '—')

// Seller hệ thống cho các loại: post, package, topup
const SYSTEM_SELLER = { name: 'Eviest', phone: '1900 123 456' }
const SYSTEM_SERVICE_TYPES: Order['type'][] = ['post', 'package', 'topup']

type Appt = NonNullable<Order['viewingAppointment']>

function AppointmentBox({ title, appt }: { title: string; appt?: Appt }) {
  if (!appt) return null
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>{title}</div>
      <DetailRow label='Thời gian' value={fmtDate(appt.time)} />
      <DetailRow label='Địa điểm' value={appt.address} />
      <DetailRow
        label='Liên hệ'
        value={
          appt.contactName || appt.contactPhone ? (
            <span className='flex items-center justify-end gap-2'>
              {appt.contactName && (
                <>
                  <UserRound className='h-4 w-4 text-gray-400' />
                  {appt.contactName}
                </>
              )}
              {appt.contactPhone && (
                <>
                  <Phone className='h-4 w-4 text-gray-400' />
                  {appt.contactPhone}
                </>
              )}
            </span>
          ) : (
            '—'
          )
        }
      />
      <DetailRow label='Trạng thái' value={appt.status ?? '—'} />
      {appt.notes && <div className='mt-2 text-xs italic text-gray-500'>{appt.notes}</div>}
    </div>
  )
}

function PostDetail({ order }: { order: Order }) {
  const post = order.post
  const product = post?.product
  const service = order.service
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>Chi tiết đặt dịch vụ</div>
      <DetailRow label='Tiêu đề sản phẩm' value={post?.title} />
      <DetailRow label='Giá sản phẩm' value={formatCurrencyVND(Number(product?.price || 0))} />
      <DetailRow label='Loại sản phẩm' value={product?.category?.name ?? '—'} />
      <DetailRow label='Mã bài đăng' value={post?.id} />
      <DetailRow label='Dịch vụ' value={service?.name ?? '—'} />
      <DetailRow
        label='Phí dịch vụ'
        value={formatCurrencyVND(Number(service?.price || service?.sevice_ref?.amount || 0))}
      />
    </div>
  )
}

function PackageDetail({ order }: { order: Order }) {
  const s = order.service
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>Chi tiết gói</div>
      <DetailRow label='Tên gói' value={s?.name} />
      <DetailRow label='Quyền lợi' value={s?.feature ?? '—'} />
      <DetailRow label='Mô tả' value={s?.description ?? '—'} />
      <DetailRow label='Giá gói' value={formatCurrencyVND(Number(s?.price || s?.sevice_ref?.amount || 0))} />
    </div>
  )
}

function TopupDetail({ order }: { order: Order }) {
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>Chi tiết nạp ví</div>
      <DetailRow label='Số tiền nạp' value={formatCurrencyVND(Number(order.price) || 0)} />
      <DetailRow label='Tài khoản' value={order.seller?.full_name ?? '—'} />
      <DetailRow label='Thời gian' value={fmtDate(order.created_at)} />
    </div>
  )
}

function AuctionInfoBox({ order }: { order: Order }) {
  const a = order.auction
  if (!a) return null
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>Thông tin phiên đấu giá</div>
      <DetailRow label='Mã phiên' value={a.id} />
      <DetailRow label='Giá khởi điểm' value={formatCurrencyVND(a.startingBid)} />
      <DetailRow label='Bước nhảy tối thiểu' value={formatCurrencyVND(a.bidIncrement)} />
      <DetailRow label='Tiền cọc' value={formatCurrencyVND(a.deposit)} />
      <DetailRow label='Giá mua ngay' value={a.buyNowPrice ? formatCurrencyVND(a.buyNowPrice) : '—'} />
      <DetailRow label='Giá đăng bán' value={a.original_price ? formatCurrencyVND(Number(a.original_price)) : '—'} />
      <DetailRow label='Ghi chú' value={a.note ?? '—'} />
    </div>
  )
}

function AuctionRequestDetail({ order }: { order: Order }) {
  const p = order.post
  const pr = p?.product
  return (
    <>
      <AppointmentBox title='Lịch xem xe' appt={order.viewingAppointment as Appt} />
      <div className='rounded-2xl border border-gray-200 p-4'>
        <div className='mb-2 text-sm font-medium'>Sản phẩm yêu cầu đấu giá</div>
        <DetailRow label='Tiêu đề' value={p?.title} />
        <DetailRow label='Loại sản phẩm' value={pr?.category?.name ?? '—'} />
        <DetailRow label='Giá tham khảo' value={formatCurrencyVND(Number(pr?.price || 0))} />
        <DetailRow label='Địa chỉ' value={pr?.address ?? '—'} />
        <DetailRow label='Năm' value={pr?.year ?? '—'} />
      </div>
      <AuctionInfoBox order={order} />
    </>
  )
}

function AuctionBidDetail({ order }: { order: Order }) {
  const p = order.post
  const pr = p?.product
  return (
    <>
      {order.handoverAppointment && <AppointmentBox title='Lịch bàn giao' appt={order.handoverAppointment as Appt} />}
      <div className='rounded-2xl border border-gray-200 p-4'>
        <div className='mb-2 text-sm font-medium'>Chi tiết phiên tham gia</div>
        <DetailRow label='Tiêu đề' value={p?.title} />
        <DetailRow label='Loại sản phẩm' value={pr?.category?.name ?? '—'} />
        <DetailRow label='Giá đăng bán' value={formatCurrencyVND(Number(pr?.price || 0))} />
      </div>
      <AuctionInfoBox order={order} />
    </>
  )
}

export default function OrderDetail({
  open,
  onClose,
  order
}: {
  open: boolean
  onClose: () => void
  order: Order | null
}) {
  const steps =
    order?.type === 'topup'
      ? [
          { key: 'awaiting_payment', title: 'Chờ thanh toán' },
          { key: 'processing', title: 'Đang xử lý' },
          { key: 'delivered', title: 'Hoàn tất nạp' }
        ]
      : [
          { key: 'awaiting_payment', title: 'Chờ thanh toán' },
          {
            key: 'processing',
            title:
              order?.type === 'auction_request'
                ? 'Đang xác nhận yêu cầu'
                : order?.type === 'auction_bid'
                  ? 'Đang tham gia'
                  : 'Xác nhận & chuẩn bị'
          },
          { key: 'shipping', title: order?.type === 'auction_request' ? 'Đang nhận báo giá' : 'Thực hiện dịch vụ' },
          { key: 'delivered', title: 'Hoàn tất' }
        ]

  const activeIndex = Math.max(
    0,
    steps.findIndex((s) => s.key === order?.status)
  )
  const isSystemService = !!order && SYSTEM_SERVICE_TYPES.includes(order.type)

  return (
    <AnimatePresence>
      {open && order && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50'
        >
          <div className='absolute inset-0 bg-black/20' onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.45 }}
            className='absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto rounded-l-2xl bg-white p-6 shadow-2xl'
          >
            <div className='flex items-start justify-between'>
              <div>
                <div className='text-xs text-gray-500'>ĐƠN HÀNG</div>
                <div className='text-2xl font-semibold'>Đơn hàng #{String(order.id)}</div>
                <div className='mt-1 text-sm text-gray-500'>Tạo ngày {fmtDate(order.created_at)}</div>
              </div>
              <button onClick={onClose} className='rounded-xl border border-gray-200 p-2'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='mt-6 rounded-2xl border border-gray-200 p-4'>
              <div className='mb-2 text-sm font-medium'>Tiến trình</div>
              <StepLine steps={steps} activeIndex={activeIndex} />
            </div>

            {/* Người mua / bán */}
            <div className='mt-6 grid grid-cols-2 gap-3'>
              {/* Cột trái: người mua / người yêu cầu */}
              <div className='rounded-2xl border border-gray-200 p-4'>
                <div className='text-sm font-medium'>
                  {order.type === 'auction_request' ? 'Người yêu cầu' : 'Người mua'}
                </div>

                <div className='mt-2 text-sm text-gray-600'>
                  {order.type === 'auction_request' || isSystemService
                    ? (order.seller?.full_name ?? '—')
                    : (order.buyer?.full_name ?? '—')}

                  {order.type === 'auction_request' || isSystemService
                    ? order.seller?.phone && <div className='text-xs text-gray-500'>SĐT: {order.seller.phone}</div>
                    : order.buyer?.phone && <div className='text-xs text-gray-500'>SĐT: {order.buyer.phone}</div>}
                </div>
              </div>

              {/* Cột phải: người bán */}
              <div className='rounded-2xl border border-gray-200 p-4'>
                <div className='text-sm font-medium'>Người bán</div>
                <div className='mt-2 text-sm text-gray-600'>
                  {isSystemService ? SYSTEM_SELLER.name : (order.seller?.full_name ?? '—')}
                  <div className='text-xs text-gray-500'>
                    SĐT: {isSystemService ? SYSTEM_SELLER.phone : (order.seller?.phone ?? '—')}
                  </div>
                </div>
              </div>
            </div>

            {/* Chi tiết từng loại */}
            <div className='mt-6 grid grid-cols-1 gap-3'>
              {order.type === 'post' && <PostDetail order={order} />}
              {order.type === 'package' && <PackageDetail order={order} />}
              {order.type === 'topup' && <TopupDetail order={order} />}
              {order.type === 'auction_request' && <AuctionRequestDetail order={order} />}
              {order.type === 'auction_bid' && <AuctionBidDetail order={order} />}
            </div>

            {/* Tổng tiền */}
            <div className='mt-6 rounded-2xl border border-gray-200'>
              <div className='flex items-center justify-between px-4 py-3'>
                <div className='font-semibold'>Tổng cộng</div>
                <div className='text-lg font-semibold'>{formatCurrencyVND(Number(order.price) || 0)}</div>
              </div>
              <div className='px-4 pb-3 text-sm text-gray-500'>
                Trạng thái: <span className='font-medium text-gray-800'>{ORDERSTATUS[order.status].label}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
