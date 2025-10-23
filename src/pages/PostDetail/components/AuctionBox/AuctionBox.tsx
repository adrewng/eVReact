import React, { useState, useEffect } from 'react'
import { Clock, Gavel, Zap, Plus, Minus } from 'lucide-react'

// Mock Button component
const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
)

// Mock format function
const formatCurrencyVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

interface AuctionBoxProps {
  startPrice: number
  currentPrice: number
  step: number
  buyNowPrice?: number
  endTime: string
  onPlaceBid?: (amount: number) => void
  onBuyNow?: () => void
}

export default function AuctionBox({
  startPrice,
  currentPrice,
  step,
  buyNowPrice,
  endTime,
  onPlaceBid,
  onBuyNow
}: AuctionBoxProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [bidAmount, setBidAmount] = useState(currentPrice + step)
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const diff = end - now

      if (diff <= 0) {
        setIsEnded(true)
        clearInterval(interval)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  const handleIncrease = () => {
    setBidAmount((prev) => prev + step)
  }

  const handleDecrease = () => {
    if (bidAmount > currentPrice + step) {
      setBidAmount((prev) => prev - step)
    }
  }

  const handleConfirmBid = () => {
    if (onPlaceBid && bidAmount >= currentPrice + step) {
      onPlaceBid(bidAmount)
    }
  }

  const TimeBlock = ({ value, label }) => (
    <div className='flex flex-col items-center'>
      <div className='text-zinc-900 rounded-2xl w-25 h-18 flex flex-col items-center justify-center border border-black '>
        <span className='text-4xl font-semibold tabular-nums'>{String(value).padStart(2, '0')}</span>
        <span className='text-xs text-zinc-500 mt-1.5 font-medium'>{label}</span>
      </div>
      {/* <span className='text-xs text-zinc-500 mt-1.5 font-medium'>{label}</span> */}
    </div>
  )

  return (
    <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
      {/* Header */}
      <div className='mb-4 flex items-center gap-2'>
        <Gavel className='h-5 w-5 text-zinc-900' />
        <h2 className='text-lg font-semibold'>Đấu giá</h2>
      </div>
      {/* Countdown */}
      <div className='pb-3'>
        <div className='mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500'>
          <Clock className='h-4 w-4' />
          <span>Thời gian còn lại</span>
        </div>

        {!isEnded ? (
          <div className='flex items-center justify-center gap-3'>
            <TimeBlock value={timeLeft.days} label='Days' />
            <span className='text-2xl font-bold text-zinc-900 mb-6'>:</span>
            <TimeBlock value={timeLeft.hours} label='Hours' />
            <span className='text-2xl font-bold text-zinc-900 mb-6'>:</span>
            <TimeBlock value={timeLeft.minutes} label='Minutes' />
          </div>
        ) : (
          <div className='text-center text-xl font-bold text-red-600'>Đấu giá đã kết thúc</div>
        )}
      </div>
      {/* Price Info */}
      <hr className='my-4 border-zinc-900 pb-2' />
      <div className='mb-5 space-y-2 text-sm'>
        <div className='flex items-center justify-between text-zinc-600'>
          <span>Giá khởi điểm:</span>
          <span className='font-bold text-lg text-zinc-900'>{formatCurrencyVND(startPrice)}</span>
        </div>
        <div className='flex items-center justify-between text-zinc-600'>
          <span>Giá chốt:</span>
          <span className='font-bold text-lg text-zinc-900'>{formatCurrencyVND(startPrice)}</span>
        </div>
        <div className='flex items-center justify-between border-t border-zinc-100 '>
          <span className='text-zinc-600'>Giá hiện tại:</span>
          <span className='text-xl font-bold text-zinc-900'>{formatCurrencyVND(currentPrice)}</span>
        </div>
      </div>
      <hr className='my-4 border-zinc-900 pt-3' />
      {/* Bid Input */}
      {!isEnded && (
        <>
          <div className='mb-4'>
            <label className='mb-2 block text-xs uppercase tracking-wide text-zinc-500'>Giá đặt của bạn</label>
            <div className='flex items-stretch gap-2'>
              <Button
                onClick={handleDecrease}
                disabled={bidAmount <= currentPrice + step}
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <Minus className='h-4 w-4 text-zinc-700' />
              </Button>

              <div className='flex flex-1 items-center justify-center rounded-xl border border-zinc-300 bg-white px-3 shadow-sm'>
                <Plus className='mr-2 h-4 w-4 shrink-0 text-zinc-400' />
                <input
                  type='text'
                  value={formatCurrencyVND(bidAmount)}
                  readOnly
                  className='w-full bg-transparent text-center text-base font-semibold text-zinc-900 outline-none'
                />
              </div>

              <Button
                onClick={handleIncrease}
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-50'
              >
                <Plus className='h-4 w-4 text-zinc-700' />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='space-y-2'>
            <Button
              onClick={handleConfirmBid}
              disabled={bidAmount < currentPrice + step}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0'
            >
              <Gavel className='h-5 w-5' />
              Đặt giá
            </Button>

            {buyNowPrice && (
              <Button
                onClick={onBuyNow}
                className='flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50'
              >
                <Zap className='h-5 w-5' />
                Mua ngay • {formatCurrencyVND(buyNowPrice)}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
