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
