'use client'

import { useState } from 'react'
import { ChevronRight, Gavel } from 'lucide-react'

interface FilterProps {
  status: string
  search: string
  sortBy: string
}

const mockAuctions = [
  {
    id: 1,
    title: 'Xe điện VinFast VF e34 cũ - bản nâng cấp',
    currentPrice: 425000000,
    stepPrice: 5000000,
    totalBids: 12,
    startTime: '2025-10-23T10:00:00',
    endTime: '2025-10-28T15:00:00',
    status: 'active',
    location: 'Hà Nội'
  },
  {
    id: 2,
    title: 'Pin xe điện CATL 60kWh - tình trạng tốt',
    currentPrice: 68000000,
    stepPrice: 2000000,
    totalBids: 7,
    startTime: '2025-10-25T20:00:00',
    endTime: '2025-10-26T20:00:00',
    status: 'upcoming',
    location: 'TP. Hồ Chí Minh'
  },
  {
    id: 3,
    title: 'Xe điện Tesla Model 3 cũ - nhập Mỹ',
    currentPrice: 990000000,
    stepPrice: 10000000,
    totalBids: 23,
    startTime: '2025-10-20T08:00:00',
    endTime: '2025-10-27T22:00:00',
    status: 'active',
    location: 'Đà Nẵng'
  },
  {
    id: 4,
    title: 'Pin xe điện LG Chem 75kWh - hàng chính hãng',
    currentPrice: 85000000,
    stepPrice: 3000000,
    totalBids: 5,
    startTime: '2024-10-29T18:00:00',
    endTime: '2024-10-30T18:00:00',
    status: 'ended',
    location: 'Cần Thơ'
  }
]

const getStatusBadge = (status: string) => {
  const badges = {
    active: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Đang Diễn Ra' },
    upcoming: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Sắp Bắt Đầu' },
    ended: { bg: 'bg-slate-50', text: 'text-slate-700', label: 'Đã Kết Thúc' }
  }
  const badge = badges[status as keyof typeof badges] || badges.ended
  return badge
}

export default function AuctionsTable({ filters }: { filters: FilterProps }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  let filteredAuctions = mockAuctions

  if (filters.status !== 'all') {
    filteredAuctions = filteredAuctions.filter((a) => a.status === filters.status)
  }

  if (filters.search) {
    filteredAuctions = filteredAuctions.filter((a) => a.title.toLowerCase().includes(filters.search.toLowerCase()))
  }

  return (
    <div className='space-y-3 rounded-xl border border-slate-200 bg-white shadow-sm'>
      {/* Header */}
      <div className='hidden border-b border-slate-200 px-6 py-4 sm:grid sm:grid-cols-12 sm:gap-4'>
        <div className='col-span-4 text-xs font-semibold uppercase tracking-wide text-slate-600'>Sản Phẩm</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Giá Hiện Tại</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Lượt Đấu</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Trạng Thái</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Hành Động</div>
      </div>

      {/* Rows */}
      <div className='divide-y divide-slate-200'>
        {filteredAuctions.map((auction) => {
          const badge = getStatusBadge(auction.status)
          const isExpanded = expandedId === auction.id

          return (
            <div key={auction.id}>
              {/* Main Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : auction.id)}
                className='grid grid-cols-1 gap-4 px-6 py-4 transition hover:bg-slate-50 sm:grid-cols-12 sm:items-center'
              >
                {/* Product */}
                <div className='col-span-1 sm:col-span-4'>
                  <p className='font-medium text-slate-900'>{auction.title}</p>
                  <p className='mt-1 text-xs text-slate-500'>{auction.location}</p>
                </div>

                {/* Price */}
                <div className='col-span-1 sm:col-span-2'>
                  <p className='text-sm font-semibold text-slate-900'>{(auction.currentPrice / 1000000).toFixed(0)}M</p>
                  <p className='text-xs text-slate-500'>+{auction.stepPrice.toLocaleString('vi-VN')}đ</p>
                </div>

                {/* Bids */}
                <div className='col-span-1 sm:col-span-2'>
                  <div className='flex items-center gap-2'>
                    <Gavel className='h-4 w-4 text-slate-400' />
                    <span className='font-semibold text-slate-900'>{auction.totalBids}</span>
                  </div>
                </div>

                {/* Status */}
                <div className='col-span-1 sm:col-span-2'>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Action */}
                <div className='col-span-1 sm:col-span-2 flex justify-end'>
                  <button className='rounded-lg p-2 transition hover:bg-slate-100'>
                    <ChevronRight className={`h-5 w-5 text-slate-400 transition ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className='border-t border-slate-200 bg-slate-50 px-6 py-4'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Giá Khởi Điểm</p>
                      <p className='mt-1 text-lg font-bold text-slate-900'>
                        {(auction.currentPrice / 1000000).toFixed(0)}M
                      </p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Bước Giá</p>
                      <p className='mt-1 text-lg font-bold text-slate-900'>
                        {(auction.stepPrice / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Thời Gian Kết Thúc</p>
                      <p className='mt-1 text-sm text-slate-900'>
                        {new Date(auction.endTime).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Tổng Giá Trị</p>
                      <p className='mt-1 text-lg font-bold text-emerald-600'>
                        {((auction.currentPrice * auction.totalBids) / 1000000000).toFixed(1)}B
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 flex gap-2'>
                    <button className='rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100'>
                      Xem Chi Tiết
                    </button>
                    <button className='rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300'>
                      Chỉnh Sửa
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAuctions.length === 0 && (
        <div className='px-6 py-12 text-center'>
          <Gavel className='mx-auto h-12 w-12 text-slate-300' />
          <p className='mt-4 text-slate-600'>Không tìm thấy phiên đấu giá nào</p>
        </div>
      )}
    </div>
  )
}
