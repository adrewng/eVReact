import { useQuery } from '@tanstack/react-query'
import { Clock, Gavel, Minus, Plus, Zap } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { io, Socket } from 'socket.io-client'
import auctionApi from '~/apis/auction.api'
import { AppContext } from '~/contexts/app.context'
import { JoinABidButton } from './JoinABidButton'

const SERVER_URL = import.meta.env.VITE_API_URL

// Button component
interface ButtonProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}: ButtonProps & Record<string, unknown>) => (
  <button type={type} className={className} disabled={disabled} onClick={onClick} {...props}>
    {children}
  </button>
)

interface AuctionBoxProps {
  product_id: string
}

export default function AuctionBox({ product_id }: AuctionBoxProps) {
  const { profile } = useContext(AppContext)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [bidAmount, setBidAmount] = useState<number>(0)
  const [isEnded, setIsEnded] = useState(false)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [winnerId, setWinnerId] = useState<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  // Lấy token từ localStorage
  const accessToken = localStorage.getItem('access_token')
  const token = accessToken?.replace('Bearer ', '')

  // Fetch thông tin auction ban đầu
  const { data: auctionData } = useQuery({
    queryKey: ['auction-info', product_id],
    queryFn: () => auctionApi.getAuctionByProduct(Number(product_id)),
    enabled: !!product_id
  })

  const auctionInfo = auctionData?.data?.data
  const auctionId = auctionInfo?.id
  const step = Number(auctionInfo?.step || 0)
  const startingPrice = Number(auctionInfo?.starting_price || 0)
  const targetPrice = Number(auctionInfo?.target_price || 0)
  const deposit = Number(auctionInfo?.deposit || 0)

  // --- Socket connect & join ---
  useEffect(() => {
    if (!auctionId || !token) {
      console.log('⚠️ Missing auctionId or token', { auctionId, hasToken: !!token })
      return
    }

    console.log('🔌 Connecting to auction socket...' + SERVER_URL)
    const socketInstance = io(`${SERVER_URL}/auction`, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    // Khi connect thành công
    socketInstance.on('connect', () => {
      console.log('✅ Connected to auction socket:', socketInstance.id)
      setIsConnected(true)
      // Join auction room
      socketInstance.emit('auction:join', { auctionId })
    })

    // Khi connect lỗi
    socketInstance.on('connect_error', (error) => {
      console.error('❌ Connection error:', error.message)
      setIsConnected(false)
      toast.error('Không thể kết nối đến server đấu giá')
    })

    // Nhận thông tin khi join thành công
    socketInstance.on('auction:joined', (data) => {
      console.log('📥 Joined auction successfully:', data)
      setHasJoined(true)
      setCurrentPrice(data.auction?.winning_price || startingPrice)
      setWinnerId(data.auction?.winner_id || null)
      setTimeLeft(data.remainingTime || 0)
      toast.success('Đã tham gia phòng đấu giá!')
    })

    // Khi có người khác join
    socketInstance.on('auction:user_joined', (data) => {
      console.log('👤 User joined:', data)
    })

    // Cập nhật giá mới khi có người đặt giá
    socketInstance.on('auction:bid_update', (data) => {
      console.log('💰 Bid update:', data)
      setCurrentPrice(data.winningPrice)
      setWinnerId(data.winnerId)

      // Thông báo cho user
      if (data.winnerId === profile?.id) {
        toast.success(`🎉 Bạn đang dẫn đầu với giá ${data.winningPrice.toLocaleString('vi-VN')}đ!`)
      } else {
        toast.info(`Giá mới: ${data.winningPrice.toLocaleString('vi-VN')}đ`)
      }
    })

    // Cập nhật thời gian còn lại
    socketInstance.on('auction:time_update', (data) => {
      setTimeLeft(data.remainingTime)
    })

    // Auction đóng
    socketInstance.on('auction:closed', (data) => {
      console.log('🎉 Auction closed:', data)
      setIsEnded(true)
      setWinnerId(data.winnerId)
      setTimeLeft(0)

      if (data.winnerId === profile?.id) {
        toast.success('🏆 Chúc mừng! Bạn đã thắng đấu giá!')
      } else if (data.winnerId) {
        toast.info(`Đấu giá đã kết thúc. Người thắng: User ${data.winnerId}`)
      } else {
        toast.info('Đấu giá đã kết thúc mà không có người thắng')
      }
    })

    // Lỗi từ server
    socketInstance.on('auction:error', (data) => {
      console.error('❌ Auction error:', data.message)
      toast.error(data.message || 'Có lỗi xảy ra')
    })

    // Disconnect
    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Disconnected:', reason)
      setIsConnected(false)
      setHasJoined(false)
    })

    setSocket(socketInstance)

    return () => {
      console.log('🔌 Cleaning up socket connection')
      if (socketInstance) {
        socketInstance.emit('auction:leave', { auctionId })
        socketInstance.disconnect()
      }
    }
  }, [auctionId, token, profile?.id, startingPrice])

  // --- update initial bidAmount ---
  useEffect(() => {
    if (auctionInfo && step > 0) {
      const minBid = currentPrice > 0 ? currentPrice + step : startingPrice
      setBidAmount(minBid)
    }
  }, [auctionInfo, currentPrice, startingPrice, step])

  // --- Tăng giá ---
  const handleIncrease = () => {
    setBidAmount((prev) => prev + step)
  }

  // --- Giảm giá ---
  const handleDecrease = () => {
    const minBid = currentPrice > 0 ? currentPrice + step : startingPrice
    setBidAmount((prev) => Math.max(prev - step, minBid))
  }

  // --- Đặt giá ---
  const handlePlaceBid = () => {
    if (!socket || !isConnected) {
      toast.error('Chưa kết nối đến server')
      return
    }

    if (!hasJoined) {
      toast.error('Bạn cần tham gia đấu giá trước')
      return
    }

    if (!auctionId) {
      toast.error('Không tìm thấy thông tin đấu giá')
      return
    }

    if (bidAmount < currentPrice + step) {
      toast.error(`Giá đặt phải lớn hơn ${(currentPrice + step).toLocaleString('vi-VN')}đ`)
      return
    }

    console.log(`📤 Placing bid: ${bidAmount}`)
    socket.emit('auction:bid', { auctionId, bidAmount })
  }

  // --- TimeBlock component ---
  interface TimeBlockProps {
    value: number
    label: string
  }

  const TimeBlock = ({ value, label }: TimeBlockProps) => (
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
        {/* Connection status indicator */}
        <div className='ml-auto flex items-center gap-2'>
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className='text-xs text-zinc-500'>{isConnected ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className='pb-3'>
        <div className='mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500'>
          <Clock className='h-4 w-4' />
          <span>Thời gian còn lại</span>
        </div>

        {!isEnded ? (
          <div className='flex items-center justify-center gap-3'>
            <TimeBlock value={minutes} label='Phút' />
            <span className='text-2xl font-bold text-zinc-900 mb-6'>:</span>
            <TimeBlock value={seconds} label='Giây' />
          </div>
        ) : (
          <div className='text-center text-xl font-bold text-red-600'>
            Đấu giá đã kết thúc
            {winnerId && (
              <p className='text-sm mt-2 text-zinc-700'>
                🏆 Người thắng: {winnerId === profile?.id ? 'Bạn' : `User ${winnerId}`}
              </p>
            )}
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
        <div className='flex items-center justify-between border-t border-zinc-100 pt-2'>
          <span className='text-zinc-600'>Giá hiện tại:</span>
          <span className='text-xl font-bold text-emerald-600'>
            {currentPrice > 0 ? currentPrice.toLocaleString('vi-VN') : startingPrice.toLocaleString('vi-VN')}đ
          </span>
        </div>
        {winnerId && (
          <div className='flex items-center justify-between text-zinc-600'>
            <span>Người dẫn đầu:</span>
            <span className='font-semibold text-zinc-900'>
              {winnerId === profile?.id ? 'Bạn 🏆' : `User ${winnerId}`}
            </span>
          </div>
        )}
      </div>

      <hr className='my-4 border-zinc-900 pt-3' />

      {/* Bid Input */}
      {!isEnded ? (
        <>
          <div className='mb-4'>
            <label className='mb-2 block text-xs uppercase tracking-wide text-zinc-500'>Giá đặt của bạn</label>
            <div className='flex items-stretch gap-2'>
              <Button
                onClick={handleDecrease}
                disabled={!isConnected || !hasJoined || bidAmount <= currentPrice + step}
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
                disabled={!isConnected || !hasJoined}
                className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <Plus className='h-4 w-4 text-zinc-700' />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='space-y-2'>
            <JoinABidButton deposit={String(deposit)} auction_id={auctionId} />

            <Button
              onClick={handlePlaceBid}
              disabled={!isConnected || !hasJoined || bidAmount < currentPrice + step}
              className='flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Gavel className='h-5 w-5' />
              {!isConnected ? 'Đang kết nối...' : !hasJoined ? 'Vui lòng nộp tiền cọc' : 'Đặt giá'}
            </Button>

            <Button
              disabled={!isConnected}
              className='flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Zap className='h-5 w-5' />
              Mua ngay • {targetPrice.toLocaleString('vi-VN')}đ
            </Button>
          </div>
        </>
      ) : (
        <div className='text-center p-4 bg-zinc-50 rounded-xl'>
          <p className='text-zinc-600 mb-2'>Đấu giá đã kết thúc</p>
          {winnerId === profile?.id && <p className='text-emerald-600 font-semibold'>🎉 Chúc mừng bạn đã thắng!</p>}
        </div>
      )}
    </div>
  )
}
