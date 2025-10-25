import type { AuctionType } from '~/types/auction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/payment/auction-fee'

const auctionApi = {
  createAuctionRequest(body: AuctionType) {
    return http.post<SuccessResponse<AuctionType>>(URL_CREATE_AUCTION_REQUEST, body)
  }
}

export default auctionApi
