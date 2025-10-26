import type { Auction, AuctionList, AuctionType, AuctionUserList } from '~/types/auction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/payment/auction-fee'
const URL_GET_OWN_AUCTION = 'api/auction/own'
const URL_GET_PARTICIPATED_AUCTION = 'api/auction/participated'

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
  startAuction(auctionId: number) {
    return http.post<SuccessResponse<any>>('/api/auction/start', { auctionId })
  },
  createAuctionRequest(body: AuctionType) {
    return http.post<SuccessResponse<AuctionType>>(URL_CREATE_AUCTION_REQUEST, body)
  },
  getMySessions() {
    return http.get<SuccessResponse<AuctionUserList>>(URL_GET_OWN_AUCTION)
  },
  async getMyParticipations() {
    await delay(200)
    return { data: { data: DEMO_PARTICIPATIONS } }
  },
  verifyAuctionByAdmin(auctionId: number, duration: number) {
    return http.post('/api/admin/verify-auction', {
      auctionId,
      duration
    })
  getMyParticipations() {
    return http.get<SuccessResponse<AuctionUserList>>(URL_GET_PARTICIPATED_AUCTION)
  }
}

export default auctionApi
