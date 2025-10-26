export interface Auction {
  id: number
  product_id: number
  seller_id: number
  starting_price: string
  original_price: string
  target_price: string
  deposit: string
  winner_id: number
  winning_price: string
  duration: number
  step: string
  note: string
  status: string
}

export interface AuctionList {
  data: Auction[]
}
import type { User } from './user.type'

export type SessionStatus = 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'ENDED' | 'CANCELLED'
export interface AuctionType {
  id: number
  product_id: number

  startingBid: number // giá khỏi điểm
  original_price: number
  buyNowPrice: number // giá mua ngay
  topBid?: number | null

  bidIncrement: number // bước nhảy tối thiểu
  deposit: number // tiền cọc cần thanh toán trước khi tham gia

  winner?: User | null
  winning_price?: string | number | null // decimal(15,2)

  start_at?: string
  end_at?: string
  duration?: string | number

  isVerify?: boolean

  note?: string // ghi chú,
  title?: string
  thumbnail?: string

  status?: SessionStatus
  currentPrice?: number | null
  bid_count?: number
}

export type Participation = {
  session: AuctionType
  result?: 'PENDING' | 'WIN' | 'LOSE'
}
