import type { Auction, AuctionList } from '~/types/auction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const auctionApi = {
  getAllAuction() {
    return http.get<SuccessResponse<AuctionList>>('/api/auction/get-all')
  },
  getAuctionByProduct(product_id: number) {
    return http.get<SuccessResponse<Auction>>('/api/auction/get-by-product', {
      params: { product_id }
    })
  },
  payDeposit(auction_id: number) {
    const body = {
      auction_id: auction_id
    }
    return http.post('/api/payment/auction-deposit', body)
  },
  startAuction(auction_id: number) {
    return http.post<SuccessResponse<any>>('/api/auction/start', { auction_id })
  }
}

export default auctionApi
