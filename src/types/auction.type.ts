import type { User } from './user.type'

export type SessionStatus = 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'ENDED' | 'CANCELLED'
export interface AuctionType {
  id: number
  product_id: number

  startingBid: number // giá khỏi điểm
  original_price: number
  buyNowPrice: number // giá mua ngay
  myTopBid?: number

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
