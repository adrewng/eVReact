export interface AuctionType {
  product_id: number //id sản phẩm
  startingBid: number // giá khỏi điểm
  buyNowPrice: number // giá mua ngay
  bidIncrement: number // bước nhảy tối thiểu
  deposit: number // tiền cọc cần thanh toán trước khi tham gia
  note: string // ghi chú
}
