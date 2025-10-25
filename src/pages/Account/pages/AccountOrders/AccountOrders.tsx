/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import orderApi from '~/apis/order.api'
import { ORDER_TYPE_LABEL, ORDERSTATUS, type OrderStatus, type OrderType } from '~/constants/order'
import useQueryConfig from '~/hooks/useQueryConfig'
import type { Order } from '~/types/order.type'
import { formatCurrencyVND } from '~/utils/util'
import OrderCard from './components/OrderCard/OrderCard'
import OrderDetail from './components/OrderDetail/OrderDetail'
import Pagination from './components/Pagination'
import Toolbar from './components/Toolbar'

type StatusType = OrderStatus
const makeCode = (id: number) => `OD${String(id).padStart(6, '0')}`

const DEMO_ORDERS: Order[] = [
  {
    id: 101,
    type: 'post',
    status: 'PROCESSING',
    price: 400000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    buyer: { id: 2, full_name: 'Nguyễn Nhật Trường', email: 'b@example.com', phone: '0909000002' },
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
    status: 'SUCCESS',
    price: 1_000_000,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    buyer: { id: 1, full_name: 'Nguyễn A', email: 'a@example.com', phone: '0909000001' }
  },
  {
    id: 303,
    type: 'auction',
    status: 'SUCCESS',
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
    buyer: { id: 1, full_name: 'Nguyễn A' },
    auction: {
      id: 9001,
      product_id: 1,
      startingBid: 10_000_000,
      original_price: 12_100_000,
      buyNowPrice: 13_500_000,
      bidIncrement: 200_000,
      deposit: 1_000_000,
      winner: { id: 11, full_name: 'Trần Thị B' },
      winning_price: 88_500_000,
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
    status: 'PROCESSING',
    price: 990_000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    buyer: { id: 1, full_name: 'Nguyễn A', email: 'a@example.com', phone: '0909000001' },
    service: {
      id: 11,
      name: 'Gói Đăng tin Pro (30 ngày)',
      type: 'package',
      description: 'Tăng hiển thị bài đăng trong 30 ngày, ưu tiên xếp hạng.',
      price: '990000',
      feature: 'Highlight listing, ưu tiên tìm kiếm',
      userUsageCount: 0,
      sevice_ref: { service_id: 11, name: 'post_package_pro', amount: 2 }
    }
  },
  {
    id: 702,
    type: 'deposit',
    status: 'AUCTION_PROCESSING',
    price: 1_000_000,
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
      startingBid: 70_000_000,
      original_price: 85_000_000,
      buyNowPrice: 90_000_000,
      bidIncrement: 500_000,
      deposit: 1_000_000,
      winner: { id: 11, full_name: 'Trần Thị B' },
      winning_price: 88_500_000,
      duration: '3d',
      isVerify: true,
      note: 'Gia hạn 5 phút nếu có bid cuối trong 5 phút cuối.'
    }
  }
]

const TYPE_OPTIONS: Array<'all' | OrderType> = ['all', 'post', 'package', 'topup', 'auction', 'deposit']
const STATUS_OPTIONS: Array<'all' | StatusType> = [
  'all',
  'PENDING',
  'PROCESSING',
  'VERIFYING',
  'SUCCESS',
  'FAILED',
  'CANCELLED',
  'REFUND',
  'AUCTION_PROCESSING',
  'AUCTION_SUCCESS',
  'AUCTION_FAILED'
]

export default function MyOrdersPage() {
  const [q, setQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | OrderType>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | StatusType>('all')

  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Order | null>(null)

  const source: Order[] = DEMO_ORDERS

  const { data: orderData } = useQuery({
    queryKey: ['order'],
    queryFn: () => orderApi.getOrdersByUser()
  })
  const data = orderData?.data?.data

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
      awaiting: source.filter((o) => o.status === 'PENDING').length,
      delivered: source.filter((o) => o.status === 'SUCCESS').length,
      spend: source
        .filter((o) => o.status !== 'CANCELLED' && o.status !== 'REFUND' && o.status !== 'FAILED')
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
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
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
                  {s === 'all' ? 'Tất cả trạng thái' : ORDERSTATUS[s as StatusType].label}
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
          <Pagination pageSize={data?.pagination?.page_size ?? 1} queryConfig={queryConfig} />
        </div>

        {/* Drawer */}
        <OrderDetail open={open} onClose={() => setOpen(false)} order={current} />
      </div>
    </div>
  )
}
