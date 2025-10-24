import type { User } from './user.type'

export interface AuctionType {
  id: number
  product_id: number
  startingBid: number // giá khỏi điểm
  original_price: number
  buyNowPrice: number // giá mua ngay
  bidIncrement: number // bước nhảy tối thiểu
  deposit: number // tiền cọc cần thanh toán trước khi tham gia
  winner?: User | null
  winning_price?: string | number | null // decimal(15,2)
  duration?: string | number
  isVerify?: boolean
  note?: string // ghi chú
}
