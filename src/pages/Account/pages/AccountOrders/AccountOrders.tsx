/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClipboardList, CreditCard, Download, MessageSquare, Receipt, RefreshCcw, Star, Undo2, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ORDER_TYPE_LABEL, ORDERSTATUS, type OrderStatus, type OrderType } from '~/constants/order'
import useQueryConfig from '~/hooks/useQueryConfig'
import { formatCurrencyVND } from '~/utils/util'
import OrderDetail from './components/OrderDetail/OrderDetail'
import Pagination from './components/Pagination'
import StatusPill from './components/StatusPill'
import Toolbar from './components/Toolbar'

// dùng đúng type API của bạn
import type { Order } from '~/types/order.type'

const SHOP_NAME = 'Eviest'
type StatusType = OrderStatus

const makeCode = (id: number) => `OD${String(id).padStart(6, '0')}`
const fmtDate = (s?: string) => (s ? new Date(s).toLocaleString('vi-VN') : '—')

const DEMO_ORDERS: Order[] = [
  // 1) ĐĂNG TIN — KHÔNG có xem xe
  {
    id: 101,
    type: 'post',
    status: 'processing',
    price: 400000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: { id: 2, full_name: 'Nguyễn Nhật Trường', email: 'b@example.com', phone: '0909000002' },
    post: {
      id: 5001,
      title: 'VF3 - Còn mới 99%',
      priority: 1,
      created_at: '',
      updated_at: '',
      product: {
        id: 1,
        brand: 'Yamaha',
        model: 'Grande',
        power: '125cc',
        price: '12100000',
        address: '8/3 Bình Giao, Thuận An, Hà Nội',
        description: 'Xe máy tay ga',
        category: { id: 3, typeSlug: 'vehicle', name: 'Xe máy' },
        mileage: '12.000 km',
        year: 2020,
        seats: 2,
        image: '',
        images: [],
        warranty: '3 tháng',
        color: 'Đen',
        health: 'Tốt'
      }
    },
    service: { id: 1, name: 'Đăng tin trả phí cho xe', description: 'Đăng tin trả phí cho xe', price: '400000' }
  },

  {
    id: 202,
    type: 'topup',
    status: 'delivered',
    price: 1_000_000,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    seller: { id: 1, full_name: 'Nguyễn A', email: 'a@example.com', phone: '0909000001' }
  },

  // 3) YÊU CẦU ĐẤU GIÁ — CÓ xem xe
  {
    id: 303,
    type: 'auction_request',
    status: 'shipping', // “Đang nhận báo giá”
    price: 50_000,

    viewingAppointment: {
      address: 'Vincom Thảo Điền, Q.2',
      time: new Date(Date.now() + 2 * 3600_000).toISOString(),
      contactName: 'NV kiểm định',
      contactPhone: '0902 345 678',
      status: 'scheduled',
      notes: 'Mang giấy tờ xe bản photo.'
    },

    post: {
      id: 5001,
      title: 'VF3 - Còn mới 99%',
      priority: 1,
      created_at: '',
      updated_at: '',
      product: {
        id: 1,
        brand: 'Yamaha',
        model: 'Grande',
        power: '125cc',
        price: '12100000',
        address: '8/3 Bình Giao, Thuận An, Hà Nội',
        description: 'Xe máy tay ga',
        category: { id: 3, typeSlug: 'vehicle', name: 'Xe máy' },
        mileage: '12.000 km',
        year: 2020,
        seats: 2,
        image: '',
        images: [],
        warranty: '3 tháng',
        color: 'Đen',
        health: 'Tốt'
      }
    },

    // Người bán: đây là dịch vụ của hệ thống → UI hiển thị "Eviest" (dù DB có thể lưu sellerId = user)
    seller: { id: 1, full_name: 'Nguyễn A' },
    auction: {
      id: 9001,
      product_id: 1,
      startingBid: 10_000_000,
      original_price: 12_100_000,
      buyNowPrice: 13_500_000,
      bidIncrement: 200_000,
      deposit: 1_000_000,
      winner: null,
      winning_price: null,
      duration: '',
      isVerify: true,
      note: 'Gia hạn 5 phút nếu có bid trong 5 phút cuối.'
    },

    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 404,
    type: 'package',
    status: 'processing',
    price: 990_000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller: { id: 1, full_name: 'Nguyễn A', email: 'a@example.com', phone: '0909000001' },
    service: {
      id: 11,
      name: 'Gói Đăng tin Pro (30 ngày)',
      type: 'package',
      description: 'Tăng hiển thị bài đăng trong 30 ngày, ưu tiên xếp hạng.',
      price: '990000',
      feature: 'Highlight listing, ưu tiên tìm kiếm',
      userUsageCount: 0,
      sevice_ref: {
        service_id: 11,
        name: 'post_package_pro',
        amount: 2
      }
    }
  },
  {
    id: 702,
    type: 'auction_bid',
    status: 'processing', // hoặc 'delivered' nếu đã chốt & bàn giao
    price: 1_000_000, // tiền cọc/đặt chỗ để tham gia
    // Nếu người này thắng cuộc và đã có lịch bàn giao, có thể thêm:
    handoverAppointment: {
      address: 'Kho xe Eviest, Q.12, TP.HCM',
      time: new Date(Date.now() + 3 * 86400000).toISOString(),
      contactName: 'Anh Tùng',
      contactPhone: '0903 111 222',
      status: 'scheduled',
      notes: 'Mang CMND/CCCD bản gốc.'
    },
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    buyer: { id: 11, full_name: 'Trần Thị B', phone: '0909555333' },
    seller: { id: 1, full_name: 'Nguyễn A', email: 'a@example.com', phone: '0909000001' },
    post: {
      id: 6001,
      title: 'Honda SH 150i ABS 2021',
      priority: 1,
      created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      product: {
        id: 9001,
        brand: 'Honda',
        model: 'SH 150i ABS',
        power: '150cc',
        price: '85000000',
        address: '12 Nguyễn Văn Cừ, Q.5, TP.HCM',
        description: 'Xe chạy kỹ, bao test hãng.',
        category: { id: 21, typeSlug: 'vehicle', name: 'Xe máy' },
        mileage: '18.000 km',
        year: 2021,
        seats: 2,
        image: '',
        images: [],
        warranty: 'Không',
        color: 'Trắng',
        health: 'Tốt'
      }
    },
    auction: {
      id: 8001,
      product_id: 6001,
      startingBid: 70_000_000, // giá khởi điểm
      original_price: 85_000_000, // giá tham khảo thị trường
      buyNowPrice: 90_000_000, // giá mua ngay (nếu có)
      bidIncrement: 500_000, // bước nhảy tối thiểu
      deposit: 1_000_000, // tiền cọc khi tham gia
      winner: { id: 11, full_name: 'Trần Thị B' }, // có thể null trước khi kết thúc
      winning_price: 88_500_000,
      duration: '3d', // hoặc số ms/giờ tuỳ backend
      isVerify: true,
      note: 'Gia hạn 5 phút nếu có bid cuối trong 5 phút cuối.'
    }
  }
]

function OrderCard({ o, onOpen }: { o: Order; onOpen: (o: Order) => void }) {
  const code = makeCode(o.id)
  const viewingTime = o.viewingAppointment?.time
  const handoverTime = o.handoverAppointment?.time

  // helper cho case post
  const product: any = o.post?.product
  const productPrice = Number(product?.price || 0)
  const categoryName = product?.category?.name as string | undefined

  return (
    <div className='rounded-2xl border border-gray-200 bg-white shadow-sm'>
      <div className='flex items-center justify-between gap-3 border-b border-gray-100 p-4'>
        <div className='flex items-center gap-2'>
          <div className='font-medium'>{SHOP_NAME}</div>
          <span className='mx-2 text-gray-300'>•</span>
          <div className='text-sm text-gray-500'>
            Mã: <span className='font-medium text-gray-800'>{code}</span>
          </div>
          <span className='mx-2 text-gray-300'>•</span>
          <span className='rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700'>
            {ORDER_TYPE_LABEL[o.type]}
          </span>
        </div>
        <StatusPill status={o.status} />
      </div>

      <div className='p-4 text-sm'>
        <div className='flex flex-col gap-1 text-gray-600'>
          {/* THÔNG TIN CHUNG CHO ĐĂNG TIN */}
          {o.type !== 'topup' && o.type !== 'auction_bid' && o.post && (
            <div className='flex flex-col gap-0.5'>
              {o.type === 'auction_request' && (
                <div>
                  <span className='text-gray-500'>Mã phiên đấu giá: </span>
                  <span className='font-medium text-gray-800'>{o.auction?.id}</span>
                </div>
              )}
              <div>
                <span className='text-gray-500'>Mã bài đăng: </span>
                <span className='font-medium text-gray-800'>{o.post.id}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá sản phẩm: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(productPrice)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Loại sản phẩm: </span>
                <span className='font-medium text-gray-800'>{categoryName ?? '—'}</span>
              </div>
            </div>
          )}
          {o.type === 'auction_bid' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Mã phiên đấu giá: </span>
                <span className='font-medium text-gray-800'>{o.auction?.id}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá thắng đấu giá: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.auction?.winning_price)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Sản phẩm: </span>
                <span className='font-medium text-gray-800'>{o.post?.product.model}</span>
              </div>
            </div>
          )}
          {/* CHỈ auction_request mới show lịch xem xe */}
          {(o.type === 'auction_request' || o.type === 'auction_bid') && (
            <>
              {o.type === 'auction_request' && (
                <div>
                  <span className='text-gray-500'>Lịch xem xe: </span>
                  <span className='font-medium'>
                    {fmtDate(viewingTime)} • {o.viewingAppointment?.address ? o.viewingAppointment.address : '-'}
                  </span>
                </div>
              )}
              {handoverTime && (
                <div>
                  <span className='text-gray-500'>Hẹn bàn giao: </span>
                  <span className='font-medium'>
                    {fmtDate(handoverTime)} • {o.handoverAppointment?.address ?? '-'}
                  </span>
                </div>
              )}
            </>
          )}
          {o.type === 'package' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Gói: </span>
                <span className='font-medium text-gray-800'>{o.service?.name}</span>
              </div>
              <div>
                <span className='text-gray-500'>Giá gói: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.price)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Chức năng: </span>
                <span className='font-medium text-gray-800'>{o.service?.description}</span>
              </div>
            </div>
          )}

          {o.type === 'topup' && (
            <div className='flex flex-col gap-0.5'>
              <div>
                <span className='text-gray-500'>Nạp bao nhiêu: </span>
                <span className='font-medium text-gray-800'>{formatCurrencyVND(o.price)}</span>
              </div>
              <div>
                <span className='text-gray-500'>Phương thức nạp: </span>
                <span className='font-medium text-gray-800'>PayOS</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4'>
        <div className='text-sm text-gray-600'>
          Trạng thái: <span className='font-medium text-gray-800'>{ORDERSTATUS[o.status].label}</span>
        </div>
        <div className='text-right'>
          <div className='text-xs text-gray-500'>Thành tiền</div>
          <div className='text-lg font-semibold'>{formatCurrencyVND(Number(o.price) || 0)}</div>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-end gap-2 p-4'>
        <button
          onClick={() => onOpen(o)}
          className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'
        >
          <Receipt className='mr-2 inline h-4 w-4' /> Chi tiết
        </button>

        {o.status === 'awaiting_payment' && (
          <>
            <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
              <X className='mr-2 inline h-4 w-4' /> Hủy
            </button>
            <button className='rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black'>
              <CreditCard className='mr-2 inline h-4 w-4' /> Thanh toán
            </button>
          </>
        )}

        {/* Chỉ auction_request cần chat hẹn/báo giá */}
        {o.type === 'auction_request' && (o.status === 'processing' || o.status === 'shipping') && (
          <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
            <MessageSquare className='mr-2 inline h-4 w-4' /> Trao đổi lịch hẹn
          </button>
        )}

        {o.type === 'auction_request' && o.status === 'shipping' && (
          <>
            <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
              <ClipboardList className='mr-2 inline h-4 w-4' /> Xem báo giá
            </button>
            <button className='rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
              <Undo2 className='mr-2 inline h-4 w-4' /> Hủy yêu cầu
            </button>
          </>
        )}

        {o.status === 'delivered' && (
          <>
            <button className='rounded-2xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
              <Download className='mr-2 inline h-4 w-4' /> Biên nhận
            </button>
            {o.type !== 'topup' && (
              <button className='rounded-2xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
                <Star className='mr-2 inline h-4 w-4' /> Đánh giá dịch vụ
              </button>
            )}
          </>
        )}

        {o.status === 'refund' && (
          <button className='rounded-2xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50'>
            <RefreshCcw className='mr-2 inline h-4 w-4' /> Theo dõi hoàn tiền
          </button>
        )}
      </div>
    </div>
  )
}

/* ======================= PAGE ======================= */

const TYPE_OPTIONS: Array<'all' | OrderType> = ['all', 'post', 'package', 'topup', 'auction_request', 'auction_bid']
const STATUS_OPTIONS: Array<'all' | StatusType> = ['all', ...(Object.keys(ORDERSTATUS) as StatusType[])]

export default function MyOrdersPage() {
  const [q, setQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | OrderType>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | StatusType>('all')

  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Order | null>(null)

  const source: Order[] = DEMO_ORDERS

  const filtered = useMemo(() => {
    let list = source
    if (typeFilter !== 'all') list = list.filter((o) => o.type === typeFilter)
    if (statusFilter !== 'all') list = list.filter((o) => o.status === statusFilter)
    if (q) {
      const t = q.toLowerCase()
      list = list.filter((o) => `${makeCode(o.id)} ${o.post?.title ?? ''}`.toLowerCase().includes(t))
    }
    return list
  }, [q, typeFilter, statusFilter, source])

  const pageSize = 6
  const pageCount = Math.ceil(filtered.length / pageSize)
  const safePage = Math.min(Math.max(1, page), Math.max(1, pageCount))
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  const totals = useMemo(
    () => ({
      all: source.length,
      awaiting: source.filter((o) => o.status === 'awaiting_payment').length,
      delivered: source.filter((o) => o.status === 'delivered').length,
      spend: source
        .filter((o) => o.status !== 'cancelled' && o.status !== 'refund')
        .reduce((a, o) => a + (Number(o.price) || 0), 0)
    }),
    [source]
  )

  const openDrawer = (o: Order) => {
    setCurrent(o)
    setOpen(true)
  }
  const queryConfig = useQueryConfig()

  return (
    <div className='mx-auto max-w-5xl p-4 md:p-8'>
      <div className='mb-6'>
        <div className='text-xs uppercase tracking-wider text-gray-500'>Tài khoản của tôi</div>
        <h1 className='text-3xl font-bold tracking-tight'>Đơn hàng của tôi</h1>
      </div>

      {/* Quick stats */}
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='text-sm text-gray-500'>Tất cả đơn</div>
          <div className='mt-1 text-2xl font-semibold'>{totals.all}</div>
        </div>
        <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='text-sm text-gray-500'>Chờ thanh toán</div>
          <div className='mt-1 text-2xl font-semibold'>{totals.awaiting}</div>
        </div>
        <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='text-sm text-gray-500'>Hoàn tất</div>
          <div className='mt-1 text-2xl font-semibold'>{totals.delivered}</div>
        </div>
        <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='text-sm text-gray-500'>Tổng chi tiêu (ước tính)</div>
          <div className='mt-1 text-2xl font-semibold'>{formatCurrencyVND(totals.spend)}</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className='mt-6 flex flex-wrap items-center gap-2'>
        <div className='flex w-full flex-col gap-2 md:w-auto md:flex-row'>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value as any)
              setPage(1)
            }}
            className='rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm'
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'all' ? 'Tất cả loại' : ORDER_TYPE_LABEL[opt as OrderType]}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any)
              setPage(1)
            }}
            className='rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm'
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'Tất cả trạng thái' : ORDERSTATUS[s].label}
              </option>
            ))}
          </select>
        </div>

        <div className='ml-auto w-full md:w-96'>
          <Toolbar q={q} setQ={setQ} />
        </div>
      </div>

      {/* Orders list */}
      <div className='mt-6 grid grid-cols-1 gap-4'>
        {slice.map((o) => (
          <OrderCard key={o.id} o={o} onOpen={openDrawer} />
        ))}
        {slice.length === 0 && (
          <div className='rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500'>
            Không có đơn phù hợp.
          </div>
        )}
      </div>

      {/* Footer / Pagination */}
      <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
        <div>
          Hiển thị <span className='font-medium'>{slice.length}</span> /{' '}
          <span className='font-medium'>{filtered.length}</span> đơn
        </div>
        <Pagination pageSize={6} queryConfig={queryConfig} />
      </div>

      {/* Drawer */}
      <OrderDetail open={open} onClose={() => setOpen(false)} order={current} />
    </div>
  )
}
