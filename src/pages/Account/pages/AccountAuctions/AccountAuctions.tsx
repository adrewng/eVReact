/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// Nếu bạn đã có sẵn trong ~/utils/util thì dùng import của bạn và xóa 2 hàm dưới:
const formatCurrencyVND = (n?: number | null) =>
  (typeof n === 'number' ? n : 0).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  })
const fmtDate = (s?: string | number | Date) => (s ? new Date(s).toLocaleString('vi-VN') : '—')

// Types & API
import auctionApi from '~/apis/auction.api'
import type { AuctionType, Participation, SessionStatus } from '~/types/auction.type'

// ===== Status label & class (đã thêm DRAFT)
const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  DRAFT: 'Nháp',
  SCHEDULED: 'Lên lịch',
  LIVE: 'Đang diễn ra',
  ENDED: 'Kết thúc',
  CANCELLED: 'Hủy'
}
const SESSION_STATUS_CLASS: Record<SessionStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-700 ring-gray-200',
  SCHEDULED: 'bg-sky-100 text-sky-700 ring-sky-200',
  LIVE: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  ENDED: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  CANCELLED: 'bg-rose-100 text-rose-700 ring-rose-200'
}
function SessionStatusPill({ status }: { status: SessionStatus }) {
  return (
    <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ring-1 ${SESSION_STATUS_CLASS[status]}`}>
      {SESSION_STATUS_LABEL[status]}
    </span>
  )
}

// ===== Toolbar
function Toolbar({
  q,
  setQ,
  status,
  setStatus
}: {
  q: string
  setQ: (v: string) => void
  status: 'all' | SessionStatus
  setStatus: (v: 'all' | SessionStatus) => void
}) {
  const STATUS_OPTIONS: Array<'all' | SessionStatus> = ['all', 'DRAFT', 'SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED']
  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center'>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className='rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm'
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s === 'all' ? 'Tất cả trạng thái' : SESSION_STATUS_LABEL[s]}
          </option>
        ))}
      </select>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Tìm theo tiêu đề hoặc mã phiên...'
        className='w-full rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm md:w-80'
      />
    </div>
  )
}

// ===== Table: Phiên
function SessionsTable({ rows, emptyText }: { rows: AuctionType[]; emptyText: string }) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <table className='min-w-full'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
          <tr>
            <th className='px-4 py-3 text-left'>Phiên</th>
            <th className='px-4 py-3 text-left'>Thời gian</th>
            <th className='px-4 py-3 text-left'>Giá</th>
            <th className='px-4 py-3 text-left'>Trạng thái</th>
            <th className='px-4 py-3 text-right'>Thao tác</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className='px-4 py-6 text-center text-sm text-gray-500'>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((s) => (
            <tr key={s.id} className='hover:bg-gray-50'>
              <td className='px-4 py-3'>
                <div className='font-medium text-gray-900'>{s.title}</div>
                <div className='text-xs text-gray-500'>Mã phiên: #{s.id}</div>
              </td>
              <td className='px-4 py-3'>
                {s.status === 'DRAFT' ? (
                  <div className='text-sm text-gray-500 italic'>Chưa lên lịch</div>
                ) : (
                  <div className='text-sm text-gray-800'>
                    {fmtDate(s.start_at)} → {fmtDate(s.end_at)}
                  </div>
                )}
              </td>
              <td className='px-4 py-3'>
                <div className='text-sm text-gray-800'>
                  {typeof s.currentPrice === 'number' ? (
                    <>
                      Hiện tại: <span className='font-semibold'>{formatCurrencyVND(s.currentPrice)}</span>
                    </>
                  ) : (
                    <>
                      Khởi điểm: <span className='font-semibold'>{formatCurrencyVND(s.startingBid)}</span>
                    </>
                  )}
                </div>
                {typeof s.buyNowPrice === 'number' && s.buyNowPrice > 0 && (
                  <div className='text-xs text-gray-500'>Mua ngay: {formatCurrencyVND(s.buyNowPrice)}</div>
                )}
                {typeof s.bid_count === 'number' && s.bid_count > 0 && (
                  <div className='text-xs text-gray-500 mt-0.5'>{s.bid_count} lượt bid</div>
                )}
              </td>
              <td className='px-4 py-3'>
                <SessionStatusPill status={(s.status ?? 'SCHEDULED') as SessionStatus} />
              </td>
              <td className='px-4 py-3 text-right'>
                <Link
                  to={`/account/orders?highlight=${s.id}`}
                  className='rounded-xl border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50'
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ===== Table: Đã tham gia
function ParticipationsTable({ rows, emptyText }: { rows: Participation[]; emptyText: string }) {
  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white'>
      <table className='min-w-full'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
          <tr>
            <th className='px-4 py-3 text-left'>Phiên</th>
            <th className='px-4 py-3 text-left'>Thời gian</th>
            <th className='px-4 py-3 text-left'>Giá</th>
            <th className='px-4 py-3 text-left'>Trạng thái</th>
            <th className='px-4 py-3 text-left'>Bên tôi</th>
            <th className='px-4 py-3 text-right'>Thao tác</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className='px-4 py-6 text-center text-sm text-gray-500'>
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((p) => {
            const s = p.session
            return (
              <tr key={s.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3'>
                  <div className='font-medium text-gray-900'>{s.title}</div>
                  <div className='text-xs text-gray-500'>Mã phiên: #{s.id}</div>
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm text-gray-800'>
                    {fmtDate(s.start_at)} → {fmtDate(s.end_at)}
                  </div>
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm text-gray-800'>
                    {typeof s.currentPrice === 'number' ? (
                      <>
                        Hiện tại: <span className='font-semibold'>{formatCurrencyVND(s.currentPrice)}</span>
                      </>
                    ) : (
                      <>
                        Khởi điểm: <span className='font-semibold'>{formatCurrencyVND(s.startingBid)}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className='px-4 py-3'>
                  <SessionStatusPill status={(s.status ?? 'SCHEDULED') as SessionStatus} />
                </td>
                <td className='px-4 py-3'>
                  <div className='text-sm'>
                    {p.result === 'WIN' && (
                      <span className='rounded-md bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700'>Thắng</span>
                    )}
                    {p.result === 'LOSE' && (
                      <span className='rounded-md bg-rose-100 px-2 py-0.5 text-xs text-rose-700'>Trượt</span>
                    )}
                    {(!p.result || p.result === 'PENDING') && (
                      <span className='rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700'>Đang chờ</span>
                    )}
                  </div>
                  {typeof s.myTopBid === 'number' && (
                    <div className='mt-1 text-xs text-gray-500'>
                      Giá cao nhất của tôi: {formatCurrencyVND(s.myTopBid)}
                    </div>
                  )}
                </td>
                <td className='px-4 py-3 text-right'>
                  <Link
                    to={`/account/orders?highlight=${s.id}`}
                    className='rounded-xl border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50'
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ===== Page
export default function AccountAuction() {
  const [tab, setTab] = useState<'own' | 'joined'>('own')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | SessionStatus>('all')

  const { data: mySessionsRes, isLoading: loadingOwn } = useQuery({
    queryKey: ['auction', 'my-sessions'],
    queryFn: () => auctionApi.getMySessions()
  })
  const { data: joinedRes, isLoading: loadingJoined } = useQuery({
    queryKey: ['auction', 'participations'],
    queryFn: () => auctionApi.getMyParticipations()
  })

  const mySessions: AuctionType[] = mySessionsRes?.data?.data ?? []
  const participates: Participation[] = joinedRes?.data?.data ?? []

  // Filter + search
  const filteredOwn = useMemo(() => {
    let list = mySessions
    if (status !== 'all') list = list.filter((s) => s.status === status)
    if (q) {
      const t = q.toLowerCase()
      list = list.filter((s) => `${s.title ?? ''} ${s.id}`.toLowerCase().includes(t))
    }
    return list
  }, [mySessions, status, q])

  const filteredJoined = useMemo(() => {
    let list = participates
    if (status !== 'all') list = list.filter((p) => p.session.status === status)
    if (q) {
      const t = q.toLowerCase()
      list = list.filter((p) => `${p.session.title ?? ''} ${p.session.id}`.toLowerCase().includes(t))
    }
    return list
  }, [participates, status, q])

  // Pagination
  const pageSize = 8
  const [page, setPage] = useState(1)
  const dataset = tab === 'own' ? filteredOwn : filteredJoined
  const pageCount = Math.max(1, Math.ceil(dataset.length / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const slice = dataset.slice((safePage - 1) * pageSize, safePage * pageSize)

  // Header stats
  const stats = useMemo(() => {
    const srcOwn = mySessions
    const srcJoined = participates
    return {
      ownTotal: srcOwn.length,
      ownLive: srcOwn.filter((s) => s.status === 'LIVE').length,
      joinedTotal: srcJoined.length,
      joinedLive: srcJoined.filter((p) => p.session.status === 'LIVE').length
    }
  }, [mySessions, participates])

  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        <div className='mb-6'>
          <div className='text-xs uppercase tracking-wider text-gray-500'>Tài khoản của tôi</div>
          <h1 className='text-3xl font-bold tracking-tight'>Quản lý đấu giá</h1>
        </div>

        {/* Quick stats */}
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Phiên của tôi</div>
            <div className='mt-1 text-2xl font-semibold'>{stats.ownTotal}</div>
            <div className='mt-1 text-xs text-gray-500'>Đang diễn ra: {stats.ownLive}</div>
          </div>
          <div className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'>
            <div className='text-sm text-gray-500'>Đã tham gia</div>
            <div className='mt-1 text-2xl font-semibold'>{stats.joinedTotal}</div>
            <div className='mt-1 text-xs text-gray-500'>Đang diễn ra: {stats.joinedLive}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className='mt-6 flex items-center gap-2'>
          <button
            onClick={() => {
              setTab('own')
              setPage(1)
            }}
            className={`rounded-xl px-3 py-2 text-sm ring-1 ${
              tab === 'own' ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-700 ring-gray-200'
            }`}
          >
            Phiên của tôi
          </button>
          <button
            onClick={() => {
              setTab('joined')
              setPage(1)
            }}
            className={`rounded-xl px-3 py-2 text-sm ring-1 ${
              tab === 'joined' ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-700 ring-gray-200'
            }`}
          >
            Đã tham gia
          </button>

          <div className='ml-auto'>
            <Toolbar q={q} setQ={setQ} status={status} setStatus={setStatus} />
          </div>
        </div>

        {/* Content */}
        <div className='mt-4'>
          {tab === 'own' ? (
            loadingOwn ? (
              <div className='rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500'>
                Đang tải phiên của bạn...
              </div>
            ) : (
              <SessionsTable rows={slice as AuctionType[]} emptyText='Chưa có phiên nào.' />
            )
          ) : loadingJoined ? (
            <div className='rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500'>
              Đang tải danh sách tham gia...
            </div>
          ) : (
            <ParticipationsTable rows={slice as Participation[]} emptyText='Chưa tham gia phiên nào.' />
          )}
        </div>

        {/* Pagination */}
        <div className='mt-4 flex items-center justify-between text-sm text-gray-500'>
          <div>
            Hiển thị <span className='font-medium'>{slice.length}</span> /{' '}
            <span className='font-medium'>{dataset.length}</span> dòng
          </div>
          <div className='flex items-center gap-2'>
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className='rounded-xl border border-gray-200 px-3 py-1.5 disabled:opacity-50'
            >
              Trước
            </button>
            <div>
              Trang <span className='font-medium'>{safePage}</span> / <span className='font-medium'>{pageCount}</span>
            </div>
            <button
              disabled={safePage >= pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className='rounded-xl border border-gray-200 px-3 py-1.5 disabled:opacity-50'
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
