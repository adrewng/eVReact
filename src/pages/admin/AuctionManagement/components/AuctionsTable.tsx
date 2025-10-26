'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import auctionApi from '~/apis/auction.api'
import type { Auction } from '~/types/auction.type'
import { toast } from 'react-toastify'

interface FilterProps {
  status: string
  search: string
  sortBy: string
}

export default function AuctionsTable({ filters }: { filters: FilterProps }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [isVerify, setIsVerify] = useState<boolean>(false)

  const { data: allAuctionData } = useQuery({
    queryKey: ['all-auction'],
    queryFn: auctionApi.getAllAuction
  })

  const startAuction = useMutation({
    mutationFn: (auction_id: number) => auctionApi.startAuction(auction_id)
  })
  const handleStartAuction = (auction_id: number) => {
    startAuction.mutate(auction_id)
  }

  const updateAuction = useMutation({
    mutationFn: ({ auctionId, duration }: { auctionId: number; duration: number }) =>
      auctionApi.verifyAuctionByAdmin(auctionId, duration),
    onSuccess: () => {
      toast.success('Xác minh phiên đấu giá thành công!')
      setEditingAuction(null)
    },
    onError: () => {
      toast.error('Có lỗi xảy ra khi xác minh!')
    }
  })
  const handleSave = (auctionId: number, duration: number, isVerify: boolean) => {
    if (isVerify) {
      updateAuction.mutate({ auctionId, duration })
    } else {
      toast.info('Chưa chọn xác minh phiên đấu giá!')
    }
  }
  const handleUpdateAuction = (auctionId: number, duration: number) => {
    if (isVerify) {
      updateAuction.mutate({ auctionId, duration })
    }
  }

  const auctions = allAuctionData?.data?.data || []
  console.log('auction -', auctions)

  // Lọc
  let filteredAuctions = auctions
  if (filters.status !== 'all') {
    filteredAuctions = filteredAuctions.filter((a) => a.status === filters.status)
  }
  if (filters.search) {
    filteredAuctions = filteredAuctions.filter((a) => a.note.toLowerCase().includes(filters.search.toLowerCase()))
  }

  const handleEdit = (auction: Auction) => {
    setEditingAuction(auction)
    setDuration(auction.duration || 0)
  }

  const formatMoney = (value: string | number) =>
    Number(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

  const getStatusBadge = (status: string) => {
    const badges = {
      live: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Live' },
      draft: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Draft' },
      ended: { bg: 'bg-slate-50', text: 'text-slate-700', label: 'Ended' }
    }
    return badges[status as keyof typeof badges] || badges.ended
  }

  return (
    <div className='space-y-3 rounded-xl border border-slate-200 bg-white shadow-sm'>
      {/* Header */}
      <div className='hidden border-b border-slate-200 px-6 py-4 sm:grid sm:grid-cols-12 sm:gap-4'>
        <div className='col-span-4 text-xs font-semibold uppercase tracking-wide text-slate-600'>Sản Phẩm</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Giá Khởi Điểm</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Giá Mục Tiêu</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600'>Trạng Thái</div>
        <div className='col-span-2 text-xs font-semibold uppercase tracking-wide text-slate-600 text-right'>
          Hành Động
        </div>
      </div>

      {/* Rows */}
      <div className='divide-y divide-slate-200'>
        {filteredAuctions.map((auction: Auction) => {
          const badge = getStatusBadge(auction.status)
          const isExpanded = expandedId === auction.id

          return (
            <div key={auction.id}>
              {/* Hàng chính */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : auction.id)}
                className='grid grid-cols-1 gap-4 px-6 py-4 transition hover:bg-slate-50 sm:grid-cols-12 sm:items-center cursor-pointer'
              >
                <div className='col-span-1 sm:col-span-4'>
                  <p className='font-medium text-slate-900 line-clamp-1'>{auction.note}</p>
                  <p className='mt-1 text-xs text-slate-500'>Mã sản phẩm: {auction.product_id}</p>
                </div>

                <div className='col-span-1 sm:col-span-2'>
                  <p className='text-sm font-semibold text-slate-900'>{formatMoney(auction.starting_price)}</p>
                </div>

                <div className='col-span-1 sm:col-span-2'>
                  <p className='text-sm font-semibold text-emerald-700'>{formatMoney(auction.target_price)}</p>
                </div>

                <div className='col-span-1 sm:col-span-2'>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </div>

                <div className='col-span-1 sm:col-span-2 flex justify-end gap-2 cursor-default'>
                  <button
                    onClick={() => handleEdit(auction)}
                    className='rounded-lg bg-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-300 transition-colors'
                  >
                    Chỉnh Sửa
                  </button>
                  <button
                    onClick={() => handleStartAuction(auction.id)}
                    className='rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-600 transition-colors'
                  >
                    Bắt Đầu
                  </button>
                </div>
              </div>

              {/* Chi tiết mở rộng */}
              {isExpanded && (
                <div className='border-t border-slate-200 bg-slate-50 px-6 py-4'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Bước Giá</p>
                      <p className='mt-1 text-sm text-slate-900'>{formatMoney(auction.step)}</p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Tiền Cọc</p>
                      <p className='mt-1 text-sm text-slate-900'>{formatMoney(auction.deposit)}</p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Thời Lượng</p>
                      <p className='mt-1 text-sm text-slate-900'>{auction.duration} giờ</p>
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase text-slate-600'>Người Bán</p>
                      <p className='mt-1 text-sm text-slate-900'>ID {auction.seller_id}</p>
                    </div>
                    {auction.winning_price && (
                      <div>
                        <p className='text-xs font-semibold uppercase text-slate-600'>Giá Trúng Thầu</p>
                        <p className='mt-1 text-sm font-semibold text-emerald-600'>
                          {formatMoney(auction.winning_price)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modal chỉnh sửa */}
      {editingAuction && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
          <div className='rounded-xl bg-white p-6 shadow-xl w-96'>
            <h2 className='text-lg font-semibold text-slate-900 mb-4'>Chỉnh Sửa Phiên Đấu Giá</h2>

            <div className='space-y-4'>
              {/* Thời lượng */}
              <div>
                <label className='block text-sm font-medium text-slate-700'>Thời lượng (giờ)</label>
                <input
                  type='number'
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className='mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'
                />
              </div>

              {/* Check verify */}
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='isVerify'
                  checked={isVerify}
                  onChange={(e) => setIsVerify(e.target.checked)}
                  className='h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                />
                <label htmlFor='isVerify' className='text-sm text-slate-700'>
                  Xác minh phiên đấu giá (Verify)
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className='mt-6 flex justify-end gap-2'>
              <button
                onClick={() => setEditingAuction(null)}
                className='rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
              >
                Hủy
              </button>

              <button
                onClick={() => handleSave(editingAuction.id, duration, isVerify)}
                className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
