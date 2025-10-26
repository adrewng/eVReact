import { Clock, Gavel, Zap, Plus, Minus } from 'lucide-react'
import { JoinABidButton } from './JoinABidButton'
import { useQuery } from '@tanstack/react-query'
import auctionApi from '~/apis/auction.api'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { AppContext } from '~/contexts/app.context'

const SERVER_URL = 'http://localhost:3000'

// Mock Button component
const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
)

interface AuctionBoxProps {
  product_id: string
}

export default function AuctionBox({ product_id }: AuctionBoxProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [bidAmount, setBidAmount] = useState<number>(0)
  const [isEnded, setIsEnded] = useState(false)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [winnerId, setWinnerId] = useState<number | null>(null)

  const jwtToken = localStorage.getItem('access-token')

  // Fetch thông tin auction ban đầu
  const { data: auctionData } = useQuery({
    queryKey: ['auction-info', product_id],
    queryFn: () => auctionApi.getAuctionByProduct(Number(product_id))
  })

  const auctionInfo = auctionData?.data?.data
  const auctionId = auctionInfo?.id
  const step = Number(auctionInfo?.step || 0)
  const startingPrice = Number(auctionInfo?.starting_price || 0)
  const targetPrice = Number(auctionInfo?.target_price || 0)

  // --- Socket connect & join ---
  useEffect(() => {
    if (!auctionId || !jwtToken) return

    const s = io(`${SERVER_URL}/auction`, {
      auth: { token: jwtToken },
      transports: ['websocket', 'polling']
    })

    // Khi connect
    s.on('connect', () => {
      console.log('✅ Connected to auction socket')
      s.emit('auction:join', { auctionId })
    })

    // Nhận thông tin khi join thành công
    s.on('auction:joined', (data) => {
      console.log('📥 Joined auction', data)
      setCurrentPrice(data.auction?.winning_price || startingPrice)
      setTimeLeft(data.remainingTime)
    })

    // Cập nhật giá mới
    s.on('auction:bid_update', (data) => {
      console.log('💰 Bid update:', data)
      setCurrentPrice(data.winningPrice)
      setWinnerId(data.winnerId)
    })

    // Cập nhật thời gian
    s.on('auction:time_update', (data) => {
      setTimeLeft(data.remainingTime)
    })

    // Auction đóng
    s.on('auction:closed', (data) => {
      console.log('🎉 Auction closed:', data)
      setIsEnded(true)
      setWinnerId(data.winnerId)
    })

    // Lỗi
    s.on('auction:error', (data) => {
      console.error('Auction error:', data.message)
    })

    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [auctionId, jwtToken])

  // --- update initial bidAmount ---
  useEffect(() => {
    if (auctionInfo) {
      const initial = currentPrice > 0 ? currentPrice + step : startingPrice
      setBidAmount(initial)
    }
  }, [auctionInfo, currentPrice])

  // --- Tăng giảm giá ---
  const handleIncrease = () => setBidAmount((prev) => prev + step)
  const handleDecrease = () => {
    const minBid = currentPrice > 0 ? currentPrice + step : startingPrice
    setBidAmount((prev) => Math.max(prev - step, minBid))
  }

  // --- Đặt giá ---
  const handlePlaceBid = () => {
    if (!socket || !auctionId) return
    socket.emit('auction:bid', { auctionId, bidAmount })
    console.log(`📤 Placed bid: ${bidAmount}`)
  }

  // --- Format thời gian ---
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const TimeBlock = ({ value, label }) => (
    <div className='flex flex-col items-center'>
      <div className='text-zinc-900 rounded-2xl w-25 h-18 flex flex-col items-center justify-center border border-black '>
        <span className='text-4xl font-semibold tabular-nums'>{String(value).padStart(2, '0')}</span>
        <span className='text-xs text-zinc-500 mt-1.5 font-medium'>{label}</span>
      </div>
    </div>
  )

  // --- Tách timeLeft ra phút/giây để render ---
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

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
            <TimeBlock value={minutes} label='Minutes' />
            <span className='text-2xl font-bold text-zinc-900 mb-6'>:</span>
            <TimeBlock value={seconds} label='Seconds' />
          </div>
        ) : (
          <div className='text-center text-xl font-bold text-red-600'>
            Đấu giá đã kết thúc
            {winnerId && <p className='text-sm mt-2 text-zinc-700'>🏆 Người thắng: User {winnerId}</p>}
          </div>
        )}
      </div>

      {/* Price Info */}
      <hr className='my-4 border-zinc-900 pb-2' />
      <div className='mb-5 space-y-2 text-sm'>
        <div className='flex items-center justify-between text-zinc-600'>
          <span>Giá khởi điểm:</span>
          <span className='font-bold text-lg text-zinc-900'>{startingPrice.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className='flex items-center justify-between text-zinc-600'>
          <span>Bước nhảy:</span>
          <span className='font-bold text-lg text-zinc-900'>{step.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className='flex items-center justify-between border-t border-zinc-100'>
          <span className='text-zinc-600'>Giá hiện tại:</span>
          <span className='text-xl font-bold text-zinc-900'>{currentPrice.toLocaleString('vi-VN')}đ</span>
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
                <input
                  type='text'
                  value={bidAmount.toLocaleString('vi-VN')}
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
            <JoinABidButton deposit={auctionInfo?.deposit} auction_id={auctionInfo?.id} />
            <Button
              onClick={handlePlaceBid}
              disabled={bidAmount < currentPrice + step}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Gavel className='h-5 w-5' />
              Đặt giá
            </Button>

            <Button className='flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50'>
              <Zap className='h-5 w-5' />
              Mua ngay • {targetPrice.toLocaleString('vi-VN')}đ
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
