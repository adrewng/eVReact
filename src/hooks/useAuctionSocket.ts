// hooks/useAuctionSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface UseAuctionSocketOptions {
  auctionId: number
  token?: string
}

export const useAuctionSocket = ({ auctionId, token }: UseAuctionSocketOptions) => {
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    if (!auctionId) return

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/auction`, {
      auth: { token },
      transports: ['websocket']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('✅ Connected to auction socket')
      setConnected(true)
      socket.emit('join_auction', { auctionId })
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from auction socket')
      setConnected(false)
    })

    socket.on('auction_started', (data) => {
      console.log('🚀 Auction started:', data)
      setCurrentPrice(data.startingPrice)
      setRemainingTime(data.duration)
    })

    socket.on('bid_update', (data) => {
      console.log('💰 Bid update:', data)
      setCurrentPrice(data.newPrice)
    })

    socket.on('time_update', (data) => {
      setRemainingTime(data.remainingTime)
    })

    socket.on('auction_closed', () => {
      console.log('🔔 Auction closed')
      setIsEnded(true)
    })

    return () => {
      socket.emit('leave_auction', { auctionId })
      socket.disconnect()
    }
  }, [auctionId, token])

  const placeBid = useCallback(
    (bidAmount: number) => {
      if (!socketRef.current) return
      socketRef.current.emit('place_bid', { auctionId, bidAmount })
    },
    [auctionId]
  )

  return { connected, currentPrice, remainingTime, isEnded, placeBid }
}
