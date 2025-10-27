import { Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import type { Auction } from '~/types/auction.type'
import { formatCurrencyVND } from '~/utils/util'

export default function AuctionCard({ auction }: { auction: Auction }) {
  const now = Date.now()
  const start = new Date(auction.start_at).getTime()
  const end = new Date(auction.duration).getTime()

  let statusDisplay
  if (now < start) {
    const startDate = new Date(auction.start_at).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })
    statusDisplay = (
      <div className='inline-flex items-center gap-1 text-sm text-zinc-500'>
        <Clock size={16} /> Bắt đầu lúc {startDate}
      </div>
    )
  } else if (now >= start && now <= end) {
    // đang diễn ra
    statusDisplay = (
      <div className='inline-flex items-center gap-7'>
        {/* <div className='inline-flex items-center gap-1'>
          <Gavel size={16} /> {auction.totalBids} lượt
        </div> */}
        <div className=' text-red-600 font-semibold animate-pulse '>
          <span className='inline-block w-2 h-2 bg-red-600 rounded-full animate-ping'></span>
          <span className='pl-2'>Đang diễn ra</span>
        </div>
      </div>
    )
  } else {
    // đã kết thúc
    statusDisplay = (
      <div className='inline-flex items-center gap-1 text-zinc-500'>
        <Clock size={16} /> Đã kết thúc
      </div>
    )
  }

  return (
    <Link to={`${path.auction}/${auction.id}`}>
      <div className='aspect-[4/3] w-full overflow-hidden bg-zinc-100'>
        <img
          src={auction.image}
          alt={auction.title}
          className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>

      <div className='flex flex-col flex-1'>
        {/* Title & Location */}
        <div className='flex items-start justify-between p-4'>
          <div className='min-w-0'>
            <div className='font-semibold truncate leading-tight'>{auction.title}</div>
            <div className='text-sm truncate text-zinc-600 flex items-center gap-1'>
              <MapPin size={14} /> {auction.location}
              {/* <MapPin size={14} /> {'Haha'} */}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className='mt-auto flex flex-col gap-2 p-4 border-t text-sm text-zinc-700'>
          <div className='flex items-center '>{statusDisplay}</div>

          <div className='flex items-center justify-between font-semibold text-zinc-900'>
            <span>Giá hiện tại:</span>
            <span>{formatCurrencyVND(auction.winning_price)}</span>
          </div>

          <div className='flex items-center justify-between text-xs text-zinc-500'>
            <span>Bước giá:</span>
            <span>{formatCurrencyVND(auction.step)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
