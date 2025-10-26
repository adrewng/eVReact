import { Phone, UserRound } from 'lucide-react'
import type { JSX } from 'react'
import { BATTERY_HEALTH_OPTIONS, COLOR_OPTIONS, WARRANTY_OPTIONS } from '~/constants/options'
import type { Order } from '~/types/order.type'
import { labelFromOptions } from '~/utils/option'
import { fmtDate, formatCurrencyVND } from '~/utils/util'

export function DetailRow({ label, value }: { label: string; value?: string | number | JSX.Element | null }) {
  return (
    <div className='flex items-start justify-between gap-4 py-1.5'>
      <div className='text-sm text-gray-500'>{label}</div>
      <div className='text-right text-sm font-medium text-gray-800'>{value ?? '—'}</div>
    </div>
  )
}

type Appt = NonNullable<Order['viewingAppointment']>
export function AppointmentBox({ title, appt }: { title: string; appt?: Appt }) {
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

export function ProductDetail({ order }: { order: Order }) {
  const p = order.post
  const pr = p?.product
  if (!pr) return null
  return (
    <div className='rounded-2xl border border-gray-200 p-4'>
      <div className='mb-2 text-sm font-medium'>Chi tiết sản phẩm</div>
      <DetailRow label='Mã bài đăng' value={p?.id ?? '—'} />
      <DetailRow label='Tiêu đề' value={p?.title ?? '—'} />
      <DetailRow label='Loại sản phẩm' value={pr.category?.name ?? '—'} />
      <DetailRow label='Sản phẩm' value={[pr.brand, pr.model].filter(Boolean).join(' ') || '—'} />
      <DetailRow label='Giá đăng bán' value={formatCurrencyVND(Number(pr.price)) || '—'} />
      <DetailRow label='Năm' value={pr.year ?? '—'} />
      <DetailRow label='Màu' value={labelFromOptions(COLOR_OPTIONS, pr.color, '—')} />
      <DetailRow label='Bảo hành' value={labelFromOptions(WARRANTY_OPTIONS, pr.warranty, '—')} />
      <DetailRow label='Tình trạng' value={labelFromOptions(BATTERY_HEALTH_OPTIONS, pr.health, '—')} />
      <DetailRow label='Địa chỉ' value={pr.address ?? '—'} />
    </div>
  )
}

export function ServiceDetail({ order }: { order: Order }) {
  if (order.type === 'post') {
    const s = order.service
    const pr = order.post?.product
    return (
      <div className='rounded-2xl border border-gray-200 p-4'>
        <div className='mb-2 text-sm font-medium'>Chi tiết dịch vụ</div>
        <DetailRow label='Tên dịch vụ' value={s?.name ?? '—'} />
        <DetailRow label='Phí dịch vụ' value={formatCurrencyVND(Number(s?.price || s?.sevice_ref?.amount || 0))} />
        {pr?.price && <DetailRow label='Giá sản phẩm tham chiếu' value={formatCurrencyVND(Number(pr.price))} />}
      </div>
    )
  }

  if (order.type === 'package') {
    const s = order.service
    return (
      <div className='rounded-2xl border border-gray-200 p-4'>
        <div className='mb-2 text-sm font-medium'>Chi tiết dịch vụ</div>
        <DetailRow label='Tên gói' value={s?.name} />
        <DetailRow label='Quyền lợi' value={s?.feature ?? '—'} />
        <DetailRow label='Mô tả' value={s?.description ?? '—'} />
        <DetailRow label='Giá gói' value={formatCurrencyVND(Number(s?.price || s?.sevice_ref?.amount || 0))} />
      </div>
    )
  }

  if (order.type === 'topup') {
    return (
      <div className='rounded-2xl border border-gray-200 p-4'>
        <div className='mb-2 text-sm font-medium'>Chi tiết dịch vụ</div>
        <DetailRow label='Loại' value='Nạp ví' />
        <DetailRow label='Số tiền nạp' value={formatCurrencyVND(Number(order.price) || 0)} />
        <DetailRow label='Tài khoản' value={order.buyer?.full_name ?? '—'} />
        <DetailRow label='Thời gian' value={fmtDate(order.created_at)} />
      </div>
    )
  }

  if (order.type === 'auction') {
    const a = order.auction
    return (
      <>
        <div className='rounded-2xl border border-gray-200 p-4'>
          <div className='mb-2 text-sm font-medium'>Chi tiết dịch vụ</div>
          <DetailRow label='Loại' value='Yêu cầu đấu giá' />
          <DetailRow label='Phí dịch vụ' value={formatCurrencyVND(Number(order.price) || 0)} />
        </div>
        <AppointmentBox title='Ngày nhận xe' appt={order.viewingAppointment as Appt} />
        {a && (
          <div className='rounded-2xl border border-gray-200 p-4'>
            <div className='mb-2 text-sm font-medium'>Thông tin phiên đấu giá</div>
            <DetailRow label='Mã phiên' value={a.id} />
            <DetailRow label='Giá khởi điểm' value={formatCurrencyVND(a.startingBid)} />
            <DetailRow label='Bước nhảy tối thiểu' value={formatCurrencyVND(a.bidIncrement)} />
            <DetailRow label='Tiền cọc' value={formatCurrencyVND(a.deposit)} />
            <DetailRow label='Giá mua ngay' value={a.buyNowPrice ? formatCurrencyVND(a.buyNowPrice) : '—'} />
            <DetailRow
              label='Giá đăng bán'
              value={a.original_price ? formatCurrencyVND(Number(a.original_price)) : '—'}
            />
            {a.winning_price && <DetailRow label='Giá thắng' value={formatCurrencyVND(Number(a.winning_price))} />}
            {a.winner && <DetailRow label='Người chiến thắng' value={a.winner.full_name} />}
            <DetailRow label='Ghi chú' value={a.note ?? '—'} />
          </div>
        )}
      </>
    )
  }

  if (order.type === 'deposit') {
    const a = order.auction
    return (
      <>
        <div className='rounded-2xl border border-gray-200 p-4'>
          <div className='mb-2 text-sm font-medium'>Chi tiết dịch vụ</div>
          <DetailRow label='Loại' value='Tham gia đấu giá (đặt cọc)' />
          <DetailRow label='Số tiền cọc' value={formatCurrencyVND(Number(order.price) || 0)} />
        </div>
        {order.handoverAppointment && <AppointmentBox title='Lịch bàn giao' appt={order.handoverAppointment as Appt} />}
        {a && (
          <div className='rounded-2xl border border-gray-200 p-4'>
            <div className='mb-2 text-sm font-medium'>Thông tin phiên đấu giá</div>
            <DetailRow label='Mã phiên' value={a.id} />
            <DetailRow label='Giá khởi điểm' value={formatCurrencyVND(a.startingBid)} />
            <DetailRow label='Giá mua ngay' value={a.buyNowPrice ? formatCurrencyVND(a.buyNowPrice) : '—'} />
            <DetailRow label='Bước nhảy tối thiểu' value={formatCurrencyVND(a.bidIncrement)} />
            <DetailRow label='Tiền cọc quy định' value={formatCurrencyVND(a.deposit)} />
            {a.winning_price && <DetailRow label='Giá thắng' value={formatCurrencyVND(Number(a.winning_price))} />}
          </div>
        )}
      </>
    )
  }

  return null
}
